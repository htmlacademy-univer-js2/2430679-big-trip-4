import { DestinationsModel, FilterModel, OffersModel, PointsModel } from './model';
import { FilterPresenter, NewPointButtonPresenter, TripInfoPresenter, TripPresenter } from './presenter';
import { AUTHORIZATION, END_POINT } from './const.js';
import PointsApiService from './points-api-service.js';

const pageElement = document.querySelector('.page-main');
const eventsElement = pageElement.querySelector('.trip-events');
const tripElement = document.querySelector('.trip-main');
const controlsElement = tripElement.querySelector('.trip-controls__filters');

const service = new PointsApiService(END_POINT, AUTHORIZATION);
const destinationsModel = new DestinationsModel({ service });
const offersModel = new OffersModel({ service });
const pointsModel = new PointsModel({ service, destinationsModel, offersModel });
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  container: controlsElement,
  pointsModel,
  filterModel,
});

const newPointButtonPresenter = new NewPointButtonPresenter({
  container: tripElement,
});

const tripInfoPresenter = new TripInfoPresenter({
  container: tripElement,
  pointsModel,
  destinationsModel,
  offersModel,
});

const tripPresenter = new TripPresenter({
  container: eventsElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
  newPointButtonPresenter,
});

newPointButtonPresenter.init({
  onClick: tripPresenter.handleNewPointClick,
});

filterPresenter.init();
tripPresenter.init();
pointsModel.init();
tripInfoPresenter.init();

