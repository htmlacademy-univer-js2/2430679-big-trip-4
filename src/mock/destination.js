import {DESCRIPTION} from '../const';

const IMAGE_COUNT = 5;

const ID_NUMBER = 100;

function getMockDestination(identity) {
  return {
    id: identity,
    description: DESCRIPTION.get(identity),
    img: Array.from({ length: IMAGE_COUNT },() => `https://loremflickr.com/248/152?random=${Math.floor(Math.random() * ID_NUMBER)}`)
  };
}

export {getMockDestination};
