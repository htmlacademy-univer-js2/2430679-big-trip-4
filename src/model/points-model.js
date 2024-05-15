import { createPoint } from '../mock/task';

export default class pointsModel {

  #point = Array.from({ length: 10 }, createPoint);

  get point() {
    return this.#point;
  }
}
