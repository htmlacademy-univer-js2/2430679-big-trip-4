import ApiService from './framework/api-service';
import { Method } from './const';

export default class PointsApiService extends ApiService {
  async fetchData ({ url }) {
    const response = await this._load({ url });
    return ApiService.parseResponse(response);
  }

  getPoints() {
    return this.fetchData({ url: 'points' });
  }

  getOffers() {
    return this.fetchData({ url: 'offers' });
  }

  getDestinations() {
    return this.fetchData({ url: 'destinations' });
  }

  async addPoint(point) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(point),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    return ApiService.parseResponse(response);
  }

  async deletePoint(point) {
    await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(point),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    return ApiService.parseResponse(response);
  }
}
