(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let
            addButton = document.querySelector('.contacts-form__button_add'), //Открытие окна выбора поля
            selectWindow = document.querySelector('.select-field-window'), //Окно выбора типа создаваемого поля
            windowCross = document.querySelectorAll('.popup-window__cross'), //Крест - закрытие окна
            selectWindowButton = document.querySelectorAll('.popup-window__button'),//Кнопка - выбор поля
            createWindow = document.querySelector('.create-field-window'),//Окно создания поля
            validWindow = document.querySelector('.success-validation-window'),//Окно успешной валидации
            createButton = document.querySelector('#createButton'),//Кнопка создания поля
            validBtn = document.querySelector('#validBtn'),
            modalBackground = document.querySelector('.modal'),
            typeField = '',//Тип поля, который выбрал пользователь для создания
            sendFieldsButton = document.querySelector('.contacts-form__button_send'),//Кнопка, отправляющая 
            contactsForm = document.querySelector('.contacts-form'),//Форма содержащая контакты и поля для заполнения
            menu = document.querySelector('.menu'),//Контекстное меню
            pressedField;//Поле, для которого вызвали контекстное меню

        //Конструктор поля
        function field(type, name, min, max, necessarily) {
            this.uuid = uuidv4(); //Генерация идентификатора
            this.type = type;
            this.name = name;
            this.min = min;
            this.max = max;
            this.necessarily = necessarily;
        }
        //Функция создания поля
        field.prototype.create = function () {
            //Создание контейнера для поля
            fieldContainer = document.createElement('div');
            fieldContainer.classList.add('contacts-form__field')
            //Если создаваемый тип checkbox,то создаётся checkbox
            if (typeField === 'checkbox') {
                divContainer = document.createElement('div');//Создание контейнера для checkbox
                divContainer.classList.add('contacts-form__checkbox');
                newField = document.createElement('input');
                newField.type = 'checkbox';//Создание checkbox


                fieldContainer.appendChild(divContainer);
                sendFieldsButton.before(fieldContainer);
                //Добавление поля до кнопки "send"
                divContainer.appendChild(newField);
                newField.insertAdjacentHTML('afterend', `<label for="${this.uuid}">${this.name}</label>`);

                setDeleteEvent(newField.parentNode);//Добавление обработчика удаления
            }
            //Иначе создаётся текстовое поле
            else {
                newField = document.createElement(`${typeField}`);
                newField.classList.add('page__text-input');
                newField.placeholder = `${this.name}`;

                //Проверки установления минимального и максимального количества символов в полях
                //Если передали пустые значения, значит ставить min и max количество символов не нужно
                if (!this.min == '') newField.minLength = `${this.min}`;
                if (!this.max == '') newField.maxLength = `${this.max}`;

                fieldContainer.appendChild(newField);
                sendFieldsButton.before(fieldContainer)//Добавление поля до кнопки "send"
                setDeleteEvent(newField); //Добавление обработчика удаления
            }
            if (typeField === 'input') {
                newField.classList.add('contacts-form__text-input');
            }
            if (typeField === 'textarea') {
                newField.classList.add('contacts-form__textarea');
            }
            //Вывод предупреждения о том, что поле является обязательным для заполнения
            if (this.necessarily) {
                newField.classList.add('necessarily');
                newField.insertAdjacentHTML('beforebegin',
                    `<p class="contacts-form__required-field-label page__warn-label">Обязательное поле *
                 </p>`);
            }
            newField.classList.add('page__field');
            newField.id = this.uuid; //Добавляем идентификатор полю
            // sendBtnShow();
            sendFieldsButton.style.display = 'block';
        }

        //Кнопка "+" - открывает окно выбора типа поля
        addButton.addEventListener('click', () => {
            modalBackground.style.display = 'block';

            showTheWindow(selectWindow);
        })

        //Обработчик клика на кнопку с типом поля (select, input, textarea)
        selectWindowButton.forEach((button) => {
            button.addEventListener('click', () => {
                closeTheWindow(selectWindow, () => {
                    typeField = button.value + '';//Записваем тип поля, которое мы выбрали для создания
                    if (typeField === 'checkbox') {
                        document.querySelector('#minCountInput').style.display = 'none';
                        document.querySelector('#maxCountInput').style.display = 'none';
                    }
                    else {
                        document.querySelector('#minCountInput').style.display = 'block';
                        document.querySelector('#maxCountInput').style.display = 'block';
                    }

                    showTheWindow(createWindow);
                });
            })
        })

        createButton.addEventListener('click', () => {
            var name = document.querySelector('#nameInput').value;
            var minCount = document.querySelector('#minCountInput').value;
            var maxCount = document.querySelector('#maxCountInput').value;
            var necessarily = false;
            if (document.querySelector('#selectNecessarily').value == 'necessarily') {
                necessarily = true;
            }
            //Количество символов не может быть отрицательным
            if (minCount <= 0) minCount = '';
            if (maxCount <= 0) maxCount = '';

            let newField = new field(typeField, name, minCount, maxCount, necessarily);
            newField.create();

            // Добавление события для валидации min  количества символов
            minCountUpdateEvent();
            closeModal();

            closeTheWindow(createWindow);
        });

        //Закрытие окна по нажатию на крест
        windowCross.forEach((cross) => {
            cross.addEventListener('click', () => {
                lastButton = '';
                closeModal();
                closeTheWindow(cross.parentNode.parentNode); //Закрывает окно, в котором находится крест
            })
        })

        sendFieldsButton.addEventListener('click', () => {
            if (validationCheck()) {
                modalBackground.style.display = 'block';
                showTheWindow(validWindow);
                // alert('OK');
            }
            else alert('Не ок')
        })

        validBtn.addEventListener('click', () => {
            closeModal();
            closeTheWindow(validWindow);
        })

        function closeTheWindow(window, callback) {
            window.classList.add('display_none');
            setTimeout(() => {
                callback();
                window.style.display = 'none';
                window.classList.remove('display_block');
            }, 300)
        }

        function showTheWindow(window) {
            selectWindow.style.display = 'none';
            validWindow.style.display = 'none';
            createWindow.style.display = 'none';
            window.style.display = 'block';

            window.classList.remove('display_none');
            window.classList.add('display_block');
        }

        function closeModal(time = 300) {
            setTimeout(() => {
                modalBackground.style.display = 'none';
            }, time)
        }

        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        function minCountUpdateEvent() {
            var fields = document.querySelectorAll('.page__text-input')
            fields.forEach((e) => {
                e.addEventListener('input', () => {
                    if (e.value.length < e.minLength && e.value.length != 0) {
                        e.classList.add('page__field_backlight_red');
                        //Если у поля уже есть предупреждение о кол-ве символов, то его выводить не нужно
                        if (!e.parentNode.querySelector('.contacts-form__characters-warning-label')) {
                            e.insertAdjacentHTML('beforebegin',
                                `<p class="contacts-form__characters-warning-label page__warn-label">
                             Минимальное количество символов: ${e.minLength}
                             </p>`);
                        }
                    }
                    else {
                        e.classList.remove('page__field_backlight_red');
                        e.parentNode.querySelector('.contacts-form__characters-warning-label').remove();
                    }
                })
            })
        }

        function validationCheck() {
            var fields = document.querySelectorAll('.page__field');
            var check = true;
            fields.forEach((e) => {
                if (!necessarilyCheck(e)) {
                    check = false;
                    backlight(e);

                }
            })
            if (check) return true
            else return false
        }

        function necessarilyCheck(field) {
            switch (field.type) {
                case 'checkbox':
                    if (field.classList.contains('necessarily') && !field.checked) {
                        return false
                    }
                    break;
                default:
                    if (field.classList.contains('necessarily') && (field.value.length < field.minLength || !field.value)) {
                        return false
                    }
                    break;
            }
            return true
        }

        function backlight(field) {
            if (field.type != 'checkbox') field.classList.add('page__field_backlight_red');
            else{
                field.parentNode.classList.add('contacts-form__checkbox_backlight');
            }
            
            // else{
            // }

        }

        function setDeleteEvent(field) {
            field.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                pressedField = field;
                showMenu(e.clientX, e.clientY, field);

                //Событие удаления поля по нажатию кнопки меню
                menu.addEventListener('click', (e) => {
                    e.preventDefault();
                    hideMenu();
                    deleteField(() => {
                        sendBtnHide();
                    })
                })
            })
        }

        function deleteField(callback) {
            var parentField = pressedField.parentNode;
            parentField.parentNode.removeChild(parentField);
            setTimeout(() => {
                callback();
            }, 200)

        }

        window.addEventListener('click', (event) => {
            if (!event.target.classList.contains('page__field')) {
                hideMenu();
            }
        })

        function showMenu(x, y) {
            menu.style.left = x + pageXOffset + 'px';
            menu.style.top = y + pageYOffset + 'px';
            menu.classList.add('show-menu');
        }

        function hideMenu() {
            menu.classList.remove('show-menu');
        }

        // function sendBtnShow() {
        //     if (contactsForm.querySelectorAll('.contacts-form__field')) sendFieldsButton.style.display = 'block';
        // }
        function sendBtnHide() {
            if (!contactsForm.querySelectorAll('.contacts-form__field')) sendFieldsButton.style.display = 'none';
        }
    }, false);
}());






