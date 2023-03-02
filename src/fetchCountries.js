import Notiflix, { Loading } from 'notiflix';

export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      throw new Error('Error 404');
    }
    return response.json();
  });
}
