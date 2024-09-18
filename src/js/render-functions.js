import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api'; 
import { renderImages, clearGallery } from './js/render-functions'; 

let lightbox = new SimpleLightbox('.gallery-list a', {});

document.getElementById('search-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input').value.trim();

    if (!searchInput) {
        iziToast.error({ message: 'Please enter a search word.' });
        return;
    }

    const galleryList = document.getElementById('gallery');
    clearGallery(galleryList);

    try {
        const images = await fetchImages(searchInput);

        if (images.length === 0) {
            iziToast.warning({
                title: 'No results',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                timeout: 5000,
            });
            return;
        }

        renderImages(images, galleryList);
        lightbox.refresh();
    } catch (error) {
        console.error('Error fetching images:', error);
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again later.',
            position: 'topRight',
            timeout: 5000,
        });
    }
});
