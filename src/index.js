import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
axios.defaults.headers.common['x-api-key'] =
  'live_6oipNaEf4MhA3t1QKH9rU8tuRomBydjiP5ZsBkmsecdwgBpHv8VKGluJCVsYRtAH';

fetchBreeds();

import { loader, fetchCatByBreed, fetchBreeds } from './js/cat-api';

// window.onload = function () {
//   loader.style.display = 'none';
// };

import { breedSelect } from './js/cat-api';
const catContainer = document.querySelector('.cat-info');

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
  let catName = arr.map(link => link.breeds[0].name);

  const markUp = `
      <table>
      <tr>
      <td>
      <img class="img-cat" src="${imgUrl}" width="440" height="400" loading="lazy">
      </td>
      <td class="text-cell">
      <div class="text-desc">
      <h1 class="cat-title">${catName}</h1>
        <p class="cat-info"><b>Description: </b>${catDesc}</p>
        <p class="cat-info"><b>Temperament: </b>${catTemp}</p>
      </div>
      </td>
      </table>
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
    catContainer.removeChild(child);
  });
}
