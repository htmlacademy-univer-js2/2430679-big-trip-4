import { FilterType } from '../const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  #filter = FilterType.EVERYTHING;

  set(updateType, updateFilter) {
    this.#filter = updateFilter;
    this._notify(updateType, updateFilter);
  }

  get() {
    return this.#filter;
  }
}
