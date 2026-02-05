/**
 * Wedding Effects - Simple & Light Version
 * Only adds falling petals, very lightweight
 */

(function() {
    'use strict';

    // Simple petal animation - very lightweight
    function createPetals() {
        // Create only 8 petals to keep it light
        const petalCount = 8;
        
        // Add CSS keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes petalFall {
                0% { top: -10%; opacity: 0.7; transform: translateX(0) rotate(0deg); }
                100% { top: 100%; opacity: 0.3; transform: translateX(50px) rotate(360deg); }
            }
            .petal {
                position: fixed;
                width: 12px;
                height: 12px;
                background: #f5d6d8;
                border-radius: 50% 0 50% 50%;
                opacity: 0.6;
                pointer-events: none;
                z-index: 9999;
            }
        `;
        document.head.appendChild(style);

        // Create petals
        for (let i = 0; i < petalCount; i++) {
            setTimeout(() => {
                const petal = document.createElement('div');
                petal.className = 'petal';
                petal.style.left = Math.random() * 100 + '%';
                petal.style.animation = `petalFall ${10 + Math.random() * 8}s linear infinite`;
                petal.style.animationDelay = Math.random() * 5 + 's';
                
                // Random colors
                const colors = ['#f5d6d8', '#e8b4b8', '#e8c9a8'];
                petal.style.background = colors[Math.floor(Math.random() * colors.length)];
                
                document.body.appendChild(petal);
            }, i * 300);
        }
    }

    // Initialize after page loads
    function init() {
        // Wait for invitation to be opened (delay 3 seconds)
        setTimeout(createPetals, 3000);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
