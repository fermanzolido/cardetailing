document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const fadeElements = document.querySelectorAll('.service-card, .section-padding h2, #galeria-trabajos .col-md-4'); // Incluir columnas de galería
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const galeriaContainer = document.getElementById('galeria-trabajos');
    let modalTriggerElement = null; // Para devolver el foco al cerrar el modal

    // Navbar transparente al inicio y oscura al hacer scroll
    const toggleNavbarBg = () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled'); // Usar clase CSS
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    };

    window.addEventListener('scroll', toggleNavbarBg);
    toggleNavbarBg(); // Llamar una vez al cargar por si la página está ya scrolleada

    // Animaciones de fade-in al scroll
    if (fadeElements.length) {
        fadeElements.forEach(element => {
            element.classList.add('fade-in');
        });

        const observerOptions = {
            root: null, // viewport
            threshold: 0.1, // Un poco antes para que se vea la animación
            rootMargin: "0px 0px -50px 0px" // Empieza un poco antes de que entre completamente en vista
        };

        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#!') { // Evitar scroll si es solo #
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Crear modal para zoom de imágenes
    let modal = null;
    let modalImg = null;
    let closeBtn = null;

    const createImageModal = () => {
        const existingModal = document.querySelector('.imagen-modal');
        if (existingModal) { // Prevenir duplicados si el script se carga múltiples veces (aunque no debería)
            modal = existingModal;
        } else {
            modal = document.createElement('div');
            modal.className = 'imagen-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'modalImageLabel'); // Necesitaríamos un label
            modal.innerHTML = `
                <button class="imagen-modal-close" aria-label="Cerrar imagen ampliada">&times;</button>
                <div class="imagen-modal-content">
                    <img src="" alt="Imagen ampliada" id="modalImageLabel">
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        modalImg = modal.querySelector('img');
        closeBtn = modal.querySelector('.imagen-modal-close');

        // Cerrar modal
        const closeModal = () => {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                if (modalTriggerElement) {
                    modalTriggerElement.focus(); // Devolver foco al elemento que abrió el modal
                    modalTriggerElement = null;
                }
            }
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal(); // Cerrar si se hace clic fuera de la imagen
            });
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                closeModal();
            }
        });
        return modal; // Retornar modal para uso posterior
    };

    // Asegurarse de que el modal se crea una vez
    if (!document.querySelector('.imagen-modal')) {
        modal = createImageModal();
    } else {
        modal = document.querySelector('.imagen-modal');
        modalImg = modal.querySelector('img');
        closeBtn = modal.querySelector('.imagen-modal-close');
        // Re-attach event listeners for close if needed, or ensure createImageModal handles this
        const closeModalHandler = () => {
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                if (modalTriggerElement) {
                    modalTriggerElement.focus();
                    modalTriggerElement = null;
                }
            }
        };
        if (closeBtn && !closeBtn.getAttribute('listenerAttached')) { // Simple way to avoid multiple listeners
            closeBtn.addEventListener('click', closeModalHandler);
            closeBtn.setAttribute('listenerAttached', 'true');
        }
        if (modal && !modal.getAttribute('listenerAttached')) {
            modal.addEventListener('click', (e) => { if (e.target === modal) closeModalHandler(); });
            modal.setAttribute('listenerAttached', 'true');
        }
         document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                closeModalHandler();
            }
        });
    }


    // Galería de imágenes
    const trabajos = [
        { url: 'images/trabajo1.png', descripcion: 'Detallado completo exterior' },
        { url: 'images/trabajo2.png', descripcion: 'Restauración de pintura' },
        { url: 'images/trabajo3.png', descripcion: 'Limpieza de tapicería' },
        { url: 'images/trabajo4.png', descripcion: 'Detallado de motor' },
        { url: 'images/trabajo5.png', descripcion: 'Restauración de faros' },
        { url: 'images/trabajo6.png', descripcion: 'Tratamiento cerámico' }
    ];

    if (galeriaContainer) {
        const galleryFadeObserver = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerInstance.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

        trabajos.forEach(trabajo => {
            const col = document.createElement('div');
            col.className = 'col-lg-4 col-md-6 col-sm-12 fade-in'; // Ajuste de columnas para mejor responsividad
            
            col.innerHTML = `
                <div class="trabajo-card" tabindex="0"> {/* Hacer la tarjeta enfocable */}
                    <img src="${trabajo.url}" alt="${trabajo.descripcion}" class="img-fluid rounded" loading="lazy">
                    <div class="trabajo-overlay">
                        <p>${trabajo.descripcion}</p>
                    </div>
                </div>
            `;
            
            const trabajoCard = col.querySelector('.trabajo-card');
            if (trabajoCard) {
                 trabajoCard.addEventListener('click', () => {
                    if (modal && modalImg) {
                        modalTriggerElement = trabajoCard; // Guardar el elemento que disparó el modal
                        modal.style.display = 'block';
                        modalImg.src = trabajo.url;
                        modalImg.alt = trabajo.descripcion;
                        document.body.style.overflow = 'hidden';
                        if (closeBtn) closeBtn.focus(); // Poner foco en el botón de cerrar del modal
                    }
                });
                // Permitir abrir con Enter si la tarjeta está enfocada
                trabajoCard.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        trabajoCard.click();
                    }
                });
            }
            
            galeriaContainer.appendChild(col);
            galleryFadeObserver.observe(col); // Observar la columna para el fade-in
        });
    }

    // Manejo del formulario de contacto
    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulación de envío - reemplazar con envío real (AJAX, etc.)
            // const formData = new FormData(this);
            // console.log(...formData.entries()); // Para ver los datos en la consola

            formFeedback.innerHTML = `
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>`;
            this.reset();

            // Opcional: hacer que el mensaje desaparezca después de un tiempo
            setTimeout(() => {
                const alert = formFeedback.querySelector('.alert');
                if (alert) {
                    // Bootstrap 5 tiene su propio manejo de dismiss, pero por si acaso:
                    new bootstrap.Alert(alert).close(); 
                }
            }, 5000);
        });
    }

    // Funcionalidad redes sociales
    const socials = {
        facebook: 'https://facebook.com/cardetailingpro', // Reemplazar con tus URLs reales
        instagram: 'https://instagram.com/cardetailingpro',
        whatsapp: 'https://wa.me/1234567890' // Reemplazar con tu número real
    };

    document.querySelectorAll('.social-links a[data-network]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const network = this.getAttribute('data-network');
            if (socials[network]) {
                window.open(socials[network], '_blank', 'noopener,noreferrer'); // Añadir noopener,noreferrer por seguridad
            } else {
                console.warn('Red social no configurada:', network);
            }
        });
    });

    // Efecto Parallax para secciones con clase .parallax
    const parallaxSections = document.querySelectorAll('.parallax');
    const updateParallax = () => {
        parallaxSections.forEach(section => {
            const scrolled = window.pageYOffset;
            // Ajustar la velocidad del parallax (0.3 es más lento que 0.5)
            // Solo aplicar si la sección está visible (optimización simple)
            const rect = section.getBoundingClientRect();
            if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
                 // Calcular la posición del fondo de una manera que empiece desde 0 cuando la sección entra en vista
                let offset = window.pageYOffset - section.offsetTop;
                if (section.offsetTop > window.innerHeight) { // Si la sección está más abajo de la altura de la ventana inicial
                     offset = Math.max(0, window.pageYOffset + window.innerHeight - section.offsetTop - section.offsetHeight / 2);
                }
                section.style.backgroundPositionY = `${offset * 0.3}px`;
            }
        });
    };
    // Considerar usar IntersectionObserver para activar/desactivar el listener de scroll para parallax
    // o usar requestAnimationFrame para un rendimiento más suave.
    // Para simplificar, lo dejamos con el scroll directo pero optimizado.
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateParallax); // Más eficiente que el scroll directo
    });
    updateParallax(); // Llamar una vez al cargar
});
