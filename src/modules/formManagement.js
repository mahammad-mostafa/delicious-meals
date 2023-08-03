import Dom from './dom.js';

export default class {
  constructor() {
    this.dom = new Dom();
  }

  clearFormFields = (targetType) => {
    if (targetType !== '') {
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
  checkFilledForm = (formName) => {
    const inputs = document.forms[formName].querySelectorAll('.form-field');
    let isFilled = true;
    inputs.forEach(element, () => {
      if (element.value === '') {
        isFilled = false;
      }
    });
    return isFilled;
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
}