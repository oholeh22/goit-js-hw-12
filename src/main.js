import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js'
import { renderImages, clearGallery } from './js/render-functions.js';


let lightbox = new SimpleLightbox('.gallery-list a', {});
let currentQuery = ''; 
let page = 1; 
const perPage = 15; 

const searchForm = document.getElementById('search-form');
const galleryList = document.getElementById('gallery');
const loadMoreButton = document.getElementById('load-more');
const loader = document.getElementById('loader');

async function loadImages() {
    loader.style.display = 'block'; 
    loadMoreButton.style.display = 'none'; 

    try {
        const images = await fetchImages(currentQuery, page, perPage);

        if (images.length === 0 && page === 1) {
            iziToast.warning({
                title: 'No results',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                timeout: 5000,
            });
            loader.style.display = 'none';
            return;
        }

        renderImages(images, galleryList);
        lightbox.refresh();

        if (images.length === perPage) {
            loadMoreButton.style.display = 'block';
        } else {
            loadMoreButton.style.display = 'none'; // 
        }

        loader.style.display = 'none'; 
        page += 1; 
    } catch (error) {
        console.error('Error fetching images:', error);
        iziToast.error({
            title: 'Error',
            message: 'An error occurred while fetching images. Please try again later.',
            position: 'topRight',
            timeout: 5000,
        });
        loader.style.display = 'none';
    }
}


searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchInput = document.getElementById('search-input').value.trim();

    if (!searchInput) {
        iziToast.error({ message: 'Please enter a search word.' });
        return;
    }

   
    if (searchInput !== currentQuery) {
        currentQuery = searchInput;
        page = 1; 
        clearGallery(galleryList); 
    }

    loadMoreButton.style.display = 'none'; 
    loadImages(); 
});


loadMoreButton.addEventListener('click', function() {
    loadImages(); 
});
