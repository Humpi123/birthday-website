/* ============================================
   BIRTHDAY WEBSITE - JAVASCRIPT
   Interaktive Funktionen & Animationen
   ============================================ */

// ============================================
// COUNTDOWN TIMER
// ============================================

function updateCountdown() {
    // Leonies Geburtstag: 22. Juni
    const today = new Date();
    const currentYear = today.getFullYear();
    
    // Nächster Geburtstag
    let birthDate = new Date(currentYear, 5, 22); // Juni = 5 (0-indexed)
    
    // Wenn Geburtstag dieses Jahr schon vorbei ist, nächstes Jahr
    if (today > birthDate) {
        birthDate = new Date(currentYear + 1, 5, 22);
    }
    
    // Zeitdifferenz berechnen
    const diff = birthDate - today;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    // DOM aktualisieren
    document.getElementById('days').textContent = padZero(days);
    document.getElementById('hours').textContent = padZero(hours);
    document.getElementById('minutes').textContent = padZero(minutes);
    document.getElementById('seconds').textContent = padZero(seconds);
}

function padZero(num) {
    return num < 10 ? '0' + num : num;
}

// Alter berechnen
function calculateAge() {
    const birthDate = new Date('2010-06-22');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

// ============================================
// KONFETTI EFFEKT
// ============================================

function triggerConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const confettiCount = 100;
    const colors = ['#ff1493', '#ff69b4', '#dc143c', '#ff6b9d', '#ffb3d9'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        confetti.style.animation = 'confetti-fall linear forwards';
        
        confettiContainer.appendChild(confetti);
        
        // Nach Animation entfernen
        setTimeout(() => confetti.remove(), 4000);
    }
}

// ============================================
// BALLONS EFFEKT
// ============================================

function addMoreBalloons() {
    const balloonsContainer = document.getElementById('balloons-container');
    const balloonCount = 8;
    const colors = ['#ff1493', '#ff69b4', '#dc143c', '#ff6b9d', '#ffb3d9', '#ff4da6'];
    
    for (let i = 0; i < balloonCount; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 100 + 'vw';
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.animationDuration = (Math.random() * 4 + 6) + 's';
        balloon.style.animationDelay = (i * 0.2) + 's';
        
        balloonsContainer.appendChild(balloon);
        
        // Nach Animation entfernen
        setTimeout(() => balloon.remove(), 12000);
    }
}

// Automatisch Ballons beim Start
window.addEventListener('load', () => {
    addMoreBalloons();
});

// ============================================
// HERZEN EFFEKT
// ============================================

function triggerHearts() {
    const container = document.getElementById('confetti-container');
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }
}

// ============================================
// MUSIK TOGGLE
// ============================================

let musicPlaying = false;

function toggleMusic() {
    const audio = document.getElementById('birthday-music');
    const btn = document.getElementById('music-btn');
    
    if (musicPlaying) {
        audio.pause();
        btn.textContent = '🎵 Musik An/Aus';
        musicPlaying = false;
    } else {
        audio.play().catch(error => {
            console.log('Audio-Autoplay blockiert:', error);
            alert('Bitte Browser-Einstellungen prüfen (Autoplay kann blockiert sein)');
        });
        btn.textContent = '⏸️ Musik läuft...';
        musicPlaying = true;
    }
}

// ============================================
// INTERAKTIVE EFFEKTE
// ============================================

// Click-Effekt für Wish-Cards
document.addEventListener('DOMContentLoaded', () => {
    const wishCards = document.querySelectorAll('.wish-card');
    wishCards.forEach(card => {
        card.addEventListener('click', () => {
            triggerHearts();
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        });
    });
    
    // Countdown starten
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Alter anzeigen
    document.getElementById('age').textContent = calculateAge();
});

// ============================================
// EASTER EGGS
// ============================================

let konami = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konami.push(e.key);
    konami.splice(-konamiCode.length - 1);
    
    if (JSON.stringify(konami) === JSON.stringify(konamiCode)) {
        triggerConfetti();
        addMoreBalloons();
        triggerHearts();
        alert('🎉 SURPRISE! Happy Birthday, Leonie! 🎉');
    }
});

// ============================================
// WEITERE INTERAKTIONEN
// ============================================

// Doppel-Click überall für Konfetti
document.addEventListener('dblclick', () => {
    triggerConfetti();
});

// Keyboard: Space für Ballons
document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        addMoreBalloons();
    }
});
