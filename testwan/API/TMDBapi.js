

const API_TOKEN = "eea195ff6bd5b721fe9221e5f8bbe0b3"

export function getFilmsFromApiWithSearchedText (text,page) {//fonction pour avoir le text et les page contenu dans l'api
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text +'&page='+page//variable url pour acceder à la requete precise+ préciser par le texte+les pages
  //on peut tester l'api dans l'url directement pour voir ou sont les problémes
  return fetch(url)//permet de renvoyer les données contenu dans l'url appelé dans l'api
    .then((response) => response.json())//renvoi la réponse sous forme de json
    .catch((error) => console.error(error))//sinon erreur
}
export function getImageFromApi (name){//fonction pour avoir l'image par nom dans l'api
  return 'https://image.tmdb.org/t/p/w300'+name//variable url pour acceder à la requete precise+ préciser par le nom
}