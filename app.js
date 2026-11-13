document.addEventListener("DOMContentLoaded", function() {

    /* =========================================
       1. ANIMACIÓN SCROLL REVEAL (INDEX Y EQUIPO)
       ========================================= */
    const faders = document.querySelectorAll('.fade-in-up');
    
    if (faders.length > 0) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        faders.forEach(fader => {
            observer.observe(fader);
        });
    }

    /* =========================================
       2. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL)
       ========================================= */
    const scrollLinks = document.querySelectorAll('.scroll-link');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Solo intercepta si es un ancla en la misma página (empieza con #)
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* =========================================
       3. GALERÍA INTERACTIVA (COMPRA.HTML)
       ========================================= */
    const mainImage = document.getElementById("main-product-image");
    const thumbnails = document.querySelectorAll(".thumbnail");

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener("click", function() {
                thumbnails.forEach(t => t.classList.remove("active"));
                this.classList.add("active");
                
                const newImageSrc = this.getAttribute("data-image");
                mainImage.style.opacity = 0;
                
                setTimeout(() => {
                    mainImage.src = newImageSrc;
                    mainImage.style.opacity = 1;
                }, 150);
            });
        });
    }

    /* =========================================
       4. FEEDBACK AL AÑADIR AL CARRITO (COMPRA.HTML)
       ========================================= */
    const addToCartBtn = document.querySelector(".add-to-cart-btn");
    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", function() {
            const originalText = this.textContent;
            this.textContent = "¡Añadido al carrito! ✓";
            this.style.backgroundColor = "var(--bg-dark)";
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = "";
            }, 2000);
        });
    }

});