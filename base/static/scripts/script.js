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


// Properly escape the Django template variables for JavaScript
console.log('Event DateTime:', '{{ event_datetime }}');
console.log('Event Name:', '{{ event_name }}');

const eventDateTime = '{{ event_datetime|safe }}';
const eventName = '{{ event_name|safe }}';
        
const countdownElement = document.querySelector('.countdown');
const eventNameElement = document.querySelector('.event-name');
        
// Set event name
eventNameElement.textContent = eventName;

// Convert datetime string to timestamp
const countdown = new Date(eventDateTime).getTime();

// Function to update countdown
function updateCountdown() {
  const now = new Date().getTime();
  const distance = countdown - now;

  // Calculate time components
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Check if countdown has expired
    if (distance < 0) {
        clearInterval(intervalId);
        countdownElement.innerHTML = `${eventName} has started`;
        return;
    }

    // Update countdown display
    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Initial call
updateCountdown();

// Update every second
const intervalId = setInterval(updateCountdown, 1000);