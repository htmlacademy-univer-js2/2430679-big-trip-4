import { render } from './render.js';
import TripPresenter from './presenter/board-presenter.js';
import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';
import { generateFilter } from './mock/filter.js';
import { getPoints, getOffersByType, getDestinations } from './mock/point.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');

const points = getPoints();
const offersByType = getOffersByType();
const destinations = getDestinations();

const pointsModel = new PointsModel();
pointsModel.init(points, destinations, offersByType);

const tripPresenter = new TripPresenter(siteMainElement.querySelector('.trip-events'), pointsModel);
tripPresenter.init();

const filters = generateFilter(pointsModel.points);

render(new FilterView(filters), siteHeaderElement.querySelector('.trip-controls__filters'));
