//TODO : 
    - ✅ FIXED : ExpiredEmbeds marche que sur le menu home (hypothese : j'ai messageCreate.js qui send le home avec un temps d'expiration mais
      ne gère pas le reste des Embeds envoyer part a liste. Ce qui est bizarre c'est que logiquement je fait tous a partir d'un seul
      embed que je modifier a chaque fois "interaction.editReply();)
    - ✅ FIXED : Changer l'affichage du ExpiredEmbeds, lorsque c'est home ---> ExpiredEmbeds laisser comme c'est. Parcontre quand c'est
       release menu ----> ExpiredEmbeds alors juste push un embeds pareil que celui d'origine mais en desactivant les buttons et en 
       ajoutant une desciption du type "Session Expirée !"

//?FAIT : 
    - refactor: rename messageCreateHandler to router, improve command system logic, fix expired embeds display, redesign expired embeds layout, add better daily release handling
  