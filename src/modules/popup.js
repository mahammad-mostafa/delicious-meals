import Dom from './dom.js';
import FormManagement from './formManagement.js';
import Reservations from './reservations.js';
import Comments from './comments.js';

/* eslint-disable no-unused-vars */
export default class Popup {
  constructor(targetType, data) {
    this.renderPopup(data, targetType);
    this.dom = new Dom();
    this.formManagement = new FormManagement();
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

  renderPopup(data = {}, targetType) {
    if (data && targetType !== '') {
      this.dom.popup.classList.toggle('active'); // active : when popup is visible
      if (targetType === 'COMMENT' || targetType === 'RESERVATION') {
        this.renderDetails(data, targetType);
        this.renderInvolvement(data, targetType);
        this.formManagement.manageFormVisibility(targetType);
        if (targetType === 'COMMENT') {
          this.dom.popupFormComment.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.formManagement.checkFilledForm('popup-form-comment')) {
              const comment = new Comments(
                this.network,
                itemId,
                this.dom.popupFormReservation.elements.username.value, 
                this.dom.popupFormReservation.elements.comment.value
              );
              comment.postComment();
            } else {
              throw new Error('Invalid reservation Post');
            }
          });
        } else {
          this.dom.popupFormReservation.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.formManagement.checkFilledForm('popup-form-reservation')) {
              const reservation = new Reservations(
                this.network,
                itemId, 
                this.dom.popupFormReservation.elements.username.value, 
                this.dom.popupFormReservation.elements.date_start.value, 
                this.dom.popupFormReservation.elements.date_end.value
                );
              reservation.postReservationMethod();
            } else {
              throw new Error('Invalid reservation post request');
            }
          });
        }
        this.dom.popupClose.addEventListener('click', () => {
          this.clearPopup(targetType);
          this.formManagement.clearFormFields(targetType);  
        });
      } else {
        throw new Error('Invalid target type name');
      }
    } else {
      throw new Error('Invalid data type');
    }
  }
  
  clearPopup = (targetType) => {
    if (targetType !== '') {
      this.dom.popupImage.src = '';
      this.dom.popupTitle.textContent = '';
      this.dom.popupListTitle.textContent = '';
      this.dom.popupDescription.textContent = '';
      this.dom.popupList.textContent = '';
      this.dom.popupFormTitle.textContent = '';
      this.dom.popup.classList.toggle('active');
    }
  }
}