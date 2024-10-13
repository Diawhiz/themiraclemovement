//The code below is for the slider in the about page
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const icons = document.querySelectorAll('.icon');

let currentSlide = 0;

//Clone the first and the last slides
const firstSlide = slides[0].cloneNode(true);
const lastSlide = slides[slides.length - 1].cloneNode(true);

//Prepend the last slide clone and append the first slide clone
slides[0].parentNode.insertBefore(lastSlide, slides[0]);
slides[slides.length - 1].parentNode.appendChild(firstSlide);

function showSlide() {
    // slides.forEach((slide) => slide.style.display = 'none');
    slides[currentSlide].style.display = 'block';
}

showSlide(); //initialize

// icon click event listener
icons.forEach ((icon) => {
    icon.addEventListener('click', (e) => {
        if (e.target.classList.contains('prev')) {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        } else if (e.target.classList.contains('next')) {
            currentSlide = (currentSlide + 1) % slides.length;
        }
        showSlide();
    });
});