(function () {
    document.addEventListener('DOMContentLoaded', function () {
        let
            addButton = document.querySelector('.contacts-form__button_add'), //Открытие окна выбора поля
            selectWindow = document.querySelector('.select-field-window'), //Окно выбора типа создаваемого поля
            windowCross = document.querySelectorAll('.popup-window__cross'), //Крест - закрытие окна
            selectWindowButton = document.querySelectorAll('.popup-window__button'),//Кнопка - выбор поля
            createWindow = document.querySelector('.create-field-window'),//Окно создания поля
            createButton = document.querySelector('#createButton'),//Кнопка создания поля
            modalBackground = document.querySelector('.modal'),
            typeField = '',//Тип поля, который выбрал пользователь для создания
            sendFieldsButton = document.querySelector('.contacts-form__button_send'),//Кнопка, отправляющая поля
            fieldsList = [];//Массив с объектами-полями

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

            fieldsList.push(newField);//Добавление объекта в массив с объектами
            newField.create();

            // Добавление события для валидации min  количества символов
            minCountUpdateEvent();
            closeModal(300);
            closeTheWindow(createWindow);

        });

        //Закрытие окна по нажатию на крест
        windowCross.forEach((cross) => {
            cross.addEventListener('click', () => {
                lastButton = '';
                closeModal(300);
                closeTheWindow(cross.parentNode.parentNode); //Закрывает окно, в котором находится крест   

            })
        })

        sendFieldsButton.addEventListener('click', () => {
            if (validationCheck()) alert('Ок')
            else alert('Не ок')
        })

        function closeTheWindow(window, callback) {
            window.classList.add('display_none');
            setTimeout(() => {
                window.classList.remove('display_block');
                callback();
            }, 350)

        }
        function showTheWindow(window) {
            window.classList.remove('display_none');
            window.classList.add('display_block');
        }
        function closeModal(time) {
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
                        e.style.background = 'rgba(255, 86, 86, 0.651)';
                        //Если у поля уже есть предупреждение о кол-ве символов, то его выводить не нужно
                        if (!e.parentNode.querySelector('.contacts-form__characters-warning-label')) {
                            e.insertAdjacentHTML('beforebegin',
                                `<p class="contacts-form__characters-warning-label page__warn-label">
                             Минимальное количество символов: ${e.minLength}
                             </p>`);
                        }
                    }
                    else {
                        e.style.background = '#ffffff';
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

        function setDeleteEvent(field) {
            field.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                var coords = getCoords(field);
                
                showMenu(coords.left, coords.top, coords.width, coords.height)

                // var parentField = field.parentNode;
                // parentField.parentNode.removeChild(parentField);

            })
        }
        function getCoords(elem) { // кроме IE8-
            var box = elem.getBoundingClientRect();
            return {
              top: box.top + pageYOffset,
              left: box.left + pageXOffset,
              width: box.width,
              height: box.height
            };
          }
          function showMenu(x, y, elemWidth, elemHeight) {
            var menu = document.querySelector('.menu');
            menu.style.left = x + elemWidth + 'px';
            menu.style.top = y + elemHeight + 'px';
            menu.classList.add('show-menu');
        }
    }, false);
}());






function hideMenu() {
    menu.classList.remove('show-menu');
}