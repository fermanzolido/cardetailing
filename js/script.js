// Elementos que aparecerán con fade-in al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    // Animaciones de fade-in al scroll
    const fadeElements = document.querySelectorAll('.service-card, .section-padding h2');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Navbar transparente al inicio y oscura al hacer scroll
    const navbar = document.querySelector('.navbar');
    const toggleNavbarBg = () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.7)';
        }
    };

    window.addEventListener('scroll', toggleNavbarBg);
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Crear modal para zoom de imágenes
    const createImageModal = () => {
        const modal = document.createElement('div');
        modal.className = 'imagen-modal';
        modal.innerHTML = `
            <span class="imagen-modal-close">&times;</span>
            <div class="imagen-modal-content">
                <img src="" alt="Imagen ampliada">
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    };

    const modal = createImageModal();
    const modalImg = modal.querySelector('img');
    const closeBtn = modal.querySelector('.imagen-modal-close');

    // Cerrar modal
    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Escape para cerrar modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Galería de imágenes
    const trabajos = [
        { url: 'images/trabajo1.png', descripcion: 'Detallado completo exterior' },
        { url: 'images/trabajo2.png', descripcion: 'Restauración de pintura' },
        { url: 'images/trabajo3.png', descripcion: 'Limpieza de tapicería' },
        { url: 'images/trabajo4.png', descripcion: 'Detallado de motor' },
        { url: 'images/trabajo5.png', descripcion: 'Restauración de faros' },
        { url: 'images/trabajo6.png', descripcion: 'Tratamiento cerámico' }
    ];

    const galeriaContainer = document.getElementById('galeria-trabajos');
    if (galeriaContainer) {
        trabajos.forEach(trabajo => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 fade-in';
            
            col.innerHTML = `
                <div class="trabajo-card">
                    <img src="${trabajo.url}" alt="${trabajo.descripcion}" class="img-fluid rounded">
                    <div class="trabajo-overlay">
                        <p>${trabajo.descripcion}</p>
                    </div>
                </div>
            `;
            
            // Agregar funcionalidad de zoom
            const img = col.querySelector('img');
            img.addEventListener('click', () => {
                modal.style.display = 'block';
                modalImg.src = trabajo.url;
                modalImg.alt = trabajo.descripcion;
                document.body.style.overflow = 'hidden';
            });
            
            galeriaContainer.appendChild(col);
            observer.observe(col);
        });
    }

    // Manejo del formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            this.reset();
        });
    }

    // Funcionalidad redes sociales
    const socials = {
        facebook: 'https://facebook.com/cardetailingpro',
        instagram: 'https://instagram.com/cardetailingpro',
        whatsapp: 'https://wa.me/1234567890'
    };

    document.querySelectorAll('.social-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const network = this.getAttribute('data-network');
            if (network === 'whatsapp') {
                // Asegurarse de que el número esté en el formato correcto para WhatsApp
                window.open(socials[network], '_blank');
            } else {
                window.open(socials[network], '_blank');
            }
        });
    });
});

// Efecto Parallax para secciones con clase .parallax
const parallaxSections = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    parallaxSections.forEach(section => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        section.style.backgroundPositionY = `${rate}px`;
    });
});