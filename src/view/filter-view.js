import AbstractListView from '../framework/view/abstract-list-view.js';
import { capitalize } from '../utils/common';

const createFilterTemplate = ({filters}) => `
  <form class="trip-filters" action="#" method="get">
    ${filters.map(({ type, isDisabled, isChecked }) => `
      <div class="trip-filters__filter">
        <input
          id="filter-${type}"
          class="trip-filters__filter-input  visually-hidden"
          type="radio"
          name="trip-filter"
          value="${type}"
          data-item="${type}"
          ${isDisabled ? 'disabled' : ''}
          ${isChecked ? 'checked' : ''}
        >
        <label class="trip-filters__filter-label" for="filter-${type}">
          ${capitalize(type)}
        </label>
      </div>
    `).join('')}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;

export default class FilterView extends AbstractListView {
  get template() {
    return createFilterTemplate({ filters: this.items });
  }
}
