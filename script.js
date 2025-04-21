// Theme toggle & scroll animations
function toggleTheme() {
    document.body.classList.toggle('light');
    const btn = document.querySelector('.theme-toggle');
    btn.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
}

const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
hiddenElements.forEach(el => observer.observe(el));

// 🔥 Weather Alert Feature
window.addEventListener("load", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiKey = "4280ca7c1e5c3e22163f1e4af1525184";
                const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

                try {
                    const res = await fetch(apiURL);
                    const data = await res.json();
                    const city = data.name;
                    const temp = data.main.temp;
                    const weather = data.weather[0].description;

                    const weatherBox = document.createElement("div");
                    weatherBox.className = "weather-toast";
                    weatherBox.innerHTML = `
                    <button class="close-toast">&times;</button>
                    <strong>🌍 You're in ${city}</strong><br>
                    🌤 ${temp}°C, ${weather}
                  `;

                    document.body.appendChild(weatherBox);

                    weatherBox.querySelector(".close-toast").addEventListener("click", () => {
                        weatherBox.remove();
                    });

                    // Auto-remove after 6 seconds (optional if you have the close button)
                    setTimeout(() => {
                        weatherBox.remove();
                    }, 6000);


                } catch (err) {
                    console.error("Weather fetch failed", err);
                }
            },
            error => {
                console.warn("Location access denied.");
            }
        );
    } else {
        console.warn("Geolocation not supported.");
    }
});


const roles = [
    "Software Engineer",
    "Full-Stack Developer",
    "React | Node | SQL",
    "Cybersecurity Enthusiast",
];

let typingText = document.querySelector(".typing-text");
let roleIndex = 0;
let charIndex = 0;
let typingDelay = 100;
let erasingDelay = 60;
let newTextDelay = 1500;

function type() {
    if (charIndex < roles[roleIndex].length) {
        typingText.textContent += roles[roleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typingText.textContent = roles[roleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(type, typingDelay);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (roles.length) setTimeout(type, 1000);
});
