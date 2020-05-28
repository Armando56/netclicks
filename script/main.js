const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';


// Elements

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');
const tvShows = document.querySelector('.tv-shows');
const tvCardImg = document.querySelector('.tv-card__img');
const modalTitle = document.querySelector('.modal__title');
const genresList = document.querySelector('.genres-list');
const rating = document.querySelector('.rating');
const description = document.querySelector('.description');
const modalLink = document.querySelector('.modal__link');
const searchForm = document.querySelector('.search__form');
const searchFormInput = document.querySelector('.search__form-input');

const loading = document.createElement('div');

loading.className = 'loading';

class DBService {

  constructor() {
    this.SERVER = 'https://api.themoviedb.org/3';
    this.API_KEY = '6fde90f133bfa2b744596078d78d03dd';
  }

  getData = async (url) => {
    const res = await fetch(url);

    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`Не удалось получить данные по адресу ${url}`);
    }
  }

  getTestData = () => {
    return this.getData('test.json');
  }

  getTestCard = () => {
    return this.getData('card.json');
  }

  getSearchResult = (query) => {
    return this.getData(`${this.SERVER}/search/tv?api_key=${this.API_KEY}&query=${query}&language=ru-RU`);
  }

  getTvShow = (id) => {
    return this.getData(`${this.SERVER}/tv/${id}?api_key=${this.API_KEY}&language=ru-RU`);
  }
}

console.log(new DBService().getSearchResult('Папа'));

const renderCard = (response) => {
  console.log(response.results);
  tvShowsList.textContent = '';

  response.results.forEach(item => {

    const {
      backdrop_path: backdrop,
      name: title,
      poster_path: poster,
      vote_average: vote,
      id
    } = item;
    const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
    const backdropIMG = backdrop ? IMG_URL + backdrop : '';
    const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

    const card = document.createElement('li');

    card.classList.add('tv-shows__item');
    card.innerHTML = `
        <a href="#" id="${id}" class="tv-card">
            ${voteElem}
            <img class="tv-card__img"
                src="${posterIMG}"
                data-backdrop="${backdropIMG}"
                alt="${title}">
            <h4 class="tv-card__head">${title}</h4>
        </a>
        `;

    loading.remove()
    tvShowsList.append(card);
  });
};

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const value = searchFormInput.value.trim();

  if (value) {
    tvShows.append(loading);
    new DBService().getSearchResult(value).then(renderCard);
  }

  searchFormInput.value = '';
});

// Open and close menu

hamburger.addEventListener('click', (event) => {
  leftMenu.classList.toggle('openMenu');
  hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.left-menu')) {
    leftMenu.classList.remove('openMenu');
    hamburger.classList.remove('open');
  }
});

leftMenu.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;
  const dropdown = target.closest('.dropdown');

  if (dropdown) {
    dropdown.classList.toggle('active');
    leftMenu.classList.add('openMenu');
    hamburger.classList.add('open');
  }
});

/*  // My code for main part of Netclicks website
// Change images on tv-cards
const tvCards = document.querySelectorAll('.tv-card');
const tvCardImages = document.querySelectorAll('.tv-card__img');
let rememberSrc; //variable, which will contain image's src
tvCardImages.forEach(elem => {
    elem.addEventListener('mouseover', (event) => {
        rememberSrc = elem.src;
        elem.src = elem.getAttribute('data-backdrop');
    });
});
tvCardImages.forEach(elem => {
    elem.addEventListener('mouseout', (event) => {
        elem.src = rememberSrc;
    });
});
*/

// Open modal window

tvShowsList.addEventListener('click', (event) => {
  event.preventDefault();

  const target = event.target;
  const card = target.closest('.tv-card');

  if (card) {
    new DBService().getTvShow(card.id).then(data => {
      tvCardImg.src = IMG_URL + data.poster_path;
      tvCardImg.alt = data.name;
      modalTitle.textContent = data.name;
      /* genresList.innerHTML = data.genres.reduce((acc, item) => {
          return `${acc}<li>${item.name}</li>`
      }, ''); */
      genresList.textContent = '';

      for (const item of data.genres) {
        genresList.innerHTML += `<li>${item.name}</li>`;
      }
      rating.textContent = data.vote_average;
      description.textContent = data.overview;
      modalLink.href = data.homepage;
    }).then(() => {
      document.body.style.overflow = "hidden";
      modal.classList.remove('hide');
    })
  };
});

// Close modal window

modal.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal') || event.target.closest('.cross')) {
    document.body.style.overflow = "";
    modal.classList.add('hide');
  }
});

// Changing cards' images

const changeImage = event => {
  const card = event.target.closest('.tv-shows__item');

  /* if (card) {
      const img = card.querySelector('.tv-card__img');
      const changeImg = img.dataset.backdrop;
      if (changeImage) {
          img.dataset.backdrop = img.src;
          img.src = changeImg;
      }
  }
  */

  // Метод деструктуризации

  if (card) {
    const img = card.querySelector('.tv-card__img');

    if (img.dataset.backdrop) {
      [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
    }
  }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);



