import { CITY, DESCRIPTION } from '../const';

const IMG_COUNT = 5;

const BOUND = 20;

function getMockDestination(identity) {
  return {
    id: identity,
    city: CITY.get(identity),
    description: DESCRIPTION.get(identity),
    img: Array.from({ length: IMG_COUNT },() => `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * BOUND)}`)
  };
}

export {getMockDestination};
