 const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navbar');

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('show');
  });