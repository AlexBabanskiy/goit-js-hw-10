import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
axios.defaults.headers.common['x-api-key'] =
  'live_6oipNaEf4MhA3t1QKH9rU8tuRomBydjiP5ZsBkmsecdwgBpHv8VKGluJCVsYRtAH';

import { fetchBreeds } from './js/cat-api';
import { fetchCatByBreed } from './js/cat-api';

fetchBreeds();

import { loader } from './js/cat-api';

window.onload = function () {
  loader.style.display = 'none';
};

export const loader = document.querySelector('.loader');

const errorMsg = document.querySelector('.error');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_6oipNaEf4MhA3t1QKH9rU8tuRomBydjiP5ZsBkmsecdwgBpHv8VKGluJCVsYRtAH';

const breedSelect = document.querySelector('.breed-select');
const catContainer = document.querySelector('.cat-info');
const closeButton = document.querySelector('.close-btn');

breedSelect.addEventListener('change', onSelectView);

function onSelectView() {
  const breedId = selectedBreeds();

  const isContent = document.querySelector('.img-cat');

  if (isContent) {
    clearCatContainer();
  }

  showLoadingMessage();

  fetchCatByBreed(breedId)
    .then(markUp)
    .catch(showError)
    .finally(hideLoadingMessage);
}

function selectedBreeds() {
  const selectedValue = breedSelect.options[breedSelect.selectedIndex];
  const selectedText = selectedValue.textContent;

  const selectedId = selectedValue.value;

  return selectedId;
}

function showLoadingMessage() {
  loader.style.display = 'block';
  Notify.success('Такий котік є в нашій базі!');
}

function markUp(arr) {
  let imgUrl = arr.map(link => link.url);
  let catDesc = arr.map(link => link.breeds[0].description);
  let catTemp = arr.map(link => link.breeds[0].temperament);

  const markUp = `
      
      <img class="img-cat" src="${imgUrl}" width="440" height="400" loading="lazy">
      <div class="intro">
        <p class="cat-info"><b>Description: </b>${catDesc}</p>
        <p class="cat-info"><b>Temperament: </b>${catTemp}</p>
      </div>
    `;

  catContainer.insertAdjacentHTML('beforeend', markUp);
}

function showError() {
  Notify.failure('Щось пішло не так! Перезавантажте сторінку!');
}

function hideLoadingMessage() {
  loader.style.display = 'none';
}

function clearCatContainer() {
  const children = Array.from(catContainer.children);

  children.forEach(child => {
    if (child !== closeButton) {
      catContainer.removeChild(child);
    }
  });
}
