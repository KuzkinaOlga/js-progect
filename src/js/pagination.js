import Pagination from "tui-pagination";
// import 'tui-pagination/dist/tui-pagination.css';
import axios from "axios";
import { renderList, releaseDate, posterPath } from './render-list';
import noImg from '../images/no-poster-available.jpeg';
import { getRefs } from './get-refs';

const container = getRefs().gallery;
const containerTui = document.getElementById('tui-pagination-container');
// const instance = new Pagination(containerTui, { ... });

// instance.getCurrentPage();

let value = '';
let currentPage = 1;

const options = {
  totalItems: 20000,
  itemsPerPage: 20,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
      '</a>'
  }
};

const pagination = new Pagination(containerTui, options);


pagination.on('afterMove', e => {
  currentPage = e.page;
  console.log(currentPage);
  container.innerHTML = '';
  containerTui.classList.add('visually-hidden');
  paginationSearch(`https://api.themoviedb.org/3/trending/movie/week?page=${currentPage}&api_key=419c8d7d79cbcac22c5520f1ac14d2c7`);
  return currentPage;
});

 async function paginationSearch(url) {

  const data = await axios.get(url);
  const result = await data.data;
  const results = await result.results;
  renderList(results, container);

  containerTui.classList.remove('visually-hidden');
};

// pagination.on('beforeMove', evt => {
//   const { page } = evt;
//   const result = ajax.call({page});

//   if(result) {
//     pagination.movePageTo(page);
//   } else {
//     return false;
//   }
// });

export { pagination };
