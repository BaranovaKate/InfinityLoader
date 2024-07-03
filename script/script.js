'use strict';

const imageContainer = document.querySelector('.image-container');
const loader = document.querySelector('.loader img');

let page = 1;
let isLoading = false;

async function fetchImages() {
    if (isLoading) return;
    isLoading = true;
    loader.style.display = 'block';

    try {
        const response = await axios.get(`https://api.unsplash.com/photos/random?client_id=dFa2ObI5iIKSzDQLkrWgxh4yRwXbu850Rml-EZZhIuM&count=10&query=cat`);
        response.data.forEach(item => {
            const imageCard = document.createElement('div');
            imageCard.className = 'image-card';

            const image = document.createElement('img');
            image.src = item.urls.regular;
            image.alt = 'Кот';

            imageCard.appendChild(image);
            imageContainer.appendChild(imageCard);
        });

        page++;
        isLoading = false;
        loader.style.display = 'none';

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            await fetchImages();
        }
    } catch (error) {
        console.error('Ошибка при загрузке изображений:', error);
        isLoading = false;
        loader.style.display = 'none';
    }
}

window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading) {
        fetchImages();
    }
});

fetchImages();