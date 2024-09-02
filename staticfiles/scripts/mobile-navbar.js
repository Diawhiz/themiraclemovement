const navbarToggle = document.querySelector('.navbar-burger');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', ()=> {
    navbarToggle.classList.toggle('is-active');
    navbarMenu.style.display = 'flex';

    navbarMenu.style.display = 'none'; //hide navbar after toggle display
})