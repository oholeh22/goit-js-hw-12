import axios from 'axios';

export async function fetchImages(query, page = 1, perPage = 15) {
    const apiKey = '45999578-eb7202f1a65d28d69ebdccc58';
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (response.status !== 200) {
            throw new Error('Failed to fetch images');
        }

        return {
            images: data.hits,
            totalHits: data.totalHits
        };
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
