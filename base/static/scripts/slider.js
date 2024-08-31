//Home page slider
const sliderContainer = document.querySelector('.slider-container');
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const icons = document.querySelectorAll('.icon');
const textOverlay = document.querySelector('.text-overlay');

let currentSlide = 0;
let slideInterval;

//set up slide interval
slideInterval = setInterval(() => {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    updateSlide();
}, 5000);

//update slide function
function updateSlide() {
    slides.forEach ((slide, index) => {
        if (index === currentSlide) {
            slide.style.transform = 'translateX(0)';
            textOverlay.classList.add('animation-slide-change');

            //textOverlay animation end
            textOverlay.addEventListener('animationend', () => {
                textOverlay.classList.remove('animation-slide-change')
            });
        } else {
            slide.style.transform = 'translateX(-100%)';
        }
    });
}

// icon click event listener
icons.forEach ((icon) => {
    icon.addEventListener('click', () => {
        if (icon.classList.contains('prev')) {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.lenght - 1;
            }
        } else {
            currentSlide++;
            if (currentSlide >= slides.lenght) {
                currentSlide = 0;
            }
        }
        updateSlide();
    });
});

//The code below is for the slider in the about page
