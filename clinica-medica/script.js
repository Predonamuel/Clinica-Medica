const testimonialContainer = document.querySelector(".testimonial-container");
if (testimonialContainer) {
    const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
    let testimonialIndex = 0;
    const totalCards = testimonialCards.length;

    function showTestimonial(i) {
        const containerWidth = testimonialContainer.offsetWidth;
        const cardWidth = testimonialCards[0].offsetWidth + 20;
        const cardsPerView = Math.floor(containerWidth / cardWidth) || 1;
        let maxIndex = totalCards - cardsPerView;
        if (i > maxIndex) {
            i = 0;
        }
        testimonialIndex = i;
        testimonialContainer.style.transition = "transform 0.5s ease";
        testimonialContainer.style.transform = `translateX(${-testimonialIndex * cardWidth}px)`;
    }

    function nextTestimonial() {
        const containerWidth = testimonialContainer.offsetWidth;
        const cardWidth = testimonialCards[0].offsetWidth + 20;
        const cardsPerView = Math.floor(containerWidth / cardWidth) || 1;
        showTestimonial(testimonialIndex + cardsPerView);
    }

    function prevTestimonial() {
        const containerWidth = testimonialContainer.offsetWidth;
        const cardWidth = testimonialCards[0].offsetWidth + 20;
        const cardsPerView = Math.floor(containerWidth / cardWidth) || 1;
        showTestimonial(testimonialIndex - cardsPerView);
    }

    document.querySelector(".next")?.addEventListener("click", nextTestimonial);
    document.querySelector(".prev")?.addEventListener("click", prevTestimonial);

    setInterval(nextTestimonial, 6000);

    window.addEventListener("resize", () => { showTestimonial(testimonialIndex); });
}

const mapContainer = document.getElementById('map');
if (mapContainer) {
    const map = L.map('map', { attributionControl: false }).setView([-22.9365, -43.1790], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    L.marker([-22.9321, -43.1786]).addTo(map)
        .bindPopup('Clínica Vida Saudável - Flamengo, RJ')
        .openPopup();
}
