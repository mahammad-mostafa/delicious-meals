import { itemId } from "./dom";

export default class Reservation {
  constructor() {
    this.apiKey = 'PcvY2DNBAF4NwUCzWGCB',
    this.url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/'
  }

  // Method to post the reservation object created in popup.js
  postReservation = async (reservationObject) => {
    const response = await fetch(`${this.url}${this.apiKey}/reservations/`, {
      method: 'POST',
      body: JSON.stringify({
        item_id: reservationObject.item_id,
        username: reservationObject.username,
        date_start: reservationObject.date_start,
        date_end: reservationObject.date_end,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = response.json();
    return data;
  }

  // Method to get the data from the reservation API
  getReservationData = async () => {
    try {
      const response = await fetch(`${this.url}${this.apiKey}/reservations?item_id=${itemId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
}