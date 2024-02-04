import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
  const galleryBox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionPosition: 'bottom',
    captionDelay: 250,
    enableKeyboard: true,
  });

  const galleryApiUrl = 'https://pixabay.com/api/';
  const form = document.querySelector('.search-container');
  const input = document.getElementById('search');
  const loader = document.querySelector('.loader');
  const gallery = document.querySelector('.gallery');
  const loadButton = document.querySelector('.load-btn');

  let page = 1;
  let limit = 15;
  let imageData = [];
  let totalPages = 0;
  let searchKeyword = '';

  form.addEventListener('submit', async evt => {
    evt.preventDefault();
    searchKeyword = input.value.trim().toLowerCase();
    page = 1;
    loadButton.style.display = 'none';
    await loadGallery();
  });

  loadButton.addEventListener('click', async () => {
    loader.style.display = 'block';
    console.log(loader);
    await loadGallery();
    page++;
    loader.style.display = 'none';
    console.log(loader);
  });

  async function loadGallery() {
    loader.style.display = 'block';
    const inputValue = searchKeyword;
    if (inputValue !== '') {
      const params = {
        key: '42070599-a2d44ee2a419d1b7eaf44145e',
        q: encodeURIComponent(inputValue),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: limit,
        _page: page,
      };
      await axios
        .get(galleryApiUrl, {
          params: params,
        })
        .then(response => {
          const data = response.data;
          const hits = data.hits;
          totalPages = Math.ceil(data.totalHits / limit);

          if (data.hits.length === 0) {
            input.value = '';
            iziToast.error({
              title: 'Error',
              message:
                'Sorry, there are no images matching your search query. Please try again!',
              position: 'topRight',
            });

            loader.style.display = 'none';
            return;
          }

          hits.forEach(hit => {
            const listItem = document.createElement('li');
            listItem.classList.add('gallery-item');
            const elementLink = document.createElement('a');
            elementLink.classList.add('gallery-link');
            elementLink.href = hit.largeImageURL;
            const imageElement = document.createElement('img');
            imageElement.classList.add('gallery-image');
            imageElement.src = hit.webformatURL;
            imageElement.alt = hit.tags;
            const captionList = document.createElement('ul');
            captionList.classList.add('caption-list');
            const likesItem = document.createElement('li');
            likesItem.innerHTML = '<strong>Likes:</strong> <br>' + hit.likes;
            const viewsItem = document.createElement('li');
            viewsItem.innerHTML = '<strong>Views:</strong> <br>' + hit.views;
            const commentsItem = document.createElement('li');
            commentsItem.innerHTML =
              '<strong>Comments:</strong> <br>' + hit.comments;
            const downloadsItem = document.createElement('li');
            downloadsItem.innerHTML =
              '<strong>Downloads:</strong> <br>' + hit.downloads;
            captionList.appendChild(likesItem);
            captionList.appendChild(viewsItem);
            captionList.appendChild(commentsItem);
            captionList.appendChild(downloadsItem);
            listItem.appendChild(elementLink);
            elementLink.appendChild(imageElement);
            listItem.appendChild(captionList);
            gallery.appendChild(listItem);
          });

          if (page === 1) {
            imageData = hits;
          } else {
            imageData.push(...hits);
          }

          loader.style.display = 'none';

          galleryBox.refresh();

          if (page < totalPages) {
            loadButton.style.display = 'flex';
          } else {
            loadButton.style.display = 'none';
            input.value = '';
            iziToast.error({
              title: 'Error',
              message: "You've reached the end of search results.",
              position: 'topRight',
            });
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    } else {
      input.reportValidity();
      loader.style.display = 'none';
    }
  }
});
