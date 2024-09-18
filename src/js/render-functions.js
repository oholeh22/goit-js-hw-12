import iziToast from 'izitoast'; 

export function renderImages(images, galleryElement) {
    if (!images || images.length === 0) {
        iziToast.warning({
            title: 'No results',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            position: 'topRight',
            timeout: 5000,
        });
        return;
    }
  
    const markup = images.map(image => {
      return `
        <li class="gallery-item">
          <a href="${image.largeImageURL}">
            <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="152" />
          </a>
          <div class="gallery-item-info">
            <p class="stats"><b>Likes</b> ${image.likes}</p>
            <p class="stats"><b>Views</b> ${image.views}</p>
            <p class="stats"><b>Comments</b> ${image.comments}</p>
            <p class="stats"><b>Downloads</b> ${image.downloads}</p>
          </div>
        </li>
      `;
    }).join(''); 
  
    galleryElement.insertAdjacentHTML('beforeend', markup); 
}

export function clearGallery(galleryElement) {
    galleryElement.innerHTML = ''; 
}

export function showEndOfResultsMessage() {
    iziToast.info({
        title: 'End of results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 5000,
    });
}

