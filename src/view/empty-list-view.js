import { EmptyListMessage } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createEmptyListTemplate = ({ message }) => `
  <p class="trip-events__msg">${message}</p>
`;

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate({message: EmptyListMessage[this.#filterType]});
  }
}
