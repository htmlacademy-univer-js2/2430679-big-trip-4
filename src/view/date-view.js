import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class DateView {
  #commonConfig = {
    dateFormat: 'd/m/y H:i',
    enableTime: true,
    locale: {
      firstDayOfWeek: 1,
    },
    'time_24hr': true,
  };

  #date = null;

  constructor ({
    element,
    defaultDate,
    minDate = null,
    maxDate = null,
    onClose
  }) {
    this.#date = flatpickr(element, {
      ...this.#commonConfig,
      defaultDate,
      minDate,
      maxDate,
      onClose,
    });
  }

  destroy = () => {
    this.#date.destroy();
  };

  setMaxDate = (date) => {
    this.#date.set('maxDate', date);
  };

  setMinDate = (date) => {
    this.#date.set('minDate', date);
  };
}

