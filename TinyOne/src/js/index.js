import { Field } from './field';
import getElements from './element'
import '../scss/style.scss';

let element;
let promise = getElements(document);
promise
    .then(
        result => {
            element = result;
            start();
        },
        error => {
            console.log(error);
        }
    );
function start() {
    // Кнопка "+" - открывает окно выбора типа поля
    element.addButton.addEventListener('click', () => {
        showModalBackground();
        showPopUp(element.selectWindow);
    });
    // Обработчик клика на кнопку с типом поля (select, input, textarea)
    element.selectWindowButton.forEach((button) => {
        button.addEventListener('click', () => {
            hidePopUp(element.selectWindow, () => {
                element.typeField = button.value + '';// Записваем тип поля, которое мы выбрали для создания
                if (element.typeField === 'checkbox') {
                    document.querySelector('#minCountInput').style.display = 'none';
                    document.querySelector('#maxCountInput').style.display = 'none';
                }
                else {
                    document.querySelector('#minCountInput').style.display = 'block';
                    document.querySelector('#maxCountInput').style.display = 'block';
                }
                showPopUp(element.createWindow);
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
        newField.addNecessarilyLabel();
        // Добавление события для валидации min  количества символов
        minCountUpdateEvent();
        hideModalBackground();
        hidePopUp(element.createWindow);
        nameInput.value = '';
        minCountInput.value = '';
        maxCountInput.value = '';
    });
    // Закрытие окна по нажатию на крест
    element.windowCross.forEach((cross) => {
        cross.addEventListener('click', () => {
            hideModalBackground();
            // Закрывает окно, в котором находится крест
            hidePopUp(cross.parentNode.parentNode);
        });
    });
    element.sendFieldsButton.addEventListener('click', () => {
        if (validationCheck()) {
            showModalBackground();
            showPopUp(element.validWindow);
        }
    });
    element.validBtn.addEventListener('click', () => {
        hideModalBackground();
        hidePopUp(element.validWindow);
    });
    // Делегирование событий для удаления полей на форме
    element.contactsForm.addEventListener('contextmenu', (contactsForm) => {
        contactsForm.preventDefault();
        if (contactsForm.target.classList.contains('page__field')) {
            element.pressedField = contactsForm.target;
        }
        if (contactsForm.target.parentNode.classList.contains('contacts-form__checkbox')) {
            element.pressedField = contactsForm.target.parentNode;
        }
        showMenu(contactsForm.clientX, contactsForm.clientY, Field);
    });
    // Клик на меню удаления поля
    element.menu.addEventListener('click', (menu) => {
        menu.preventDefault();
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
    function hidePopUp(popUp, callback = () => { }) {
        popUp.classList.add('popup-window__animation_to-right');
        setTimeout(() => {
            callback();
            popUp.style.display = 'none';
            popUp.classList.remove('popup-window__animation_from-left');

        }, 300);
    }
    function showPopUp(popUp) {
        element.selectWindow.style.display = 'none';
        element.validWindow.style.display = 'none';
        element.createWindow.style.display = 'none';
        popUp.style.display = 'block';

        popUp.classList.remove('popup-window__animation_to-right');
        popUp.classList.add('popup-window__animation_from-left');
    }
    function hideModalBackground(time = 300) {
        setTimeout(() => {
            element.modalBackground.style.display = 'none';
        }, time);
    }
    function showModalBackground() {
        element.modalBackground.style.display = 'block';
    }
    function minCountUpdateEvent() {
        const fields = document.querySelectorAll('.page__text-input');
        fields.forEach((field) => {
            field.oninput = () => {
                if (field.value.length < field.minLength && field.value.length != 0) {
                    field.classList.add('page__field_highlighting_red');
                    // Если у поля уже есть предупреждение о кол-ве символов, то его выводить не нужно
                    if (!field.parentNode.querySelector('.contacts-form__characters-warning-label')) {
                        field.insertAdjacentHTML('beforebegin',
                            `<p class="contacts-form__characters-warning-label page__warn-label">
                                         Минимальное количество символов: ${field.minLength}
                                         </p>`);
                    }
                }
                else {
                    field.classList.remove('page__field_highlighting_red');
                    const label = field.parentNode.querySelector('.contacts-form__characters-warning-label');
                    if (label) {
                        label.remove();
                    }
                }
            };
        });
    }
    function validationCheck() {
        const fields = document.querySelectorAll('.page__field');
        const result = [].filter.call(fields, field => !necessarilyCheck(field));
        return !result[0] ?  true : false;
    }
    function necessarilyCheck(field) {
        let result = true;
        if (field.type == 'checkbox') {
            if (field.classList.contains('necessarily') && !field.checked) {
                result = !result;
                highlighting(field);
            }
        }
        else if ((field.classList.contains('necessarily') && !field.value)
            || (field.value.length < field.minLength)) {
            result = !result;
            highlighting(field);
        }
        return result;
    }
    function highlighting(field) {
        if (field.type != 'checkbox') {
            field.classList.add('page__field_highlighting_red');
        }
        else {
            field.parentNode.classList.add('contacts-form__checkbox_highlighting');
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
}
