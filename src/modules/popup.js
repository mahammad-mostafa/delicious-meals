import Dom from './dom.js';
import FormManagement from './formManagement.js';
import Reservations from './reservations.js';

/* eslint-disable no-unused-vars */
export default class Popup {
  constructor(targetType, data) {
    this.renderPopup(data, targetType);
    this.dom = new Dom();
    this.formManagement = new FormManagement();
    this.reservations = new Reservations();
  }

  renderDetails(data, targetType) {
    this.dom.popupImage.src = data.itemDetails.strMealThumb;
    this.dom.popupTitle.textContent = data.itemDetails.strMeal;
    this.dom.popupDescription.textContent = data.itemDetails.strInstructions;
    this.dom.popupListTitle.textContent = (targetType === 'COMMENT') ? 'Comments' : 'Reservations';
    this.dom.popupFormTitle.textContent = (targetType === 'COMMENT') ? 'Add Comment' : 'Add Reservation';
  }

  renderInvolvement(data, targetType) {
    let listItem = '';
    this.dom.popupList.textContent = ''; // clear all content before rendering
    if (targetType === 'COMMENT') {
      data.involvementList.forEach((comment) => {
        listItem += `<li>${comment.creation_date} ${comment.username}: ${comment.comment}</li>`;
      });
    } else {
      data.involvementList.forEach((reservation) => {
        listItem += `<li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>`;
      });
    }
    this.dom.popupList.textContent = listItem;
  }

  manageFormVisibility(targetType) {
    if (targetType === 'COMMENT') {
      this.dom.popupFormComment.classList.add('visible'); // visible : popup-form-comment is displayed
      this.dom.popupFormReservation.classList.remove('visible'); // remove visible : popup-form-comment is hidden
    } else {
      this.dom.popupFormReservation.classList.add('visible'); // visible : reservation_form is displayed
      this.dom.popupFormComment.classList.remove('visible'); // remove visible : popup-form-comment is hidden
    }
  }

  renderPopup(data = {}, targetType) {
    if (data && targetType !== '') {
      this.dom.popup.classList.toggle('active'); // active : when popup is visible
      if (targetType === 'COMMENT' || targetType === 'RESERVATION') {
        this.renderDetails(data, targetType);
        this.renderInvolvement(data, targetType);
        this.manageFormVisibility(targetType);
        if (targetType === 'COMMENT') {
          this.dom.popupFormComment.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.checkFilledForm('popup-form-comment')) {
              const commentObject = {
                item_id: data.itemDetails.item_id,
                username: this.dom.popupFormComment.elements.username.value,
                comment: this.dom.popupFormComment.elements.comment.value,
              };
              //* ** call here postData method to post comment through API ***
            } else {
              // please fill all fields message
            }
          });
        } else {
          this.dom.popupFormReservation.addEventListener('submit', (e) => {
            e.preventDefault();
            this.reservations.postReservationMethod();
          });
        }
        this.dom.popupClose.addEventListener('click', () => {
          this.formManagement.clearPopup(targetType);
        });
      } else {
        throw new Error('Invalid target type name');
      }
    } else {
      throw new Error('Invalid data type');
    }
  }
}
