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
const nextBtn = document.querySelector('.next');
const backBtn = document.querySelector('.prev');
let isAutoScrolling = false; // Flag to control auto-scroll behavior

// Function to handle automatic scrolling
function autoScroll() {
  if (!isAutoScrolling) return; // Exit if not auto-scrolling

  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft += 2; // Adjust scroll amount for desired speed

  // Check for end of scrollable content (optional)
  if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
    isAutoScrolling = false; // Stop auto-scroll when reaching the end
  }

  requestAnimationFrame(autoScroll); // Schedule next frame for smooth animation
}

// Start auto-scrolling when the page loads (optional)
// isAutoScrolling = true;
// requestAnimationFrame(autoScroll);

// Button click handlers (unchanged)
nextBtn.addEventListener('click', () => {
  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft += 400;
});

backBtn.addEventListener('click', () => {
  scrollContainer.style.scrollBehavior = 'smooth';
  scrollComment.scrollLeft -= 400;
});

// Optional: Pause/resume auto-scrolling on hover
scrollContainer.addEventListener('mouseover', () => {
  isAutoScrolling = false;
});

scrollContainer.addEventListener('mouseout', () => {
  isAutoScrolling = true; // Resume after user interaction
});

// Optional: Stop auto-scrolling on user interaction with scroll wheel
scrollContainer.addEventListener('wheel', () => {
  isAutoScrolling = false;
});