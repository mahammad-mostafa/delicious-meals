import Dom from './dom.js';

/* eslint-disable no-unused-vars */
class Popup {
  constructor(targetType, data) {
    this.dom = new Dom();
    this.renderPopup(data, targetType);
  }

  renderPopup(data = {}, targetType) {
    if (data && targetType !== '') {
      this.dom.popup.classList.toggle('active'); // active : when popup is visible
      this.dom.popupImage.src = data.itemDetails.strMealThumb;
      this.dom.popupTitle.textContent = data.itemDetails.strMeal;
      this.dom.popupDescription.textContent = data.itemDetails.strInstructions;
    
      if (targetType === 'COMMENT' || targetType === 'RESERVATION') {
        this.dom.popupListTitle.textContent = (targetType === 'COMMENT') ? 'Comments' : 'Reservations';
        this.dom.popupFormTitle.textContent = (targetType === 'COMMENT') ? 'Add Comment' : 'Add Reservation';
        let listItem = '';

        if (targetType === 'COMMENT') {
          data.involvementList.forEach((comment) => {
            listItem += `<li>${comment.creation_date} ${comment.username}: ${comment.comment}</li>`;
          });
          this.dom.popupFormComment.classList.toggle('visible'); // visible : popup-form-comment is displayed
          this.dom.popupFormComment.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.checkFilledForm('popup-form-comment')) {
              const commentObject = {
                item_id: data.itemDetails.item_id,
                username: this.dom.popupFormComment.elements['username'].value,
                comment: this.dom.popupFormComment.elements['comment'].value,
              };
              //* ** call here postData method to post comment through API ***
            } else {
              // please fill all fields message
            }
          });
        } else {
          data.involvementList.forEach((reservation) => {
            listItem += `<li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>`;
          });
          this.dom.popupFormReservation.classList.toggle('visible'); // visible : reservation_form is displayed
          this.dom.popupFormReservation.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.checkFilledForm('popup-form-reservation')) {
              const reservationObject = {
                item_id: data.itemDetails.item_id,
                username: this.dom.popupFormReservation.elements['username'].value,
                date_start: this.dom.popupFormReservation.elements['date_start'].value,
                date_end: this.dom.popupFormReservation.elements['date_end'].value,
              };
              //* ** call here postData method to post reservation through API ***
            } else {
              // please fill all fields message
            }
          });
        }

        this.dom.popupList.textContent = listItem;
        this.dom.popupClose.addEventListener('click', () => {
          this.clearPopup(targetType);
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
    
      if (targetType === 'COMMENT') {
        this.dom.popupFormComment[0].reset();
        this.dom.popup.classList.toggle('active');
      } else if (targetType === 'RESERVATION') {
        this.dom.popupFormReservation[0].reset();
        this.dom.popup.classList.toggle('active');
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