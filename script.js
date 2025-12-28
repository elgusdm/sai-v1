document.addEventListener('DOMContentLoaded', function () {
    initializeHeader();
    initializeNavigation();
    initializeScrollAnimations();
    initializeScrollAnim();
    initializeServiceModal();
});

// ============ HEADER SCROLL EFFECT ============
function initializeHeader() {
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scroll-active');
        } else {
            header.classList.remove('scroll-active');
        }
    });
}

// ============ MOBILE MENU TOGGLE ============
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger && hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    });
}

// ============ SMOOTH SCROLL ============
function initializeScrollAnimations() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Ignore anchors that open service modals (they use data-service)
            if (this.dataset && this.dataset.service) return;

            // If the current href no longer starts with '#', let it proceed (e.g. mailto)
            const currentHref = this.getAttribute('href');
            if (!currentHref || !currentHref.startsWith('#')) return;

            e.preventDefault();
            const targetId = currentHref;
            try {
                const target = document.querySelector(targetId);

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } catch (err) {
                // invalid selector like '#' — ignore silently
                return;
            }
        });
    });
}

// ============ INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ============
function initializeScrollAnim() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Aplicar animación según el tipo de elemento
                if (element.classList.contains('section-header')) {
                    element.classList.add('animate-fade-in-down');
                } else if (element.classList.contains('servicio-card')) {
                    element.classList.add('animate-fade-in-up', `animate-delay-${(index % 6) + 1}`);
                } else if (element.classList.contains('solucion-item')) {
                    element.classList.add('animate-scale-in', `animate-delay-${(index % 6) + 1}`);
                } else if (element.classList.contains('caso-card')) {
                    element.classList.add('animate-fade-in-up', `animate-delay-${(index % 3) + 1}`);
                } else if (element.classList.contains('hero-text')) {
                    element.classList.add('animate-fade-in-left');
                } else if (element.classList.contains('hero-visual')) {
                    element.classList.add('animate-fade-in-right');
                } else if (element.classList.contains('hero-stats')) {
                    // animate the stats container and its items in cascade
                    element.classList.add('animate-fade-in-up');
                    const items = element.querySelectorAll('.stat-item');
                    items.forEach((it, i) => {
                        it.classList.add('animate-fade-in-up', `animate-delay-${(i % 6) + 1}`);
                    });
                } else if (element.classList.contains('cta-content')) {
                    element.classList.add('animate-fade-in-down');
                } else {
                    element.classList.add('animate-fade-in-up');
                }

                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observar elementos
    const elementsToObserve = [
        '.section-header',
        '.servicio-card',
        '.solucion-item',
        '.caso-card',
        '.hero-text',
        '.hero-visual',
        '.hero-stats',
        '.cta-content'
    ];

    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.style.opacity = '0';
            observer.observe(element);
        });
    });
}

// ============ BUTTON ANIMATIONS ============
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// ============ UTILITY FUNCTIONS ============

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Log initialization
console.log('%c🚀 SAI - Software Empresarial Inteligente', 'color: #00BFFF; font-size: 16px; font-weight: bold;');
console.log('%cPágina cargada correctamente', 'color: #011C51; font-size: 12px;');

// ============ SERVICE MODAL ============
function initializeServiceModal() {
    const modal = document.getElementById('service-modal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalSubtitle = modal.querySelector('.modal-subtitle');
    const modalDescription = modal.querySelector('.modal-description');
    const modalPoints = modal.querySelector('.modal-points');
    const modalCta = modal.querySelector('.modal-cta');

    const serviceData = {
        'service-automation': {
            title: 'Automatización Inteligente',
            subtitle: 'Robots de software + modelos inteligentes',
            description: 'Automatizamos procesos críticos mediante orquestación y modelos de IA, reduciendo tiempos operativos y errores humanos.',
            points: [
                'Identificación y priorización de procesos automatizables',
                'Integración con sistemas existentes (ERP, CRM, etc.)',
                'Monitoreo y gobernanza de modelos en producción'
            ],
            ctaHref: '#contacto'
        },
        'service-predictive': {
            title: 'Análisis Predictivo',
            subtitle: 'Decisiones basadas en datos',
            description: 'Modelos predictivos que anticipan demandas, riesgos y oportunidades para una toma de decisiones informada.',
            points: [
                'Modelado estadístico y ML supervisado',
                'Evaluación de impacto y métricas de negocio',
                'Despliegue y pipelines de inferencia escalables'
            ],
            ctaHref: '#contacto'
        },
        'service-security': {
            title: 'Seguridad Avanzada',
            subtitle: 'Protección proactiva',
            description: 'Sistemas de detección y respuesta en tiempo real que combinan reglas y ML para mitigar amenazas.',
            points: [
                'Detección de anomalías y fraude en tiempo real',
                'Evaluaciones de vulnerabilidad y hardening',
                'Planes de respuesta y recuperación'
            ],
            ctaHref: '#contacto'
        },
        'service-integration': {
            title: 'Integración Personalizada',
            subtitle: 'Conectividad sin fricción',
            description: 'Conectamos nuestras soluciones con tu infraestructura con APIs, ETL y adaptadores para minimizar el impacto operativo.',
            points: [
                'APIs y conectores a sistemas legados',
                'Migración y sincronización de datos',
                'Pruebas e implementación con mínima interrupción'
            ],
            ctaHref: '#contacto'
        },
        'service-support': {
            title: 'Soporte Dedicado',
            subtitle: 'Equipo disponible 24/7',
            description: 'Soporte técnico especializado para resolver incidencias y mantener operaciones estables.',
            points: [
                'SLA personalizados',
                'Monitoreo y alertas proactivas',
                'Planes de mantenimiento y actualizaciones'
            ],
            ctaHref: '#contacto'
        },
        'service-training': {
            title: 'Capacitación Profesional',
            subtitle: 'Formación práctica para equipos',
            description: 'Programas adaptados para que tu equipo aproveche al máximo las soluciones y mantenga continuidad en el negocio.',
            points: [
                'Cursos prácticos y talleres in-company',
                'Materiales y evaluaciones certificadas',
                'Aseguramiento de transferencia de conocimiento'
            ],
            ctaHref: '#contacto'
        }
    };

    // Open modal on link click
    document.querySelectorAll('.card-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const key = this.dataset.service;
            const data = serviceData[key];
            if (!data) return;

            modalTitle.textContent = data.title;
            modalSubtitle.textContent = data.subtitle;
            modalDescription.textContent = data.description;
            modalPoints.innerHTML = '';
            data.points.forEach(p => {
                const li = document.createElement('li');
                li.textContent = p;
                modalPoints.appendChild(li);
            });
            // Si el dato ya contiene mailto lo usamos, si no generamos un mailto profesional
            const defaultEmail = 'contacto@sai.com';
            let href;
            if (data.ctaHref && typeof data.ctaHref === 'string' && data.ctaHref.startsWith('mailto:')) {
                href = data.ctaHref;
            } else {
                // Volver a usar las secuencias literales %0D%0A (CRLF) en el body
                const bodyEncoded = 'Hola,%0D%0A%0D%0AMe interesa recibir más información sobre: ' + encodeURIComponent(data.title) + '.%0D%0A%0D%0AQuedo atento.%0D%0A';
                href = `mailto:${defaultEmail}?subject=${encodeURIComponent('Interés: ' + data.title)}&body=${bodyEncoded}`;
            }
            modalCta.setAttribute('href', href);

            // Fallback: reemplazamos el handler para forzar apertura del mailto
            // Usamos onclick (reemplaza listeners previos) e intentamos abrir en nueva pestaña
            modalCta.onclick = function (ev) {
                const h = this.getAttribute('href') || '';
                if (!h.startsWith('mailto:')) return;
                try {
                    const w = window.open(h, '_blank');
                    if (w) {
                        w.focus();
                        ev.preventDefault();
                        return;
                    }
                } catch (err) {
                    // ignore
                }
                // Si falló abrir una nueva ventana, navegar la ventana actual
                ev.preventDefault();
                window.location.href = h;
            };

            openModal(modal);
        });
    });

    // Close handlers
    modal.querySelectorAll('[data-modal-close]').forEach(btn => {
        btn.addEventListener('click', () => closeModal(modal));
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
            closeModal(modal);
        }
    });

    function openModal(m) {
        m.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(m) {
        m.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}
