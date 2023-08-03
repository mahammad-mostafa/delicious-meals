import FormManagement from './formManagement';
import Dom from './dom';

export default class {
  constructor(network) {
    this.formManagement = new FormManagement();
    this.dom = new Dom();
    this.network = network;
  }

  postReservationMethod = () => {
    if (this.formManagement.checkFilledForm('popup-form-reservation')) {
      const reservationObject = {
        item_id: data.itemDetails.item_id,
        username: this.dom.popupFormReservation.elements.username.value,
        date_start: this.dom.popupFormReservation.elements.date_start.value,
        date_end: this.dom.popupFormReservation.elements.date_end.value,
      };
      this.network.postReservation(reservationObject.item_id, reservationObject.username, reservationObject.date_start, reservationObject.date_end);
    } else {
      throw new Error('Invalid reservation Post');
    }
  }
}