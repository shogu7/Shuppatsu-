import { describe, it, expect, vi, beforeAll, beforeEach, afterAll } from 'vitest';
import { enqueueRequest } from '../utils/helpers/ratelimiter';

async function mockSuccessFunction(value) {
  return `Success: ${value}`;
}

async function mockFailFunction() {
  throw new Error('Intentional failure');
}

describe('RateLimiter', () => {
  it('should process requests in order with delay', async () => {
    const startTime = Date.now();
    const results = [];
    
    // Enqueue 3 requests
    const promise1 = enqueueRequest(() => mockSuccessFunction('first'))
      .then(res => results.push(res));
    const promise2 = enqueueRequest(() => mockSuccessFunction('second'))
      .then(res => results.push(res));
    const promise3 = enqueueRequest(() => mockSuccessFunction('third'))
      .then(res => results.push(res));
    
    await Promise.all([promise1, promise2, promise3]);
    
    const duration = Date.now() - startTime;
    
    expect(results).toEqual([
      'Success: first',
      'Success: second',
      'Success: third'
    ]);
    
    expect(duration).toBeGreaterThanOrEqual(2000);
  });

  it('should handle failed requests', async () => {
    await expect(enqueueRequest(mockFailFunction))
      .rejects
      .toThrow('Intentional failure');
  });
});