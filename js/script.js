// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');
const menuOverlay = document.getElementById('menuOverlay');
const menuItems = document.querySelectorAll('.menu-item');
const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
const currentYearElement = document.getElementById('currentYear');
//header scroll handler
const header = document.querySelector('.header');

// Set current year in footer
currentYearElement.textContent = new Date().getFullYear();

// toggle menu mobil
function toggleMenu() {
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

// cerrar menu
function closeMenuFunc() {
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Event listeners
menuToggle.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', closeMenuFunc);
menuOverlay.addEventListener('click', closeMenuFunc);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // cerrar menu if open
        closeMenuFunc();
        
        // Scroll to section
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update active menu item on scroll
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Update desktop menu
            menuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
            
            // Update mobile menu
            mobileMenuItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
});

function handleScroll() {
  const scrollPosition = window.scrollY;
//   const viewportHeight = window.innerHeight;

  if (scrollPosition >= /*(viewportHeight * 0.1)*/ 10) {
    header.classList.add('active');
  } else {
    header.classList.remove('active');
  }
}

window.addEventListener('scroll', handleScroll);
