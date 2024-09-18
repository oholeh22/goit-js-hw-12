import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showEndOfResultsMessage } from './js/render-functions.js';

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
        const { images, totalHits } = await fetchImages(currentQuery, page, perPage); 

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

        const galleryItem = document.querySelector('.gallery-item');
        const cardHeight = galleryItem ? galleryItem.getBoundingClientRect().height : 0;
        
        const totalLoaded = (page - 1) * perPage + images.length; 

        if (totalLoaded >= totalHits) {
            loadMoreButton.style.display = 'none';
            showEndOfResultsMessage(); 
        } else {
            loadMoreButton.style.display = 'block'; 
        }

        loader.style.display = 'none'; 

        if (cardHeight > 0) {
            window.scrollBy({
                top: 2 * cardHeight, 
                behavior: 'smooth' 
            });
        }

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
