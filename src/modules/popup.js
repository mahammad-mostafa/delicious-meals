import Dom from './dom.js';

/* eslint-disable no-unused-vars */
export default class Popup {
  constructor(network) {
    this.dom = new Dom();
    this.network = network;
  }

  countInvolvementElements() {
    return this.dom.popupList.childElementCount;
  }

  renderDetails({strMealThumb, strMeal, strInstructions}) {
    this.dom.popupImage.src = strMealThumb;
    this.dom.popupTitle.textContent = strMeal;
    this.dom.popupDescription.textContent = strInstructions;
  }

  renderInvolvement(targetType, involvementList) {
    let listItem = '';
    this.dom.popupList.textContent = ''; // clear all content before rendering
    if (targetType === 'COMMENT') {
      involvementList.forEach((comment) => {
        listItem += `<li>${comment.creation_date} ${comment.username}: ${comment.comment}</li>`;
      });
    } else {
      involvementList.forEach((reservation) => {
        listItem += `<li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>`;
      });
    }
    this.dom.popupList.innerHTML = listItem;
  }

  manageFormVisibility(targetType) {
    if (targetType === 'COMMENT') {
      this.dom.popupFormComment.classList.add('popup-visible'); // popup-visible : popup-form-comment is displayed
      this.dom.popupFormReservation.classList.remove('popup-visible'); // remove popup-visible : popup-form-comment is hidden
    } else {
      this.dom.popupFormReservation.classList.add('popup-visible'); // popup-visible : reservation_form is displayed
      this.dom.popupFormComment.classList.remove('popup-visible'); // remove popup-visible : popup-form-comment is hidden
    }
    
    this.dom.popupListTitle.textContent = (targetType === 'comments') ? `Comments ('${this.countInvolvementElements()}')` : `Reservations ('${this.countInvolvementElements()}')`;
    this.dom.popupFormTitle.textContent = (targetType === 'comments') ? 'Add Comment' : 'Add Reservation';
  }

  handleFormSubmission(targetType, itemId) {
    const formName = (targetType === 'comments') ? 'popup-form-comment' : 'popup-form-reservation';
    const formElement = (targetType === 'comments') ? this.dom.popupFormComment : this.dom.popupFormReservation;
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.checkFilledForm(formElement)) {
        if (formName === 'popup-form-comment') {
          const commentObject = {
            item_id: itemId,
            username: this.dom.popupFormComment.elements.username.value,
            comment: this.dom.popupFormComment.elements.comment.value,
          };
          //* ** call here postData method to post comment through API ***
        } else if (formName === 'popup-form-reservation') {
          const reservationObject = {
            item_id: itemId,
            username: this.dom.popupFormReservation.elements.username.value,
            date_start: this.dom.popupFormReservation.elements.date_start.value,
            date_end: this.dom.popupFormReservation.elements.date_end.value,
          };
          //* ** call here postData method to post reservation through API ***
        }
      } else {
        // please fill all fields message
      }
    });
  }

  renderPopup({targetType, itemDetails, involvementList}) {
    this.dom.popup.classList.toggle('popup-visible'); // popup-visible : when popup is visible
    if (targetType === 'comments' || targetType === 'reservations') {
      this.renderDetails(itemDetails.meals[0]);
      this.renderInvolvement(targetType, involvementList);
      this.manageFormVisibility(targetType);
      this.handleFormSubmission(targetType, itemDetails.meals[0].mealId);
      this.dom.popupClose.addEventListener('click', () => {
        this.clearPopup(targetType);
      });
    } else {
      throw new Error('Invalid target type name');
    }
  }

  clearPopup(targetType) {
    if (targetType !== '') {
      this.dom.popupImage.src = '';
      this.dom.popupTitle.textContent = '';
      this.dom.popupListTitle.textContent = '';
      this.dom.popupDescription.textContent = '';
      this.dom.popupList.textContent = '';
      this.dom.popupFormTitle.textContent = '';
      this.dom.popup.classList.remove('popup-visible');

      if (targetType === 'comments') {
        this.dom.popupFormComment.reset();
      } else if (targetType === 'reservations') {
        this.dom.popupFormReservation.reset();
      } else {
        throw new Error('Invalid target type name');
      }
    }
  }

  /* eslint-disable no-undef */
  /* eslint-disable class-methods-use-this */
  /* eslint-disable no-restricted-syntax */
  checkFilledForm(formElement) {
    let isFilled = true;
    for (element of formElement.elements) {
      if (element.value === '') {
        isFilled = false;
      }
    }
    return isFilled;
  }
}