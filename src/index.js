import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry(e) {
  const nameCountry = e.target.value;
  if (nameCountry === '') return;
  fetchCountries(nameCountry.trim()).then(country => {
    if (country.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      return;
    } else if (country.length > 2 && country.length < 10) {
      createListCountry(country);
    } else if (country.length === 1) {
      createCardCountry(country);
    }
  });
}

function createListCountry(params) {
  countryListEl.innerHTML = '';

  params.map(country => {
    const li = document.createElement('li');
    li.textContent = country.name;

    countryListEl.append(li);
  });
}

function createCardCountry(country) {
  country.map(c => {
    console.log(c.flags.svg);
    countryInfoEl.innerHTML = `
    
    <h2><img src="${c.flags.svg}" width="30" height="25"></img>  ${c.name}</h2>
    <p>Capital: ${c.capital}</p>
    <p>Population: ${c.population}</p>
    `;
  });
}
