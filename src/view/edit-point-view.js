import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { ButtonLabel, FormType, POINT_EMPTY } from '../const.js';
import { formatStringToDateTime } from '../utils/point';
import { capitalize, getLastWord } from '../utils/common';
import DateView from './date-view.js';
import he from 'he';

const createPointEditButtonsTemplate = ({ pointType, isDisabled, isSaving, isDeleting }) => {
  const isEditing = pointType === FormType.EDITING;
  const saveLabel = isSaving ? ButtonLabel.SAVE_IN_PROGRESS : ButtonLabel.SAVE;

  let resetLabel;
  if (isEditing) {
    resetLabel = isDeleting ? ButtonLabel.DELETE_IN_PROGRESS : ButtonLabel.DELETE;
  } else {
    resetLabel = ButtonLabel.CANCEL;
  }

  return `
    <button
      class="event__save-btn  btn  btn--blue"
      type="submit"
      ${isDisabled ? 'disabled' : ''}
    >
      ${saveLabel}
    </button>
    <button
      class="event__reset-btn"
      type="reset"
    >
      <span ${isDisabled ? 'disabled' : ''}>${resetLabel}</span>
    </button>
    ${isEditing ? `
      <button
        class="event__rollup-btn"
        type="button"
      >
        <span class="visually-hidden" ${isDisabled ? 'disabled' : ''}>Open event</span>
      </button>`
    : ''}
  `;
};

const createPointTypesTemplate = ({ offers, isDisabled }) => `
  <fieldset class="event__type-group">
    <legend class="visually-hidden">Event type</legend>
    ${offers.map(({ type }) => `
      <div class="event__type-item">
        <input
          id="event-type-${type}-1"
          class="event__type-input  visually-hidden"
          type="radio" name="event-type"
          value="${type}"
          ${isDisabled ? 'disabled' : ''}
        >
        <label
          class="event__type-label  event__type-label--${type}"
          for="event-type-${type}-1"
        >
          ${capitalize(type)}
        </label>
      </div>
    `).join('')}
  </fieldset>
`;

const createPointCitiesTemplate = ({ destinations, isDisabled }) => `
  <datalist
    id="destination-list-1"
    ${(isDisabled) ? 'disabled' : ''}
  >
    ${destinations.map(({ name }) => `<option value="${name}"></option>`).join('')}
  </datalist>
`;

const createOffersTemplate = ({ offers, selectedOffers }) => `
  <div class="event__available-offers">
    ${offers.map((offer) => {
    const offerType = getLastWord(offer.title);
    const checked = selectedOffers.some((offerId) => offerId === offer.id) ? 'checked' : '';
    return `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${offerType}-${offer.id}"
        type="checkbox"
        name="event-offer-${offerType}"
        data-offer-id="${offer.id}"
        ${checked}
      >
      <label
        class="event__offer-label"
        for="event-offer-${offerType}-${offer.id}"
      >
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`;
  }).join('')}
  </div>
`;

const createDestinationPhotosTemplate = ({ destination }) => `
  <div class="event__photos-tape">
    ${destination.pictures.map((picture) => `
      <img class="event__photo" src="${picture.src}" alt="${picture.description}">
    `).join('')}
  </div>
`;

const createOffersSectionTemplate = ({ offers, selectedOffers }) => `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${createOffersTemplate({ offers, selectedOffers })}
    </div>
  </section>
`;

const createDestinationSectionTemplate = ({ destination }) => {
  if (!destination.pictures.length && !destination.description.length) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${destination.description.length
    ? `<p class="event__destination-description">
        ${destination.description}
      </p>` : ''}

      ${destination.pictures.length
    ? `<div class="event__photos-container">
        ${createDestinationPhotosTemplate({ destination })}
      </div>` : ''}

    </section>`;
};

const createEventDetailsTemplate = ({
  currentDestination,
  currentOffers,
  selectedOffers
}) => `
  <section class="event__details">
  ${currentOffers.length ?
    createOffersSectionTemplate({ offers: currentOffers, selectedOffers })
    : ''}
  ${currentDestination ?
    createDestinationSectionTemplate({ destination: currentDestination })
    : ''}
  </section>
`;

const createEditPointTemplate = ({ state, destinations, offers, pointType }) => {
  const { point, isDisabled, isSaving, isDeleting } = state;
  const { basePrice, dateFrom, dateTo, offers: selectedOffers, type } = point;
  const currentDestination = destinations.find((destination) => destination.id === point.destination);
  const currentOffers = offers.find((offer) => offer.type === type)?.offers;
  return `
    <li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input
              class="event__type-toggle  visually-hidden"
              id="event-type-toggle-1"
              type="checkbox"
              ${isDisabled ? 'disabled' : ''}
            >
            <div class="event__type-list">
              ${createPointTypesTemplate({ offers, isDisabled })}
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${capitalize(type)}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-1"
              type="text"
              name="event-destination"
              value="${currentDestination ? he.encode(currentDestination.name) : ''}"
              list="destination-list-1"
              ${isDisabled ? 'disabled' : ''}
            >
            ${createPointCitiesTemplate({ destinations, isDisabled })}
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-1"
              type="text"
              name="event-start-time"
              value="${ point.dateFrom ? formatStringToDateTime(dateFrom) : ''}"
              ${isDisabled ? 'disabled' : ''}
            >
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-1"
              type="text"
              name="event-end-time"
              value="${ point.dateTo ? formatStringToDateTime(dateTo) : ''}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-1"
              type="text"
              name="event-price"
              value="${he.encode(String(basePrice))}"
              ${isDisabled ? 'disabled' : ''}
            >
          </div>

          ${createPointEditButtonsTemplate({ pointType, isDisabled, isSaving, isDeleting })}
        </header>
        ${createEventDetailsTemplate({ currentDestination, currentOffers, selectedOffers })}
      </form>
    </li>
  `;
};

export default class EditPointView extends AbstractStatefulView {
  #destinations = null;
  #offers = null;
  #handleFormClose = null;
  #handleFormSubmit = null;
  #handleFormDelete = null;
  #dateFrom = null;
  #dateTo = null;
  #pointType = null;

  constructor({
    point = POINT_EMPTY,
    destinations,
    offers,
    onClose,
    onSubmit,
    onDelete,
    pointType = FormType.EDITING,
  }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleFormClose = onClose;
    this.#handleFormSubmit = onSubmit;
    this.#handleFormDelete = onDelete;
    this.#pointType = pointType;
    this._setState(EditPointView.parsePointToState({point}));
    this._restoreHandlers();
  }

  reset = (point) => this.updateElement({ point });

  removeElement = () => {
    super.removeElement();

    if (this.#dateFrom) {
      this.#dateFrom.destroy();
      this.#dateFrom = null;
    }

    if (this.#dateTo) {
      this.#dateTo.destroy();
      this.#dateTo = null;
    }
  };

  _restoreHandlers = () => {
    if (this.#pointType === FormType.EDITING) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeClickHandler);

      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#deleteClickHandler);
    }

    if (this.#pointType === FormType.CREATING) {
      this.element
        .querySelector('.event__reset-btn')
        .addEventListener('click', this.#closeClickHandler);
    }

    this.element
      .querySelector('form')
      .addEventListener('submit', this.#submitClickHandler);

    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);

    this.element
      .querySelector('.event__available-offers')
      ?.addEventListener('change', this.#offerChangeHandler);

    this.#setDates();
  };

  #setDates = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');

    this.#dateFrom = new DateView({
      element: dateFromElement,
      defaultDate: this._state.point.dateFrom,
      maxDate: this._state.point.dateTo,
      onClose: this.#dateFromCloseHandler,
    });

    this.#dateTo = new DateView({
      element: dateToElement,
      defaultDate: this._state.point.dateTo,
      minDate: this._state.point.dateFrom,
      onClose: this.#dateToCloseHandler,
    });
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #submitClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditPointView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      point: {
        ...this._state.point,
        type: evt.target.value,
        offers: [],
      },
    });
  };

  #priceChangeHandler = (evt) => {
    this._setState({
      point: {
        ...this._state.point,
        basePrice: evt.target.value,
      }
    });
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations
      .find((destination) => destination.name === evt.target.value);
    if (!selectedDestination) {
      return;
    }

    this.updateElement({
      point: {
        ...this._state.point,
        destination: selectedDestination.id,
      }
    });
  };

  #offerChangeHandler = () => {
    const selectedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({
      point: {
        ...this._state.point,
        offers: selectedOffers.map((element) => element.dataset.offerId),
      }
    });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateFrom: userDate
      }
    });

    this.#dateTo.setMinDate(this._state.point.dateFrom);
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({
      point: {
        ...this._state.point,
        dateTo: userDate
      }
    });

    this.#dateFrom.setMaxDate(this._state.point.dateTo);
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(EditPointView.parseStateToPoint(this._state));
  };

  get template() {
    return createEditPointTemplate({
      state: this._state,
      destinations: this.#destinations,
      offers: this.#offers,
      pointType: this.#pointType,
    });
  }

  get isDisabled() {
    return this._state.isDisabled;
  }

  get isSaving() {
    return this._state.isDisabled;
  }

  get isDeleting() {
    return this._state.isDeleting;
  }

  static parsePointToState = ({
    point,
    isDisabled = false,
    isSaving = false,
    isDeleting = false
  }) => ({
    point,
    isDisabled,
    isSaving,
    isDeleting
  });

  static parseStateToPoint = (state) => state.point;
}
