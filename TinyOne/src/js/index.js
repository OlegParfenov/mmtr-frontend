import { element, Field } from './field';
import '../scss/style.scss';
// Кнопка "+" - открывает окно выбора типа поля

element.addButton.addEventListener('click', () => {
    element.modalBackground.style.display = 'block';
    showWindow(element.selectWindow);
});
// Обработчик клика на кнопку с типом поля (select, input, textarea)
element.selectWindowButton.forEach((button) => {
    button.addEventListener('click', () => {
        closeTheWindow(element.selectWindow, () => {
            element.typeField = button.value + '';// Записваем тип поля, которое мы выбрали для создания
            if (element.typeField === 'checkbox') {
                document.querySelector('#minCountInput').style.display = 'none';
                document.querySelector('#maxCountInput').style.display = 'none';
            }
            else {
                document.querySelector('#minCountInput').style.display = 'block';
                document.querySelector('#maxCountInput').style.display = 'block';
            }
            showWindow(element.createWindow);
        });
    });
});
element.createButton.addEventListener('click', () => {
    const name = document.querySelector('#nameInput').value;
    let minCount = document.querySelector('#minCountInput').value;
    let maxCount = document.querySelector('#maxCountInput').value;
    let necessarily = false;
    if (document.querySelector('#selectNecessarily').value == 'necessarily') {
        necessarily = true;
    }
    // Количество символов не может быть отрицательным
    if (minCount <= 0) {
        minCount = '';
    }
    if (maxCount <= 0 || maxCount < minCount) {
        maxCount = '';
    }
    const newField = new Field(element.typeField, name, minCount, maxCount, necessarily);

    // Если создаваемый тип checkbox,то создаётся checkbox
    if (newField.type === 'checkbox') {
        newField.createCheckbox();
    }
    // Иначе текстовый input
    else {
        newField.createTextInput();
    }
    console.log('Field');
    newField.addNecessarilyLabel();
    // Добавление события для валидации min  количества символов
    minCountUpdateEvent();
    closeModal();
    closeTheWindow(element.createWindow);
    nameInput.value = '';
    minCountInput.value = '';
    maxCountInput.value = '';
});
// Закрытие окна по нажатию на крест
element.windowCross.forEach((cross) => {
    cross.addEventListener('click', () => {
        // lastButton = '';
        closeModal();
        // Закрывает окно, в котором находится крест
        closeTheWindow(cross.parentNode.parentNode);
    });
});
element.sendFieldsButton.addEventListener('click', () => {
    if (validationCheck()) {
        element.modalBackground.style.display = 'block';
        showWindow(element.validWindow);
    }
});
element.validBtn.addEventListener('click', () => {
    closeModal();
    closeTheWindow(element.validWindow);
});
// Делегирование событий для удаления полей на форме
element.contactsForm.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('page__field')) {
        element.pressedField = e.target;
    }
    if (e.target.parentNode.classList.contains('contacts-form__checkbox')) {
        element.pressedField = e.target.parentNode;
    }
    showMenu(e.clientX, e.clientY, Field);
});
// Клик на меню удаления поля
element.menu.addEventListener('click', (e) => {
    e.preventDefault();
    hideMenu();
    deleteField();
    hideSendBtn();
});
//Скрыть меню удаления при клике на окно
window.addEventListener('click', (event) => {
    if (!event.target.classList.contains('page__field')) {
        hideMenu();
    }
});
function closeTheWindow(window, callback = () => { }) {
    window.classList.add('popup-window__animation_to-right');
    setTimeout(() => {
        callback();
        window.style.display = 'none';
        window.classList.remove('popup-window__animation_from-left');
    }, 300);
}
function showWindow(window) {
    element.selectWindow.style.display = 'none';
    element.validWindow.style.display = 'none';
    element.createWindow.style.display = 'none';
    window.style.display = 'block';

    window.classList.remove('popup-window__animation_to-right');
    window.classList.add('popup-window__animation_from-left');
}
function closeModal(time = 300) {
    setTimeout(() => {
        element.modalBackground.style.display = 'none';
    }, time);
}

function minCountUpdateEvent() {
    const fields = document.querySelectorAll('.page__text-input');
    fields.forEach((e) => {
        e.oninput = () => {
            if (e.value.length < e.minLength && e.value.length != 0) {
                e.classList.add('page__field_backlight_red');
                // Если у поля уже есть предупреждение о кол-ве символов, то его выводить не нужно
                if (!e.parentNode.querySelector('.contacts-form__characters-warning-label')) {
                    e.insertAdjacentHTML('beforebegin',
                        `<p class="contacts-form__characters-warning-label page__warn-label">
                                     Минимальное количество символов: ${e.minLength}
                                     </p>`);
                }
            }
            else {
                e.classList.remove('page__field_backlight_red');
                const label = e.parentNode.querySelector('.contacts-form__characters-warning-label');
                if (label) {
                    label.remove();
                }
            }
        };
    });
}
function validationCheck() {
    const fields = document.querySelectorAll('.page__field');
    let check = true;
    fields.forEach((e) => {
        if (!necessarilyCheck(e)) {
            check = false;
            backlight(e);
        }
    });
    return check
}
function necessarilyCheck(field) {
    let result = true;
    switch (field.type) {
        case 'checkbox':
            if (field.classList.contains('necessarily') && !field.checked) {
                result = !result;
            }
            break;
        default:
            if ((field.classList.contains('necessarily') && !field.value)
                || (field.value.length < field.minLength)) {
                result = !result;
            }
            break;
    }
    return result;
}
function backlight(field) {
    if (field.type != 'checkbox') {
        field.classList.add('page__field_backlight_red');
    }
    else {
        field.parentNode.classList.add('contacts-form__checkbox_backlight');
    }
}
function deleteField(callback = () => { }) {
    const parentField = element.pressedField.parentNode;
    parentField.parentNode.removeChild(parentField);
    setTimeout(() => {
        callback();
    }, 200);
}

function showMenu(x, y) {
    element.menu.style.left = x + pageXOffset + 'px';
    element.menu.style.top = y + pageYOffset + 'px';
    element.menu.classList.add('menu_show');
}
function hideMenu() {
    element.menu.classList.remove('menu_show');
}

function hideSendBtn() {
    if (!element.contactsForm.querySelectorAll('.contacts-form__field')[0]) {
        element.sendFieldsButton.style.display = 'none';
    }
}
function showSendBtn() {
    element.sendFieldsButton.style.display = 'block';
}
export { showSendBtn }
