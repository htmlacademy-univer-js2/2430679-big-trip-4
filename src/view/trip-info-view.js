import AbstractView from '../framework/view/abstract-view';
import {createTripInfoTemplate} from '../template/trip-info-template.js';

export default class TripInfoView extends AbstractView {
  #points = null;

  constructor(points) {
    super();
    this.#points = [...points];
  }

  get template() {
    return createTripInfoTemplate(this.#points);
  }
}
