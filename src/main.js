import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points.js';

const tripInfoContainer = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const eventListContainer = document.querySelector('.trip-events');

const containers = {
  tripInfo: tripInfoContainer,
  filter: filterContainer,
  event: eventListContainer,
};

const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({containers, pointsModel});

boardPresenter.init();
