//Select element function
const selectElement = selector => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Something went wrong! Make sure that ${selector} exists/is typed correctly.`);
};

//Nav styles on scroll
const scrollHeader = () => {
    const navbarElement = selectElement('.header');
    if (this.scrollY >= 15) {
        navbarElement.classList.add('navbar-scrolled');
    } else {
        navbarElement.classList.remove('navbar-scrolled');
    }
}

window.addEventListener('scroll', scrollHeader);

//Open and close nav
const menuToggleIcon = selectElement('.hamburger');

const toggleMenu = () => {
    const mobileMenu = selectElement('.nav');
    mobileMenu.classList.toggle('open');
}

menuToggleIcon.addEventListener('click', toggleMenu);

//Smooth scrolling select anchor links
const scrollUp = () => {
    const scrollUpBtn = selectElement('.back-to-top');
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
}

const scrollUpBtn = selectElement('.back-to-top');
scrollUpBtn.addEventListener('click', scrollUp);

//ScrollReveal animations
window.sr = ScrollReveal();

sr.reveal('.animate-left', {
    origin: 'left',
    duration: 1000,
    distance: '25rem',
    delay: 300
});

sr.reveal('.animate-right', {
    origin: 'right',
    duration: 1000,
    distance: '25rem',
    delay: 600
});

sr.reveal('.animate-top', {
    origin: 'top',
    duration: 1000,
    distance: '25rem',
    delay: 600
});

sr.reveal('.animate-bottom', {
    origin: 'bottom',
    duration: 1000,
    distance: '25rem',
    delay: 600
});