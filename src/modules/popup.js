import {
  popupSection,
  closeButton,
  mealImage,
  mealTitle,
  mealDescription,
  subTitleAction,
  dateList,
  addActionTitle,
  commentForm,
  reservationForm,
  commentUsername,
  commentArea,
  reservationUsername,
  reservationDateStart,
  reservationDateEnd,
  itemId,
} from './dom.js';

import Reservation from './reservations.js';

// Initialize the constant
const newReservation = new Reservation();

/* eslint-disable no-unused-vars */
class Popup {
  constructor(targetType) {
    this.targetType = targetType;
  }

  renderPopup(data = {}) {
    if (data && this.targetType !== '') {
      popupSection.classList.toggle('active'); // active : when popup is visible
      mealTitle.src = data.strMealThumb;
      mealDescription.innerHTML = data.strInstructions;

      if (this.targetType === 'COMMENT' || this.targetType === 'RESERVATION') {
        subTitleAction.innerHTML = (this.targetType === 'COMMENT') ? 'Comments' : 'Reservations';
        addActionTitle.innerHTML = (this.targetType === 'COMMENT') ? 'Add Comment' : 'Add Reservation';
        let listItem = '';

        if (this.targetType === 'COMMENT') {
          data.comments.forEach((comment) => {
            listItem += `<li>${comment.creation_date} ${comment.username}: ${comment.comment}</li>`;
          });
          commentForm.classList.toggle('visible'); // visible : comment_form is displayed
          commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.checkFilledForm('comment_form')) {
              const commentObject = {
                item_id: itemId.value,
                username: commentUsername.value,
                comment: commentArea.value,
              };
              //* ** call here postData method to post comment through API ***
            } else {
              // please fill all fields message
            }
          });
        } else {
          data.reservations.forEach((reservation) => {
            listItem += `<li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>`;
          });
          reservationForm.classList.toggle('visible'); // visible : reservation_form is displayed
          reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.checkFilledForm('reservation_form')) {
              const reservationObject = {
                item_id: itemId.value,
                username: reservationUsername.value,
                date_start: reservationDateStart.value,
                date_end: reservationDateEnd.value,
              };
              //* ** call here postData method to post reservation through API ***
              newReservation.postReservation(reservationObject); // Passed the reservation object as a parameter
            } else {
              // please fill all fields message
            }
          });
        }

        dateList.innerHTML = listItem;
        closeButton.addEventListener('click', () => {
          this.clearPopup(this.targetType);
        });
      } else {
        throw new Error('Invalid target type name');
      }
    } else {
      throw new Error('Invalid data type');
    }
  }

  clearPopup() {
    if (this.targetType !== '') {
      mealImage.src = '';
      mealTitle.innerHTML = '';
      mealDescription.innerHTML = '';
      subTitleAction.innerHTML = '';
      dateList.innerHTML = '';
      addActionTitle.innerHTML = '';
      if (this.targetType === 'COMMENT') {
        commentForm[0].reset();
        popupSection.classList.toggle('active');
      } else if (this.targetType === 'RESERVATION') {
        reservationForm[0].reset();
        popupSection.classList.toggle('active');
      } else {
        throw new Error('Invalid target type name');
      }
    }
  }

  /* eslint-disable no-undef */
  /* eslint-disable class-methods-use-this */
  checkFilledForm(formName) {
    const inputs = document.forms[formName].querySelectorAll('.form_field');
    let isFilled = true;
    inputs.forEach(element, () => {
      if (element.value === '') {
        isFilled = false;
      }
    });
    return isFilled;
  }
}