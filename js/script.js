// Image Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");
    const closeBtn = document.querySelector(".close");

    if (modal && modalImg && closeBtn) {
        document.querySelectorAll(".project-gallery img").forEach(img => {
            img.addEventListener("click", function () {
                modal.style.display = "flex";
                modalImg.src = this.src;
            });
        });

        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });

        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Scroll Reveal Animation
    const gridItems = document.querySelectorAll('.grid-item');

    if (gridItems.length > 0) {
        // Add scroll-reveal class to all grid items
        gridItems.forEach(item => {
            item.classList.add('scroll-reveal');
        });

        // Create observer for scroll reveal
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        gridItems.forEach(item => revealObserver.observe(item));
    }

    // Touch-hover simulation for mobile
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isSmallScreen = window.matchMedia('(max-width: 768px)').matches;

    if (isTouchDevice || isSmallScreen) {
        if (gridItems.length > 0) {
            let currentHovered = null;
            const itemVisibility = new Map();

            const hoverObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    itemVisibility.set(entry.target, entry.intersectionRatio);
                });

                let maxRatio = 0;
                let mostVisible = null;

                itemVisibility.forEach((ratio, item) => {
                    const rect = item.getBoundingClientRect();
                    const viewportCenter = window.innerHeight / 2;
                    const itemCenter = rect.top + rect.height / 2;
                    const distanceFromCenter = Math.abs(viewportCenter - itemCenter);
                    const score = ratio * (1 - distanceFromCenter / window.innerHeight);

                    if (score > maxRatio && ratio > 0.3) {
                        maxRatio = score;
                        mostVisible = item;
                    }
                });

                if (mostVisible !== currentHovered) {
                    if (currentHovered) {
                        currentHovered.classList.remove('touch-hover');
                    }
                    if (mostVisible) {
                        mostVisible.classList.add('touch-hover');
                    }
                    currentHovered = mostVisible;
                }
            }, {
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: '-10% 0px -10% 0px'
            });

            gridItems.forEach(item => hoverObserver.observe(item));
        }
    }

    // Logo animation on homepage - wiggle to indicate "about" link
    const logo = document.querySelector('.logo img');
    const isHomepage = document.body.classList.contains('homepage');

    if (logo && isHomepage) {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-20px)';
        logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';

            setTimeout(() => {
                logo.classList.add('logo-wiggle');

                setTimeout(() => {
                    logo.classList.remove('logo-wiggle');
                }, 800);
            }, 600);
        }, 100);

    } else if (logo) {
        // Simple fade-in for other pages
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(-10px)';
        logo.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0)';
        }, 100);
    }
});
