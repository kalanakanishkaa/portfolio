// ============================================
// TYPING ANIMATION
// ============================================
const typingText = document.querySelector('.typing-text');
const words = ['Data Scientist', 'Web Developer', 'UI/UX Designer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
    }
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section').forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// PARTICLE ANIMATION - covers full page
// ============================================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 150;
const PARTICLE_COLOR = 'rgba(93, 173, 226,';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2.5 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${PARTICLE_COLOR}${this.opacity})`;
        ctx.fill();
    }
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < CONNECTION_DISTANCE) {
                const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.4;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `${PARTICLE_COLOR}${opacity})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    connectParticles();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });
resizeCanvas();
initParticles();
animateParticles();

// ============================================
// CUSTOM CURSOR
// ============================================
const cursorDot = document.createElement('div');
const cursorRing = document.createElement('div');
cursorDot.classList.add('cursor-dot');
cursorRing.classList.add('cursor-ring');
document.body.appendChild(cursorDot);
document.body.appendChild(cursorRing);

let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
cursorDot.style.opacity = '0';
cursorRing.style.opacity = '0';

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.opacity = '1';
    cursorRing.style.opacity = '1';
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-card, .project-card, .social-icon').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorDot.classList.add('hovered'); cursorRing.classList.add('hovered'); });
    el.addEventListener('mouseleave', () => { cursorDot.classList.remove('hovered'); cursorRing.classList.remove('hovered'); });
});

document.addEventListener('mouseleave', () => { cursorDot.style.opacity = '0'; cursorRing.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { cursorDot.style.opacity = '1'; cursorRing.style.opacity = '1'; });

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const scrollBar = document.createElement('div');
scrollBar.classList.add('scroll-progress-bar');
document.body.appendChild(scrollBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = (window.scrollY / windowHeight * 100) + '%';
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================================
// SKILLS TAB SWITCHING
// ============================================
window.addEventListener('load', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillsGrids = document.querySelectorAll('.skills-grid');

    skillsGrids.forEach(g => g.style.display = 'none');
    const firstGrid = document.getElementById('tab-programming');
    if (firstGrid) firstGrid.style.display = 'grid';

    // Animate first tab progress bars
    setTimeout(() => {
        document.querySelectorAll('#tab-programming .progress-fill').forEach(fill => {
            fill.style.width = fill.getAttribute('data-width');
        });
    }, 500);

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            skillsGrids.forEach(g => g.style.display = 'none');
            const targetGrid = document.getElementById('tab-' + target);
            if (targetGrid) {
                targetGrid.style.display = 'grid';
                targetGrid.querySelectorAll('.progress-fill').forEach(fill => {
                    fill.style.width = '0%';
                    setTimeout(() => { fill.style.width = fill.getAttribute('data-width'); }, 100);
                });
            }
        });
    });
});