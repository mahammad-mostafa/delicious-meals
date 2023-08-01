import {
    close_button,
    meal_image,
    meal_title,
    meal_description,
    sub_title_action,
    date_list,
    add_action_title,
    comment_form,
    reservation_form,
    comment_username,
    comment_area,
    submit_comment_btn,
    reservation_username,
    reservation_date_start,
    reservation_date_end,
    submit_reservation_btn
} from './dom.js';

class Popup {
    targetType;
    constructor() {
        this.targetType = targetType;
    }

    renderPopup(data = {}, targetType, domElement) {
        if (data && targetType !== '' && domElement instanceof Element) {
            if (targetType === 'COMMENT') {
                clearPopup(targetType); //call this on close

            } else if (targetType === 'RESERVATION') {
                clearPopup(targetType); //call this on close
            } else {

            }
        } else {
            throw new Error('Invalid data type')
        }
    }

    clearPopup(targetType) {
        if (targetType !== '') {
            meal_image.src = '';
            meal_title.innerHTML = '';
            meal_description.innerHTML = '';
            sub_title_action.innerHTML = '';
            date_list.innerHTML = '';
            add_action_title.innerHTML = '';
            if(targetType === 'COMMENT') {
                comment_form[0].reset();
            } else if (targetType === 'RESERVATION') {
                reservation_form[0].reset();
            } else {
                throw new Error('Invalid target type name')
            }
        }
    }
}