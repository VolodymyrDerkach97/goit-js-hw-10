import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix, { Loading } from 'notiflix';

const debounce = require('lodash.debounce');
const throttle = require('lodash.throttle');

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(e) {
  const nameCountry = e.target.value;
  if (nameCountry === '') {
    clearListHTML();
    return;
  }

  fetchCountries(nameCountry.trim())
    .then(country => {
      if (country.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (country.length >= 2 && country.length <= 10) {
        createListCountry(country);
      } else if (country.length === 1) {
        createCardCountry(country);
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.error(error);
      clearListHTML();
    });
}

function createListCountry(arrayCountries) {
  countryListEl.innerHTML = '';
  changeVisuallyHiden(countryListEl, countryInfoEl);

  arrayCountries.map(country => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    li.textContent = country.name;
    img.src = country.flags.svg;
    img.width = '20';
    img.height = '20';

    li.prepend(img);
    countryListEl.append(li);
  });
}

function createCardCountry(countryAray) {
  changeVisuallyHiden(countryInfoEl, countryListEl);

  countryAray.map(country => {
    const langName = country.languages.map(lang => lang.name).join(', ');

    countryInfoEl.innerHTML = `
    <div class="title-wraper">
    <img src="${country.flags.svg}" width="30" height="25"></img>
    <h2>${country.name}</h2></div>
    <p><span>Capital:</span> ${country.capital}</p>
    <p><span>Population:</span> ${country.population}</p>
    <p><span>Languages:</span> ${langName}</p>
    `;
  });
}

function changeVisuallyHiden(removeEl, addEl) {
  removeEl.classList.remove('visually-hidden');
  addEl.classList = 'visually-hidden';
}

function clearListHTML() {
  countryListEl.innerHTML = '';
  countryInfoEl.innerHTML = '';
}
