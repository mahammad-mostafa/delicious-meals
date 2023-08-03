import Dom from './dom.js';

export default class {
  constructor() {
    this.dom = new Dom();
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
}