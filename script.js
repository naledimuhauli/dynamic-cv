// =====================
// 🌗 Theme Toggle
// =====================
function toggleTheme() {
    // Toggle between dark and light theme by toggling 'light' class on body
    document.body.classList.toggle('light');

    // Update theme toggle button icon
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
}

// =====================
// 👀 Scroll Animations for .hidden Elements
// =====================
const hiddenElements = document.querySelectorAll('.hidden');

// Create an intersection observer to trigger animation when in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

// Observe all elements with .hidden
hiddenElements.forEach(el => observer.observe(el));

// =====================
// 🍔 Responsive Hamburger Menu Toggle
// =====================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Toggle mobile nav visibility
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// =====================
// 🌦 Weather Alert Feature with Geolocation & IP Fallback
// =====================
window.addEventListener("load", () => {
    const apiKey = "4280ca7c1e5c3e22163f1e4af1525184"; // OpenWeatherMap API Key

    function showWeather(lat, lon) {
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

        fetch(apiURL)
            .then(res => res.json())
            .then(data => {
                const city = data.name;
                const temp = data.main.temp;
                const weather = data.weather[0].description;

                console.log(`📍 Location: ${city} (${lat}, ${lon})`);

                // Create a weather alert box
                const weatherBox = document.createElement("div");
                weatherBox.className = "weather-toast";
                weatherBox.innerHTML = `
                    <button class="close-toast">&times;</button>
                    <strong>🌍 You're in ${city}</strong><br>
                    🌤 ${temp}°C, ${weather}
                `;

                document.body.appendChild(weatherBox);

                // Remove on close button click
                weatherBox.querySelector(".close-toast").addEventListener("click", () => {
                    weatherBox.remove();
                });

                // Auto-remove after 6 seconds
                setTimeout(() => {
                    weatherBox.remove();
                }, 6000);
            })
            .catch(err => {
                console.error("🌧 Weather API error:", err);
            });
    }

    // Use Geolocation API if available
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                showWeather(lat, lon);
            },
            // If Geolocation fails, fallback to IP location
            async error => {
                console.warn("⚠️ Geolocation failed, falling back to IP-based location:", error.message);
                try {
                    const res = await fetch("https://ipapi.co/json/");
                    const data = await res.json();
                    showWeather(data.latitude, data.longitude);
                } catch (err) {
                    console.error("🌐 IP fallback failed:", err);
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        // Fallback for browsers without geolocation support
        console.warn("🚫 Geolocation not supported. Falling back to IP-based location.");
        fetch("https://ipapi.co/json/")
            .then(res => res.json())
            .then(data => showWeather(data.latitude, data.longitude))
            .catch(err => console.error("🌐 IP fallback failed:", err));
    }
});

// =====================
// ⌨️ Typing Animation Effect
// =====================
const roles = [
    "Software Engineer",
    "Full-Stack Developer",
    "Front-end Developer",
    "React | Node | SQL",
];

let typingText = document.querySelector(".typing-text"); // Element to display roles
let roleIndex = 0; // Index for roles array
let charIndex = 0; // Index for current character
let typingDelay = 100; // Typing speed
let erasingDelay = 60; // Erasing speed
let newTextDelay = 1500; // Delay before next role

// Function to type characters
function type() {
    if (charIndex < roles[roleIndex].length) {
        typingText.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

// Function to erase characters
function erase() {
    if (charIndex > 0) {
        typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        roleIndex = (roleIndex + 1) % roles.length; // Go to next role
        setTimeout(type, typingDelay);
    }
}

// Start typing effect after page loads
document.addEventListener("DOMContentLoaded", () => {
    if (roles.length) setTimeout(type, 1000);
});
