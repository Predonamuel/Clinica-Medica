const mapContainer = document.getElementById('map');
if (mapContainer) {
    const map = L.map('map', { attributionControl: false }).setView([-22.9365, -43.1790], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    L.marker([-22.9365, -43.1790]).addTo(map)
        .bindPopup('Clínica Vida Saudável - Flamengo, RJ')
        .openPopup();
}


const carousel = document.querySelector(".carousel-images");
const images = document.querySelectorAll(".carousel-images img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

function showImage(i) {
    index = (i + images.length) % images.length;
    carousel.style.transform = `translateX(${-index * 100}%)`;
}

prevBtn.addEventListener("click", () => showImage(index - 1));
nextBtn.addEventListener("click", () => showImage(index + 1));

setInterval(() => showImage(index + 1), 5000);