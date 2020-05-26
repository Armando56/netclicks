const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = '6fde90f133bfa2b744596078d78d03dd';
// меню
const leftMenu = document.querySelector('.left-menu'),
  hamburger = document.querySelector('.hamburger'),
  tvShowsList = document.querySelector('.tv-shows__list'),
  modal = document.querySelector('.modal');


// классы
const DBService = class {

  getData = async (url) => {
    const res = await fetch(url);
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(` Не удалось получить данные по адресу ${url}`)
    }
  }

  getTestData = () => {
    return this.getData('test.json')
  }
}

const renderCard = response => {
  console.log(response);
  tvShowsList.textContent = '';

  response.results.forEach(item => {

    const {
      backdrop_path: backdrop,
      name: title,
      poster_path: poster,
      vote_average: vote
    } = item;

    const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
    const backdropIMG = '';
    const voteElem = '';


    const card = document.createElement('li');
    card.classList.add('tv-shows__item');
    card.innerHTML = `
    <a href="#" class="tv-card">
      <span class="tv-card__vote">${vote}</span>
      <img class="tv-card__img"
        src="${posterIMG}"
        data-backdrop="${IMG_URL + backdrop}"
        alt="${title}">
      <h4 class="tv-card__head">${title}</h4>
    </a>
    `;

    tvShowsList.append(card);

  });


};

new DBService().getTestData().then(renderCard);

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


// при наведении на картинку
// картинка меняется на другую

// const tvCardImg = document.querySelector('.tv-shows');
// const cardImg = function (event) {
//   const target = event.target;
//   const tvCard = target.closest('.tv-card__img');
//   if (tvCard) {
//     const backdropURL = tvCard.dataset.backdrop;
//     tvCard.dataset.backdrop = tvCard.src;
//     tvCard.src = backdropURL;
//   }
// };
// tvCardImg.addEventListener('mouseover', cardImg);
// tvCardImg.addEventListener('mouseout', cardImg);


// модальное окно открытие
tvShowsList.addEventListener('click', event => {

  event.preventDefault();


  const target = event.target;
  const card = target.closest('.tv-card');

  if (card) {
    document.body.style.overflow = 'hidden';
    modal.classList.remove('hide');
  }
});
// закрытие
modal.addEventListener('click', event => {
  // if (event.target.classList.contains('.cross'));
  if (event.target.closest('.cross') ||
    event.target.classList.contains('modal')) {
    document.body.style.overflow = '';
    modal.classList.add('hide')
  }
});

// при наведении на картинку учитель
// картинка меняется на другую
// const changeImage = event => {
//   const card = event.target.closest('.tv-shows__item');

//   if (card) {
//     const img = card.querySelector('.tv-card__img');
//     const changeImg = img.dataset.backdrop;
//     if (changeImg) {
//       img.dataset.backdrop = img.src;
//       img.src = changeImg;
//     }
//   }
// };
// tvShowsList.addEventListener('mouseover', changeImage);
// tvShowsList.addEventListener('mouseout', changeImage);


// при наведении на картинку
// картинка меняется на другую методом деструктрузация

const changeImage = event => {
  const card = event.target.closest('.tv-shows__item');
  if (card) {
    const img = card.querySelector('.tv-card__img');
    const changeImg = img.dataset.backdrop;
    if (img.dataset.backdrop) {
      [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]
    }
  }
};
tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);


