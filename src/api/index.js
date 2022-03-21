const url = 'https://mindicador.cl/api/';

export default function getIndicadores(query){
  return fetch(`${url}${query}`)
          .then(data=>data.json())
          .then(data=>data)
}