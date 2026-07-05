// ================= 1. KANVAS BINTANG JATUH INTERAKTIF (BACKGROUND HERO) =================
const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let shootingStars = [];

function initCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
}
initCanvas();

window.addEventListener('resize', () => {
    initCanvas();
    createStars();
});

// Membuat bintang-bintang statis di latar belakang yang berkerlip
function createStars() {
    stars = [];
    const count = Math.min(100, Math.floor(canvas.width / 15));
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random(),
            factor: Math.random() > 0.5 ? 1 : -1,
            speed: Math.random() * 0.02 + 0.005
        });
    }
}
createStars();

// Fungsi menambahkan bintang jatuh (Meteor)
function addShootingStar() {
    shootingStars.push({
        x: Math.random() * canvas.width * 0.6,
        y: 0,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 10 + 5,
        angle: Math.PI / 6, // sudut 30 derajat jatuh ke arah kanan bawah
        opacity: 1
    });
}

// Loop Animasi Canvas
function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render Bintang Kerlip Statis
    stars.forEach(star => {
        star.opacity += star.speed * star.factor;
        if (star.opacity > 1 || star.opacity < 0) {
            star.factor *= -1;
        }
        ctx.fillStyle = `rgba(196, 181, 253, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });

    // Render Bintang Jatuh (Shooting Stars)
    shootingStars.forEach((star, index) => {
        ctx.save();
        ctx.strokeStyle = `rgba(139, 92, 246, ${star.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#8b5cf6';
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
            star.x + star.length * Math.cos(star.angle),
            star.y + star.length * Math.sin(star.angle)
        );
        ctx.stroke();
        ctx.restore();

        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle);
        star.opacity -= 0.015; // Berangsur-angsur menghilang

        if (star.opacity <= 0 || star.y > canvas.height || star.x > canvas.width) {
            shootingStars.splice(index, 1);
        }
    });

    // Spawn bintang jatuh secara acak
    if (Math.random() < 0.02) {
        addShootingStar();
    }

    requestAnimationFrame(drawStars);
}
drawStars();


// ================= 2. ANIMASI MENGETIK OTOMATIS (TYPING EFFECT) =================
const textArray = ["Mahasiswa Teknologi Informasi", "Menyukai Dunia Digital", "Siap Berkembang"];
let textIndex = 0;
let charIndex = 0;
const typingDelay = 100;
const erasingDelay = 50;
const nextTextDelay = 1800;
const typingElement = document.getElementById("typing-text");

function type() {
    if (charIndex < textArray[textIndex].length) {
        typingElement.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, nextTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typingElement.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textIndex++;
        if (textIndex >= textArray.length) textIndex = 0;
        setTimeout(type, typingDelay);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 500);
});


// ================= 3. SCROLLSPY & DESAIN BLUR GLASSMORPHISM NAVBAR =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 180) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });

    // Menambah bayangan & blur solid pada navbar saat scroll ke bawah
    const header = document.getElementById("header");
    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// ================= 4. RESPONSIVE MENU HAMBURGER TOGGLE =================
function toggleMenu() {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.toggle("active");
}


// ================= 5. FORM SUBMISSION & CUSTOM SUCCESS POPUP =================
function handleFormSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;

    document.getElementById('modalTitle').innerText = "Halo, " + name + "!";
    document.getElementById('modalMessage').innerHTML = `Pesan Anda berhasil diterima. Saya akan segera menghubungi Anda melalui email <span style="color:#c4b5fd; font-weight:600;">${email}</span>.`;
    
    const modal = document.getElementById('successModal');
    modal.classList.add('active');

    document.getElementById('portfolioContactForm').reset();
}

function showDemoInfo(projectName) {
    document.getElementById('modalTitle').innerText = "Proyek " + projectName;
    document.getElementById('modalMessage').innerText = "Demonstrasi interaktif untuk proyek " + projectName + " saat ini sedang dipersiapkan untuk hosting. Terima kasih atas ketertarikan Anda!";
    document.getElementById('successModal').classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('active');
}