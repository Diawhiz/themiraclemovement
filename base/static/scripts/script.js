 // Preloader animation
// window.addEventListener('DOMContentLoaded', () => {
//   document.querySelector('.preloader').style.display = 'flex'; // show the preloader
// });

// window.addEventListener('load', () => {
//   // wait for 3 seconds
//   setTimeout(() => {
//     document.querySelector('.preloader').style.display = 'none'; // hide the preloader

//     document.querySelector('.navbar').style.display = 'block'; // show the navbar
//     document.querySelector('.main-content').style.display = 'block'; // show the main content of the page
//     document.querySelector('.footer-section').style.display = 'block'; // show the footer
//   }, 3000); // 3 seconds
// });


//The code below is for the slider in the about page
const scrollContainer = document.querySelector('.gallery');
const backBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

// let scrollContainer = 0;

scrollContainer.addEventListener('wheel',(evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    scrollContainer.style.scrollBehavior = 'auto';
})

nextBtn.addEventListener('click', ()=> {
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft += 400;
});

backBtn.addEventListener('click', ()=> {
    scrollContainer.style.scrollBehavior = 'smooth';
    scrollContainer.scrollLeft -= 400;
});
