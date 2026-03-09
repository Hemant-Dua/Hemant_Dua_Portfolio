// Jarvis Blog Theme Utilities
document.addEventListener('DOMContentLoaded', () => {
    // Only run if we are on a blog page (jarvis-theme body)
    if (!document.body.classList.contains('jarvis-theme')) return;

    // Typewriter effect for HUD elements
    const typewriterElements = document.querySelectorAll('.typewriter');

    typewriterElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        el.style.visibility = 'visible';

        let i = 0;
        // Random typing speed for technical feel
        const type = () => {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, Math.random() * 30 + 10);
            } else {
                // Add a blinker class after typing finishes if requested
                if (el.dataset.blinker === 'true') {
                    el.innerHTML += '<span class="blink">_</span>';
                }
            }
        };

        // Slight delay before typing starts
        setTimeout(type, 500);
    });

    // Update the system time in the HUD
    const timeDisplay = document.getElementById('sys-time');
    if (timeDisplay) {
        setInterval(() => {
            const now = new Date();
            const timeString = now.toISOString().replace('T', ' ').substring(0, 19);
            timeDisplay.textContent = timeString;
        }, 1000); // Only updating seconds, no need for ms precision here to save perf
    }

    // Add random "data processing" characters to elements with class .data-glitch on hover
    const dataPanels = document.querySelectorAll('.data-panel');
    dataPanels.forEach(panel => {
        const readOut = panel.querySelector('.read-out');
        if (!readOut) return;

        const originalText = readOut.textContent;
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        panel.addEventListener('mouseenter', () => {
            let iterations = 0;
            const interval = setInterval(() => {
                readOut.textContent = readOut.textContent.split('')
                    .map((char, index) => {
                        if (index < iterations) return originalText[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    }).join('');

                if (iterations >= originalText.length) clearInterval(interval);
                iterations += 1 / 3;
            }, 30);
        });

        panel.addEventListener('mouseleave', () => {
            readOut.textContent = originalText;
        });
    });
});
