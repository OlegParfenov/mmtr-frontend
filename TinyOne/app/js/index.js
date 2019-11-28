(function() {
    document.addEventListener('DOMContentLoaded', function() {
        let 
        addButton = document.querySelector('.contacts-form__button_add'), //Открытие окна выбора поля
        selectWindow = document.querySelector('.select-field-window'), //Окно выбора типа создаваемого поля
        windowCross = document.querySelectorAll('.popup-window__cross'), //Крест - закрытие окна
        selectWindowButton = document.querySelectorAll('.popup-window__button'),//Кнопка - выбор поля
        createWindow = document.querySelector('.create-field-window'),//Окно создания поля
        createButton = document.querySelector('#createButton'),//Кнопка создания поля
        contactsForm = document.querySelector('.contacts-form'), // Форма, в которую добавляются поля
        typeField = '',//Тип поля, который выбрал пользователь для создания
        sendFieldsButton = document.querySelector('.contacts-form__button_send'),//Кнопка, отправляющая поля
        fieldsList = [];
        //Конструктор поля
        function field(type, name, min, max, necessarily){
            this.uuid = uuidv4(); //Генерация идентификатора
            this.type = type;
            this.name = name;
            this.min = min;
            this.max = max;
            this.necessarily = necessarily;
        }
        //Функция создания поля
        field.prototype.create = function(){
            //Создание контейнера для поля
            fieldContainer = document.createElement('div');
            fieldContainer.classList.add('contacts-form__field')

            if (typeField === 'checkbox'){
                divContainer = document.createElement('div');//Создание контейнера для checkbox
                divContainer.classList.add('checkbox');
                newField = document.createElement('input');
                newField.type = 'checkbox';//Создание checkbox

                // contactsForm.appendChild(divContainer);
                fieldContainer.appendChild(divContainer);
                sendFieldsButton.before(fieldContainer);//Добавление поля до кнопки "send"
                
                divContainer.appendChild(newField);
                newField.insertAdjacentHTML('afterend', `<label for="${this.uuid}">${this.name}</label>`);
            }
            else{
                newField = document.createElement(`${typeField}`);
                newField.classList.add('page__text-input');
                newField.placeholder = `${this.name}`;

                //Проверки установления минимального и максимального количества символов в полях
                //Если передали пустые значения, значит ставить min и max количество символов не нужно
                if (!this.min == '') newField.minLength = `${this.min}`;
                if (!this.max == '' ) newField.maxLength = `${this.max}`;

                // contactsForm.appendChild(newField);
                fieldContainer.appendChild(newField);
                sendFieldsButton.before(fieldContainer)//Добавление поля до кнопки "send"
            }
            if (typeField === 'input'){
                newField.classList.add('contacts-form__text-input');
            }
            if (typeField === 'textarea'){
                newField.classList.add('contacts-form__textarea');
            }

            if (this.necessarily) {
                newField.insertAdjacentHTML('beforebegin',
                 `<p class="contacts-form__required-field-label page__warn-label">Обязательное поле *
                 </p>`);
            }
            newField.id = this.uuid; //Добавляем идентификатор полю
            sendFieldsButton.style.display = 'block';

        }

        //Кнопка "+" - открывает окно выбора типа поля
        addButton.addEventListener('click', ()=>{
            showTheWindow(selectWindow);
        })

        //Обработчик клика на кнопку с типом поля (select, input, textarea)
        selectWindowButton.forEach((button) => {
            button.addEventListener('click', ()=>{
                closeTheWindow(selectWindow, ()=>{
                    typeField = button.value;//Записваем тип поля, которое мы выбрали для создания
                    if (typeField === 'checkbox'){
                        document.querySelector('#minCountInput').style.display = 'none';
                        document.querySelector('#maxCountInput').style.display = 'none';
                    } 
                    else{
                        document.querySelector('#minCountInput').style.display = 'block';
                        document.querySelector('#maxCountInput').style.display = 'block';  
                    }
                    showTheWindow(createWindow);     
                });
                
            })
        })
        
        createButton.addEventListener('click', ()=>{
            var name = document.querySelector('#nameInput').value;
            var minCount = document.querySelector('#minCountInput').value;
            var maxCount = document.querySelector('#maxCountInput').value;
            var necessarily = false;
            if (document.querySelector('#selectNecessarily').value == 'necessarily'){
                necessarily = true;
            }

            //Количество символов не может быть отрицательным
            if (minCount <= 0 ) minCount = '';
            if (maxCount <= 0 ) maxCount = '';

            let newField = new field(typeField, name, minCount, maxCount, necessarily);

            fieldsList.push(newField);//Добавление объекта в массив с объектами
            newField.create();
            
             // Добавление события для валидации min  количества символов
             minCountUpdateEvent();
             
            closeTheWindow(createWindow);
        });
        

        //Закрытие окна по нажатию на крест
        windowCross.forEach((cross) =>{
            cross.addEventListener('click', ()=>{
                lastButton = '';
                closeTheWindow(cross.parentNode.parentNode); //Закрывает окно, в котором находится крест
            })
        })

        function closeTheWindow(window, callback){
            window.classList.add('display_none');
            setTimeout(()=>{
                window.classList.remove('display_block');
                callback();
            }, 350)
        }
        function showTheWindow(window){
            window.classList.remove('display_none');
            window.classList.add('display_block');
        }
        function uuidv4() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
              return v.toString(16);
            });
          }

          function minCountUpdateEvent(){
            var fields = document.querySelectorAll('.page__text-input')
            fields.forEach((e)=>{
                e.addEventListener('input', ()=>{
                    if (e.value.length < e.minLength && e.value.length != 0){
                        e.style.background = '#df4242';
                        //Если у поля уже есть предупреждение о кол-ве символов, то его выводить не нужно
                        if(!e.parentNode.querySelector('.contacts-form__characters-warning-label')){
                            e.insertAdjacentHTML('beforebegin',
                            `<p class="contacts-form__characters-warning-label page__warn-label">
                             Минимальное количество символов: ${e.minLength}
                             </p>`);
                        }
                        
                    }
                    else{
                        e.style.background = '#ffffff';
                        e.parentNode.querySelector('.contacts-form__characters-warning-label').remove();
                        // parentContainer = e.parentNode;
                        // parentContainer.querySelector('.contacts-form__required-field-label')
                        // .classList.remove('contacts-form__required-field-label');
                    }
                })
            })
          }
        //Закрытие по клику на окно
        // window.onclick = function (e) {
        //     if (e.target == selectWindow){
        //         // selectWindow.classList.remove('display_block');
        //         selectWindow.classList.add('display_none');
        //         this.setTimeout(()=>{
        //             selectWindow.classList.remove('display_block');
        //         }, 550)
                
        //     }
        // }
     }, false);
}());
