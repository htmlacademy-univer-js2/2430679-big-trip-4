import { render } from './framework/render.js';
import TripPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewPointButtonView from './view/new-point-button-view.js';
import PointsApiService from './points-api-service.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import { AUTHORIZATION, END_POINT } from './mock/constants.js';

const siteMainElement = document.querySelector('.page-main');
const siteHeaderElement = document.querySelector('.trip-main');

const newPointButtonComponent = new NewPointButtonView();

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new PointsApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter(siteHeaderElement.querySelector('.trip-controls__filters'), filterModel, pointsModel);
filterPresenter.init();

const tripPresenter = new TripPresenter(siteHeaderElement.querySelector('.trip-main__trip-info'), siteMainElement.querySelector('.trip-events'), pointsModel, filterModel, destinationsModel, offersModel);
tripPresenter.init();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  tripPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      render(newPointButtonComponent, siteHeaderElement);
      newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
    });
  });
});
