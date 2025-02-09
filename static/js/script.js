function research(){
    let key = document.getElementById('textbox').value
    fetch('/api/data',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            value: key,
        }),
    })
        .then(response => response.json())
        .then(data => {
            document.getElementById('data').innerHTML = key + " is a " + data.value + "number";
            document.getElementById('timer').innerHTML = data.timer;
            if (data.value == "prime"){
                createNotification(key, true);
            }else{
                createNotification(key, false);
            }

        });
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Mouse position
let mouseX = 0;
let mouseY = 0;
window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Particle class
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 4 - 1.5;
        this.speedY = Math.random() * 4 - 1.5;
        this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    }

    update() {
        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
            const force = -1 * (maxDistance - distance) / maxDistance;
            const directionX = dx / distance;
            const directionY = dy / distance;
            this.speedX += directionX * force * 0.5;
            this.speedY += directionY * force * 0.5;
        }

        // Movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x < 20 || this.x > canvas.width - 40) this.speedX *= -1;
        if (this.y < 20 || this.y > canvas.height - 40) this.speedY *= -1;

        // Friction
        this.speedX *= 0.995;
        this.speedY *= 0.995;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
const particles = [];
const numberOfParticles = 100;
for (let i = 0; i < numberOfParticles; i++) {
    particles.push(new Particle());
}

// Animation loop
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particles[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}

animate();

// random Color change over time
let hue = 0;
setInterval(() => {
    hue = (hue + 1) % 360;
    particles.forEach(particle => {
        particle.color = `hsl(${hue}, 50%, 50%)`;
    });
}, 50);

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles.forEach(particle => particle.reset());
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

