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

// Gallery Auto-Scrolling with Better Control
const scrollContainer = document.querySelector('.gallery');
const nextBtn = document.querySelector('.next');
const backBtn = document.querySelector('.prev');
let isAutoScrolling = false;
let autoScrollInterval = null;

function autoScroll() {
  if (!isAutoScrolling) return;

  // Calculate remaining scroll distance
  const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
  
  if (scrollContainer.scrollLeft >= maxScroll) {
    // Stop auto-scrolling when reached the end
    stopAutoScroll();
    return;
  }

  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft += 20;
}

function startAutoScroll() {
  if (isAutoScrolling) return;
  
  isAutoScrolling = true;
  autoScrollInterval = setInterval(autoScroll, 50); // More controlled scrolling
}

function stopAutoScroll() {
  isAutoScrolling = false;
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}

// Start auto-scrolling on page load
document.addEventListener('DOMContentLoaded', startAutoScroll);

// Manual scroll controls
nextBtn.addEventListener('click', () => {
  stopAutoScroll();
  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft += 400;
});

backBtn.addEventListener('click', () => {
  stopAutoScroll();
  scrollContainer.style.scrollBehavior = 'smooth';
  scrollContainer.scrollLeft -= 400;
});

// Pause auto-scroll on user interaction
scrollContainer.addEventListener('mouseenter', stopAutoScroll);
scrollContainer.addEventListener('mouseleave', startAutoScroll);

// Enhanced Countdown Timer
document.addEventListener('DOMContentLoaded', function() {
    const countdownElement = document.querySelector('.countdown');
    const eventNameElement = document.querySelector('.event-name');
    
    // Safely parse the event datetime with error handling
    function initCountdown(eventDateTimeString, eventName) {
        if (!eventDateTimeString || !eventName) {
            if (countdownElement) {
                countdownElement.textContent = 'Event details not available';
            }
            return;
        }

        try {
            const eventDate = new Date(eventDateTimeString);

            function updateCountdown() {
                const now = new Date();
                const distance = eventDate.getTime() - now.getTime();

                if (distance < 0) {
                    if (countdownElement) {
                        countdownElement.innerHTML = `${eventName} has started`;
                    }
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                if (countdownElement) {
                    countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                }
            }

            // Initial call
            updateCountdown();

            // Update every second
            const intervalId = setInterval(updateCountdown, 1000);

            // Optional: Clear interval when element is no longer in DOM
            const observer = new MutationObserver(() => {
                if (!document.body.contains(countdownElement)) {
                    clearInterval(intervalId);
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });

        } catch (error) {
            console.error('Countdown initialization error:', error);
            if (countdownElement) {
                countdownElement.textContent = 'Unable to calculate countdown';
            }
        }
    }

    // Use with server-side rendered variables or fallback
    const eventDateTimeString = '{{ event_datetime|safe }}' || null;
    const eventName = '{{ event_name|safe }}' || 'Event';

    initCountdown(eventDateTimeString, eventName);
});

// Improved YouTube Stream and Channel Handling
class YouTubeManager {
    constructor(apiKey, channelId) {
        this.API_KEY = apiKey;
        this.CHANNEL_ID = channelId;
        this.retryCount = 0;
        this.MAX_RETRIES = 3;
    }

    async fetchSubscriberCount() {
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${this.CHANNEL_ID}&key=${this.API_KEY}`
            );
            const data = await response.json();
            const subscriberCount = data.items[0]?.statistics?.subscriberCount;
            
            if (subscriberCount) {
                const subscriberElement = document.getElementById('subscriber-count');
                if (subscriberElement) {
                    subscriberElement.textContent = `${Number(subscriberCount).toLocaleString()} subscribers`;
                }
            }
        } catch (error) {
            console.error('Failed to fetch subscriber count:', error);
            this.handleApiError(error);
        }
    }

    async embedRecentStream() {
        const iframe = document.getElementById('live-stream-iframe');
        const statusElement = document.getElementById('stream-status');

        if (!iframe || !statusElement) return;

        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${this.CHANNEL_ID}&type=video&order=date&maxResults=1&key=${this.API_KEY}`
            );
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const video = data.items[0];
                const videoId = video.id.videoId;
                const isLive = video.snippet.liveBroadcastContent === 'live';

                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
                statusElement.textContent = isLive 
                    ? 'Live Now!' 
                    : `Last Stream: ${video.snippet.title}`;

                iframe.style.display = 'block';
                statusElement.style.display = 'block';
                this.retryCount = 0; // Reset retry count on successful fetch
            } else {
                iframe.style.display = 'none';
                statusElement.textContent = 'No streams available';
            }
        } catch (error) {
            console.error('Error fetching stream:', error);
            this.handleApiError(error);
        }
    }

    handleApiError(error) {
        this.retryCount++;
        
        if (this.retryCount <= this.MAX_RETRIES) {
            // Exponential backoff
            const delay = Math.pow(2, this.retryCount) * 1000;
            setTimeout(() => this.embedRecentStream(), delay);
        } else {
            console.error('Max retries reached for YouTube API');
        }
    }

    init() {
        this.fetchSubscriberCount();
        this.embedRecentStream();

        // Check for new streams periodically with exponential backoff between calls
        setInterval(() => this.embedRecentStream(), 10 * 60 * 1000); // 10 minutes
    }
}

// Initialize with placeholders - replace with actual values server-side
const youtubeManager = new YouTubeManager(
    '{{ api_key }}', 
    '{{ channel_id }}'
);

// Ensure YouTube API is loaded before initializing
if (window.gapi) {
    gapi.load('client', () => {
        youtubeManager.init();
    });
} else {
    console.error('YouTube API not loaded');
}