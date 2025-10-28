// Header JavaScript - Infância Conectada
document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const header = document.querySelector('.header');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const userMenu = document.getElementById('userMenu');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Estado do menu mobile
    let isMobileMenuOpen = false;
    
    // Estado do dropdown do usuário
    let isUserMenuOpen = false;

    // Inicialização
    init();

    function init() {
        setupEventListeners();
        setupScrollEffects();
        setupActiveNavigation();
        setupAccessibility();
    }

    // Event Listeners
    function setupEventListeners() {
        // Toggle do menu mobile
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Links do menu mobile
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Menu do usuário (dropdown)
        if (userMenu) {
            userMenu.addEventListener('click', toggleUserMenu);
        }

        // Fechar menus ao clicar fora
        document.addEventListener('click', handleOutsideClick);

        // Fechar menus com ESC
        document.addEventListener('keydown', handleEscapeKey);

        // Redimensionamento da janela
        window.addEventListener('resize', handleResize);

        // Smooth scroll para links âncora
        setupSmoothScroll();
    }

    // Toggle do menu mobile
    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        mobileMenuToggle.classList.toggle('active', isMobileMenuOpen);
        mobileNav.classList.toggle('active', isMobileMenuOpen);
        
        // Atualizar aria-expanded
        mobileMenuToggle.setAttribute('aria-expanded', isMobileMenuOpen);
        
        // Prevenir scroll do body quando menu estiver aberto
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        
        // Animar entrada dos itens do menu
        if (isMobileMenuOpen) {
            animateMenuItems();
        }
    }

    // Fechar menu mobile
    function closeMobileMenu() {
        if (isMobileMenuOpen) {
            isMobileMenuOpen = false;
            mobileMenuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    // Toggle do menu do usuário
    function toggleUserMenu(e) {
        e.stopPropagation();
        isUserMenuOpen = !isUserMenuOpen;
        userMenu.classList.toggle('active', isUserMenuOpen);
    }

    // Fechar menu do usuário
    function closeUserMenu() {
        if (isUserMenuOpen) {
            isUserMenuOpen = false;
            userMenu.classList.remove('active');
        }
    }

    // Cliques fora dos menus
    function handleOutsideClick(e) {
        // Fechar menu mobile se clicar fora
        if (isMobileMenuOpen && !mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            closeMobileMenu();
        }
        
        // Fechar menu do usuário se clicar fora
        if (isUserMenuOpen && userMenu && !userMenu.contains(e.target)) {
            closeUserMenu();
        }
    }

    // Tecla ESC para fechar menus
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeUserMenu();
        }
    }

    // Redimensionamento da janela
    function handleResize() {
        // Fechar menu mobile em telas maiores
        if (window.innerWidth > 1024) {
            closeMobileMenu();
        }
    }

    // Efeitos de scroll
    function setupScrollEffects() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Header com transparência baseada no scroll
            if (currentScroll > 50) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.backdropFilter = 'blur(25px)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.85)';
                header.style.backdropFilter = 'blur(20px)';
            }
            
            // Auto-hide header (opcional)
            // if (currentScroll > lastScroll && currentScroll > 100) {
            //     header.style.transform = 'translateY(-100%)';
            // } else {
            //     header.style.transform = 'translateY(0)';
            // }
            
            lastScroll = currentScroll;
        });
    }

    // Navegação ativa
    function setupActiveNavigation() {
        // Marcar link ativo baseado na URL atual
        const currentPath = window.location.hash || '#home';
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Event listeners para navegação
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Smooth scroll para links âncora
    function setupSmoothScroll() {
        const allLinks = [...navLinks, ...mobileNavLinks];
        
        allLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(href);
                    
                    if (targetElement) {
                        const headerHeight = header.offsetHeight;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Fechar menu mobile após clique
                    closeMobileMenu();
                }
            });
        });
    }

    // Animar itens do menu mobile
    function animateMenuItems() {
        const menuItems = mobileNav.querySelectorAll('.mobile-nav-link, .mobile-login-btn');
        
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 50);
        });
    }

    // Acessibilidade
    function setupAccessibility() {
        // Navegação por teclado
        navLinks.forEach(link => {
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Focus trap no menu mobile
        if (mobileNav) {
            const focusableElements = mobileNav.querySelectorAll(
                'a, button, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];
                
                mobileNav.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab' && isMobileMenuOpen) {
                        if (e.shiftKey) {
                            if (document.activeElement === firstFocusable) {
                                lastFocusable.focus();
                                e.preventDefault();
                            }
                        } else {
                            if (document.activeElement === lastFocusable) {
                                firstFocusable.focus();
                                e.preventDefault();
                            }
                        }
                    }
                });
            }
        }
    }

    // Função para simular login (para demonstração)
    window.simulateLogin = function(type) {
        console.log(`Simulando login como: ${type}`);
        
        // Esconder botões de login
        const loginButtons = document.querySelector('.login-buttons');
        if (loginButtons) {
            loginButtons.style.display = 'none';
        }
        
        // Mostrar menu do usuário
        if (userMenu) {
            userMenu.style.display = 'block';
        }
        
        // Feedback visual
        showNotification(`Login realizado como ${type}`, 'success');
    };

    // Função para logout
    window.logout = function() {
        // Mostrar botões de login
        const loginButtons = document.querySelector('.login-buttons');
        if (loginButtons) {
            loginButtons.style.display = 'flex';
        }
        
        // Esconder menu do usuário
        if (userMenu) {
            userMenu.style.display = 'none';
        }
        
        closeUserMenu();
        showNotification('Logout realizado com sucesso', 'info');
    };

    // Sistema de notificações
    function showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            padding: '12px 20px',
            background: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'}`,
            borderRadius: '12px',
            color: '#F1F5F9',
            fontWeight: '500',
            fontSize: '14px',
            zIndex: '9999',
            opacity: '0',
            transform: 'translateX(100%)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        document.body.appendChild(notification);
        
        // Animar entrada
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        });
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Debug helper (remover em produção)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('🚀 Header JavaScript carregado com sucesso!');
        console.log('📱 Menu mobile:', mobileMenuToggle ? 'Encontrado' : 'Não encontrado');
        console.log('👤 Menu usuário:', userMenu ? 'Encontrado' : 'Não encontrado');
    }
});