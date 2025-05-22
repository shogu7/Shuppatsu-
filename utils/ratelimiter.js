const queue = [];
let isProcessing = false;
const RATE_LIMIT_DELAY = 1000;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function enqueueRequest(fn) {
  return new Promise((resolve, reject) => {
    queue.push({ fn, resolve, reject });
    processQueue();
  });
}

async function processQueue() {
  if (isProcessing) return;
  if (queue.length === 0) return;
  isProcessing = true;

  while (queue.length > 0) {
    const { fn, resolve, reject } = queue.shift();
    try {
      const result = await fn();
      resolve(result);
    } catch (err) {
      reject(err);
    }
    await sleep(RATE_LIMIT_DELAY);
  }

  isProcessing = false;
}

module.exports = { enqueueRequest };
