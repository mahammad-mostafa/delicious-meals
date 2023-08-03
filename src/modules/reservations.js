export default class Reservations{
  constructor(network, itemId, username, dateStart, dateEnd) {
    this.network = network;
    this.itemId = itemId;
    this.username = username;
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
  }

  postReservationMethod = () => {
    this.network.postReservation(this);
  }
}