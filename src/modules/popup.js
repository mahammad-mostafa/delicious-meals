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
    reservation_username,
    reservation_date_start,
    reservation_date_end,
    item_id
} from './dom.js';

class Popup {
    constructor(targetType) {
        this.targetType = targetType;
    }

    renderPopup(data = {}) {
        if (data && this.targetType !== '') {
            popup_section.classList.toggle('active'); //active : when popup is visible
            meal_title.src = data.strMealThumb
            meal_description.innerHTML = data.strInstructions

            if (this.targetType === 'COMMENT' || this.targetType === 'RESERVATION') {
                sub_title_action.innerHTML = (this.targetType === 'COMMENT') ? 'Comments' : 'Reservations'
                add_action_title.innerHTML = (this.targetType === 'COMMENT') ? 'Add Comment' : 'Add Reservation'
                let list_item = '';

                if (this.targetType === 'COMMENT') {
                    data.comments.forEach(comment => {
                        list_item += `<li>${comment.creation_date} ${comment.username}: ${comment.comment}</li>`
                    });
                    comment_form.classList.toggle('visible'); //visible : comment_form is displayed
                    comment_form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        if (this.checkFilledForm('comment_form')) {
                            const comment_object = { item_id: item_id.value, username: comment_username.value, comment: comment_area.value };
                            //*** call here postData method to post comment through API ***
                        } else {
                            //please fill all fields message
                        }
                    })
                } else {
                    data.reservations.forEach(reservation => {
                        list_item += `<li>${reservation.date_start} - ${reservation.date_end} by ${reservation.username}</li>`
                    });
                    reservation_form.classList.toggle('visible'); //visible : reservation_form is displayed
                    reservation_form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        if (this.checkFilledForm('reservation_form')) {
                            const reservation_object = { item_id: item_id.value, username: reservation_username.value, date_start: reservation_date_start.value, date_end: reservation_date_end.value };
                            //*** call here postData method to post reservation through API ***
                        } else {
                            //please fill all fields message
                        }
                    })
                }

                date_list.innerHTML = list_item;
                close_button.addEventListener('click', () => {
                    clearPopup(this.targetType);
                })
            } else {
                throw new Error('Invalid target type name')
            }
        } else {
            throw new Error('Invalid data type')
        }
    }

    clearPopup() {
        if (this.targetType !== '') {
            meal_image.src = '';
            meal_title.innerHTML = '';
            meal_description.innerHTML = '';
            sub_title_action.innerHTML = '';
            date_list.innerHTML = '';
            add_action_title.innerHTML = '';
            if (this.targetType === 'COMMENT') {
                comment_form[0].reset();
                popup_section.classList.toggle('active');
            } else if (this.targetType === 'RESERVATION') {
                reservation_form[0].reset();
                popup_section.classList.toggle('active');
            } else {
                throw new Error('Invalid target type name')
            }
        }
    }

    checkFilledForm(form_name) {
        const inputs = document.forms[form_name].querySelectorAll('.form_field');
        let is_filled = true;
        inputs.forEach(element, () => {
            if (element.value === '') {
                is_filled = false;
            }
        })
        return is_filled;
    }


}