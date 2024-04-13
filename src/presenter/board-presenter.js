import {render, RenderPosition, replace} from '../framework/render';
import EmptyListView from '../view/empty-list-view.js';
import EventListView from '../view/event-list-view.js';
import FilterView from '../view/filter-view';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import TripInfoView from '../view/trip-info-view';

export default class BoardPresenter {
  #eventList = new EventListView();
  #containers = null;
  #pointsModel = null;
  #tripPoints = null;

  constructor({containers, pointsModel}) {
    this.#containers = containers;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points];

    render(new FilterView(this.#tripPoints.length), this.#containers.filter);

    if (this.#tripPoints.length > 0) {
      render(new TripInfoView(this.#tripPoints), this.#containers.tripInfo, RenderPosition.AFTERBEGIN);
      render(new SortView(), this.#containers.event);
      render(this.#eventList, this.#containers.event);
      this.#tripPoints.forEach((point) => this.#renderPoint(point));
    } else {
      render(new EmptyListView(), this.#containers.event);
    }
  }

  #renderPoint(point) {
    const pointComponent = new PointView({
      point,
      onEditClick,
    });

    const pointEditComponent = new PointEditView({
      point,
      onPointEditReset,
      onPointEditSubmit,
    });

    const escKeydown = (evt) => {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        replace(pointComponent, pointEditComponent);
        document.removeEventListener('keydown', escKeydown);
      }
    };

    const onEditClick = () => {
      replace(pointEditComponent, pointComponent);
      document.addEventListener('keydown', escKeydown);
    }

    const onPointEditSubmit = () => {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', escKeydown);
    }

    const onPointEditReset = () => {
      replace(pointComponent, pointEditComponent);
      document.removeEventListener('keydown', escKeydown);
    }

    render(pointComponent, this.#eventList.element);
  }
}
