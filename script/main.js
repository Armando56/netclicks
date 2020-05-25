

// меню
const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');


// открытие закрытие меню
hamburger.addEventListener('click', () => {
  // добавляем и убираем классы
  leftMenu.classList.toggle('openMenu');
  hamburger.classList.toggle('open');
});

// делаем по клику на document чтобы закрывалось меню 
// closest поднимается выше пока не найдет нужный класс
document.addEventListener('click', event => {
  if (!event.target.closest('.left-menu')) {
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
  }
});


// dropmenu меню 
leftMenu.addEventListener('click', event => {
  const target = event.target;
  const dropdown = target.closest('.dropdown');
  if (dropdown) {
    dropdown.classList.toggle('active');
    leftMenu.classList.add('openMenu');
    hamburger.classList.add('open');
  }
});
