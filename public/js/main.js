document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Canvas Background Effect (Cyber-Nature Particles) ---
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    let width, height, particles;

    function initCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        particles = [];

        // Number of particles depends on screen size
        const numParticles = Math.floor((width * height) / 15000);

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                // Mix of nature (greenish) and cyber (cyanish) colors
                color: Math.random() > 0.5 ? 'rgba(57, 255, 20, 0.4)' : 'rgba(0, 240, 255, 0.4)'
            });
        }
    }

    function animateCanvas() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        // Draw connections for "neural/root network" look
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 100) {
                    ctx.beginPath();
                    // Fade stroke opacity based on distance
                    ctx.strokeStyle = `rgba(57, 255, 20, ${0.15 * (1 - dist / 100)})`;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animateCanvas);
    }

    window.addEventListener('resize', initCanvas);
    initCanvas();
    animateCanvas();

    // --- 2. Scroll Animation (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));

    // --- 3. Fetch Data from Express API (Cyber Terminal Effect) ---
    async function fetchSystemData() {
        try {
            const res = await fetch('/api/skills');
            if (!res.ok) throw new Error("Network response was not ok");
            const data = await res.json();

            // Populate Skills UI
            const backendList = document.getElementById('backend-list');
            const aimlList = document.getElementById('aiml-list');

            backendList.innerHTML = '';
            data.backend.forEach(skill => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="skill-tag">${skill}</span>`;
                backendList.appendChild(li);
            });

            aimlList.innerHTML = '';
            data.ai_ml.forEach(skill => {
                const li = document.createElement('li');
                li.innerHTML = `<span class="skill-tag">${skill}</span>`;
                aimlList.appendChild(li);
            });

            // Populate Terminal UI
            const terminalBody = document.getElementById('sys-status');
            setTimeout(() => {
                terminalBody.innerHTML = `
                    <p><span class="prompt">$</span> ./fetch_status.sh</p>
                    <p class="sys-info">Connecting to main server on port 3000...</p>
                    <p class="sys-success">[ OK ] Connection Established.</p>
                    <p class="sys-info">System Uptime: ${Math.floor(data.uptime || 0)}s</p>
                    <p class="sys-success">${data.message}</p>
                    <p class="prompt anim-blink">_</p>
                `;
            }, 1000); // Artificial delay for cyber effect

        } catch (error) {
            console.error("Error fetching data:", error);
            document.getElementById('backend-list').innerHTML = `<li><span class="skill-tag error">Data feed offline</span></li>`;
            document.getElementById('aiml-list').innerHTML = `<li><span class="skill-tag error">Models disconnected</span></li>`;
            document.getElementById('sys-status').innerHTML += `<p style="color:red">[ ERROR ] Failed to connect to core server.</p>`;
        }
    }

    // Call API fetch
    fetchSystemData();

    // Blink effect for terminal cursor
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes blink-caret { 50% { opacity: 0; } }
        .anim-blink { animation: blink-caret .75s step-end infinite; }
    `;
    document.head.appendChild(styleSheet);
});
