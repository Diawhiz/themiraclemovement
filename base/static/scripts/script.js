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
  scrollContainer.scrollLeft += 20;

  requestAnimationFrame(autoScroll); // Schedule next frame for smooth animation
}

// Start auto-scrolling when the page loads
isAutoScrolling = true;
requestAnimationFrame(autoScroll);

// Button click handlers
nextBtn.addEventListener('click', () => {
  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft += 400;
});

backBtn.addEventListener('click', () => {
  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft -= 400;
});


//The code below is responsible for the event handler
const countdownElement = document.querySelector('.countdown');
const eventDateTime = `{{ event_datetime }}`;  // Pass the event date and time from the backend
const eventNameElement = document.querySelector('.event-name');
  eventNameElement.textContent = `{{ event_name }}`;
const countdown = new Date(eventDateTime).getTime();

const intervalId = setInterval(() => {
  const now = new Date().getTime();
  const distance = countdown - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(intervalId);
    countdownElement.innerHTML = `{{ event_name }} has started`;
  }
}, 1000);