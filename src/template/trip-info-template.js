import {getTripTitle, getTripStart, getTripEnd} from '../utils';

function createTripInfoTemplate(points) {
  const total = points.reduce((acc, point) => acc + point.price, 0);
  const sortedPoints = points.sort((firstDate, secondDate) => new Date(firstDate.date.startTime) - new Date(secondDate.date.startTime));
  const cities = sortedPoints.map((point) => point.city);
  const tripTitle = getTripTitle(cities);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${tripTitle}</h1>

    <p class="trip-info__dates">>${getTripStart(sortedPoints)}nbsp;&mdash;&nbsp;${getTripEnd(sortedPoints)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
  </p>
</section>`;
}

export {createTripInfoTemplate};
