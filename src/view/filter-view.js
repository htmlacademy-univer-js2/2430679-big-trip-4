import AbstractView from '../framework/view/abstract-view';
import {createFilterTemplate} from '../template/filter-template.js';

export default class FilterView extends AbstractView {
  #lengthOfPoints = 0;

  constructor(lengthOfPoints) {
    super();
    this.#lengthOfPoints = lengthOfPoints;
  }

  get template() {
    return createFilterTemplate(this.#lengthOfPoints);
  }
}
