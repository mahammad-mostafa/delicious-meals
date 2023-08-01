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
    reservation_date_end
} from './dom.js';

class Popup {
    targetType;
    constructor() {
        this.targetType = targetType;
    }

    renderPopup(data = {}, targetType, domElement) {
        if (data && targetType !== '' && domElement instanceof Element) {
            
        } else {
            throw new Error('Invalid data type')
        }
    }
}