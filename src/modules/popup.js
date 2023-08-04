import Dom from './dom.js';
import Reservations from './reservations.js';
import Comments from './comments.js';
import counter from './counter.js';

export default class Popup {
  constructor(network) {
    this.dom = new Dom();
    this.network = network;
    this.dom.popupFormComment.addEventListener('submit', this.handleCommentSubmission);
    this.dom.popupFormReservation.addEventListener('submit', this.handleReservationSubmission);
    this.dom.popupClose.addEventListener('click', this.clearPopup);
  }

  renderDetails = ({ strMealThumb, strMeal, strInstructions }) => {
    this.dom.popupImage.src = strMealThumb;
    this.dom.popupTitle.textContent = strMeal;
    this.dom.popupDescription.textContent = strInstructions;
  }

  renderInvolvement = ({ targetType, involvementList }) => {
    let listItem = '';
    this.dom.popupList.textContent = ''; // clear all content before rendering
    if (targetType === 'comments') {
      involvementList.forEach((comment) => {
        listItem += `<li><b>${comment.username}:</b><br/>${comment.comment}<br/><i>${comment.creation_date}</i></li>`;
      });
    } else {
      involvementList.forEach((reservation) => {
        listItem += `<li><b>${reservation.username}</b><br/>from ${reservation.date_start} to ${reservation.date_end}</li>`;
      });
    }
    this.dom.popupList.innerHTML = listItem;
    const counterList = counter(this.dom.popupList);
    this.dom.popupListTitle.textContent = (targetType === 'comments') ? `Comments (${counterList})` : `Reservations (${counterList})`;
  }

  manageFormVisibility = (targetType, itemId) => {
    if (targetType === 'comments') {
      this.dom.popupFormComment.item_id.value = itemId;
      this.dom.popupFormComment.classList.add('form-visible'); // form-visible : popup-form-comment is displayed
    } else {
      this.dom.popupFormReservation.item_id.value = itemId;
      this.dom.popupFormReservation.classList.add('form-visible'); // form-visible : reservation_form is displayed
    }

    this.dom.popupFormTitle.textContent = (targetType === 'comments') ? 'Add Comment' : 'Add Reservation';
  }

  renderPopup = ({ targetType, itemDetails, involvementList }) => {
    this.targetType = targetType;
    this.dom.popup.classList.toggle('popup-visible'); // popup-visible : when popup is visible
    if (targetType === 'comments' || targetType === 'reservations') {
      this.renderDetails(itemDetails.meals[0]);
      this.renderInvolvement({ targetType, involvementList });
      this.manageFormVisibility(targetType, itemDetails.meals[0].idMeal);
    } else {
      throw new Error('Invalid target type name');
    }
  }

  clearPopup = () => {
    if (this.targetType !== '') {
      this.dom.popupImage.src = '';
      this.dom.popupTitle.textContent = '';
      this.dom.popupListTitle.textContent = '';
      this.dom.popupDescription.textContent = '';
      this.dom.popupList.textContent = '';
      this.dom.popupFormTitle.textContent = '';
      this.dom.popup.classList.remove('popup-visible');

      if (this.targetType === 'comments') {
        const itemId = this.dom.popupFormComment.item_id.value;
        this.dom.popupFormComment.reset();
        this.dom.popupFormComment.item_id.value = itemId;
        this.dom.popupFormComment.classList.remove('form-visible'); // remove form-visible : popup-form-comment is hidden
      } else if (this.targetType === 'reservations') {
        const itemId = this.dom.popupFormReservation.item_id.value;
        this.dom.popupFormReservation.reset();
        this.dom.popupFormReservation.item_id.value = itemId;
        this.dom.popupFormReservation.classList.remove('form-visible'); // remove form-visible : popup-form-comment is hidden
      } else {
        throw new Error('Invalid target type name');
      }
    }
  }

  checkFilledForm = (formElement) => {
    let isFilled = true;
    const inputArray = Array.from(formElement.elements);
    inputArray.forEach((input) => {
      if (input.value === '' && input.tagName !== 'BUTTON') {
        isFilled = false;
      }
    });
    return isFilled;
  }

  handleCommentSubmission = (e) => {
    e.preventDefault();
    if (this.checkFilledForm(this.dom.popupFormComment)) {
      const comment = new Comments(
        this.dom.popupFormComment.item_id.value,
        this.dom.popupFormComment.username.value,
        this.dom.popupFormComment.comment.value,
      );
      this.network.postComment(comment);
      this.dom.popupFormComment.reset();
    }
  }

  handleReservationSubmission = (e) => {
    e.preventDefault();
    if (this.checkFilledForm(this.dom.popupFormReservation)) {
      const reservation = new Reservations(
        this.dom.popupFormReservation.item_id.value,
        this.dom.popupFormReservation.username.value,
        this.dom.popupFormReservation.date_start.value,
        this.dom.popupFormReservation.date_end.value,
      );
      this.network.postReservation(reservation);
      this.dom.popupFormReservation.reset();
    }
  }
}