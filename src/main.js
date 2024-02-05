import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

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
  gallery.insertAdjacentElement('afterend', loadButton);
  let currentPage = 1;
  let currentSearch = '';

  loadButton.style.display = 'none';

    async function fetchData(searchValue, page) {
      try {
        const response = await axios.get(galleryApiUrl, {
          params: {
            key: '42070599-a2d44ee2a419d1b7eaf44145e',
            q: encodeURIComponent(searchValue),
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: page,
            per_page: 15,
          },
        });

        return response.data;
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    }

    async function addGallery(searchValue, page) {
      loader.style.display = 'block';

      const data = await fetchData(searchValue, page);

      if (!data || data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        loader.style.display = 'none';
        input.value = '';
        return;
      }

      if (page === 1) {
        gallery.innerHTML = '';
      }
      addImagesToGallery(data.hits);

      loader.style.display = 'none';
      loadButton.style.display = 'block';

      const totalHits = data.totalHits || 0;
      if (page * 15 >= totalHits) {
        loadButton.style.display = 'none';
        iziToast.info({
          title: 'End of Results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
        input.value = '';
      }

      galleryBox.refresh();

      window.scrollTo({
        top: gallery.offsetTop + gallery.offsetHeight,
        behavior: 'smooth',
      });
    }

    function addImagesToGallery(hits) {
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
        commentsItem.innerHTML = '<strong>Comments:</strong> <br>' + hit.comments;

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
    }

    form.addEventListener('submit', evt => {
      evt.preventDefault();

      const inputValue = input.value.trim().toLowerCase();

      if (inputValue !== '') {
        currentSearch = inputValue;
        currentPage = 1;

        addGallery(inputValue, currentPage);
      } else {
        input.reportValidity();
      }
    });

    loadButton.addEventListener('click', () => {
      loader.style.display = 'block';
      currentPage++;
      addGallery(currentSearch, currentPage);
    });
  });

  