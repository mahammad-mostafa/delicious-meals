import Dom from './dom.js';

/* eslint-disable no-unused-vars */
class Popup {
  constructor(targetType, data) {
    this.dom = new Dom();
  }

  renderDetails(data) {
    this.dom.popupImage.src = data.itemDetails.strMealThumb;
    this.dom.popupTitle.textContent = data.itemDetails.strMeal;
    this.dom.popupDescription.textContent = data.itemDetails.strInstructions;
    this.dom.popupListTitle.textContent = (data.targetType === 'COMMENT') ? 'Comments' : 'Reservations';
    this.dom.popupFormTitle.textContent = (data.targetType === 'COMMENT') ? 'Add Comment' : 'Add Reservation';
  }

  renderInvolvement(data) {
    let listItem = '';
    this.renderDetails(data);
    this.dom.popupList.textContent = ''; // clear all content before rendering
    if (data.targetType === 'COMMENT') {
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

  renderPopup(data) {
    if (data) {
      this.dom.popup.classList.toggle('active'); // active : when popup is visible
      if (data.targetType === 'COMMENT' || data.targetType === 'RESERVATION') {
        this.renderInvolvement(data);
        this.manageFormVisibility(data.targetType);
        if (data.targetType === 'COMMENT') {
          this.dom.popupFormComment.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.checkFilledForm('popup-form-comment')) {
              const commentObject = {
                item_id: data.itemDetails.item_id,
                username: this.dom.popupFormComment.elements.username.value,
                comment: this.dom.popupFormComment.elements.comment.value,
                //* ** call here postData method to post comment through API ***
              };
            } else {
              // please fill all fields message
            }
          });
        } else {
          this.dom.popupFormReservation.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.checkFilledForm('popup-form-reservation')) {
              const reservationObject = {
                item_id: data.itemDetails.item_id,
                username: this.dom.popupFormReservation.elements.username.value,
                date_start: this.dom.popupFormReservation.elements.date_start.value,
                date_end: this.dom.popupFormReservation.elements.date_end.value,
              };
              //* ** call here postData method to post reservation through API ***
            } else {
              // please fill all fields message
            }
          });
        }
        this.dom.popupClose.addEventListener('click', () => {
          this.clearPopup(data.targetType);
        });
      } else {
        throw new Error('Invalid target type name');
      }
    } else {
      throw new Error('Invalid data type');
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
      this.dom.popup.classList.toggle('active');

      if (targetType === 'COMMENT') {
        this.dom.popupFormComment[0].reset();
      } else if (targetType === 'RESERVATION') {
        this.dom.popupFormReservation[0].reset();
      } else {
        throw new Error('Invalid target type name');
      }
    }
  }

  /* eslint-disable no-undef */
  /* eslint-disable class-methods-use-this */
  checkFilledForm(formName) {
    const inputs = document.forms[formName].querySelectorAll('.form-field');
    let isFilled = true;
    inputs.forEach(element, () => {
      if (element.value === '') {
        isFilled = false;
      }
    });
    return isFilled;
  }
}