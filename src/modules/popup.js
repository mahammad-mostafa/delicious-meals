import {
    popup_section,
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

    renderPopup(data = {}, targetType) {
        if (data && targetType !== '') {
            popup_section.classList.toggle('active');
            meal_title.src = data.strMealThumb
            meal_description.innerHTML = data.strInstructions

            if (targetType === 'COMMENT' || targetType === 'RESERVATION') {
                sub_title_action.innerHTML = (targetType === 'COMMENT') ? 'Comments' : 'Reservations'
                add_action_title.innerHTML = (targetType === 'COMMENT') ? 'Add Comment' : 'Add Reservation'
                let list_item = '';

                if (targetType === 'COMMENT') {
                    data.comments.forEach(comment => {
                        list_item += `<li>${comment.creation_date} ${comment.username}: ${comment.comment}</li>` 
                    });
                } else {
                    data.reservations.forEach(reservation => {
                        list_item += `<li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>`
                    });
                }

                date_list.innerHTML = list_item;
                close_button.addEventListener('click', () => {
                    clearPopup(targetType);
                })
            }else {
                throw new Error('Invalid target type name')
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
                popup_section.classList.toggle('active');
            } else if (targetType === 'RESERVATION') {
                reservation_form[0].reset();
                popup_section.classList.toggle('active');
            } else {
                throw new Error('Invalid target type name')
            }
        }
    }
}