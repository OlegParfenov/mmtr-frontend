import { showSendBtn } from './index';
let element = {
  addButton: document.querySelector('.contacts-form__button_add'), // Открытие окна выбора поля
  selectWindow: document.querySelector('.select-field-window'), // Окно выбора типа создаваемого поля
  windowCross: document.querySelectorAll('.popup-window__cross'), // Крест - закрытие окна
  selectWindowButton: document.querySelectorAll('.popup-window__button'), // Кнопка - выбор поля
  createWindow: document.querySelector('.create-field-window'), // Окно создания поля
  validWindow: document.querySelector('.success-validation-window'), // Окно успешной валидации
  createButton: document.querySelector('#createButton'), // Кнопка создания поля
  validBtn: document.querySelector('#validBtn'),//Кнопка для валидации полей
  modalBackground: document.querySelector('.modal'),//Затемнение для модального окна
  sendFieldsButton: document.querySelector('.contacts-form__button_send'), // Кнопка, отправляющая
  contactsForm: document.querySelector('.contacts-form'), // Форма содержащая контакты и поля для заполнения
  menu: document.querySelector('.menu'), // Контекстное меню
  typeField: '', // Тип поля, который выбрал пользователь для создания
  pressedField: '',// Поле, для которого вызвали контекстное меню
  newField: '',
}

// Конструктор поля
function Field(type, name, min, max, necessarily) {
  this.uuid = uuidv4(); // Генерация идентификатора
  this.type = type;
  this.name = name;
  this.min = min;
  this.max = max;
  this.necessarily = necessarily;

}
// Функция создания поля
Field.prototype.createCheckbox = function () {
  // Создание контейнера для поля
  const fieldContainer = createFieldContainer();

  const divContainer = document.createElement('div');// Создание контейнера для checkbox
  divContainer.classList.add('contacts-form__checkbox');
  element.newField = document.createElement('input');
  element.newField.type = 'checkbox';// Создание checkbox


  fieldContainer.appendChild(divContainer);
  element.sendFieldsButton.before(fieldContainer);
  // Добавление поля до кнопки "send"
  divContainer.appendChild(element.newField);
  element.newField.insertAdjacentHTML('afterend',
    `<label for="${this.uuid}">${this.name}</label>`);

  element.newField.classList.add('page__field');
  element.newField.id = this.uuid; // Добавляем идентификатор полю

  showSendBtn();
};
Field.prototype.createTextInput = function () {
  // Создание контейнера для поля
  const fieldContainer = createFieldContainer();

  element.newField = document.createElement(`${this.type}`);
  element.newField.classList.add('page__text-input');
  element.newField.placeholder = `${this.name}`;

  // Проверки установления минимального и максимального количества символов в полях
  // Если передали пустые значения, значит ставить min и max количество символов не нужно
  if (!this.min == '') element.newField.minLength = `${this.min}`;
  if (!this.max == '') element.newField.maxLength = `${this.max}`;

  fieldContainer.appendChild(element.newField);
  element.sendFieldsButton.before(fieldContainer);// Добавление поля до кнопки "send"

  element.newField.classList.add('page__field');
  element.newField.id = this.uuid; // Добавляем идентификатор полю

  showSendBtn();

  if (this.type === 'input') {
    element.newField.classList.add('contacts-form__text-input');
  }
  if (this.type === 'textarea') {
    element.newField.classList.add('contacts-form__textarea');
  }
};
Field.prototype.addNecessarilyLabel = function () {
  // Вывод предупреждения о том, что поле является обязательным для заполнения
  if (this.necessarily) {
    element.newField.classList.add('necessarily');
    element.newField.insertAdjacentHTML('beforebegin',
      `<p class="contacts-form__required-field-label page__warn-label">Обязательное поле *
                       </p>`);
  }
  else {
    element.newField.insertAdjacentHTML('beforebegin',
      `<p class="page__warn-label"></p>`);
  }
};
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0; const v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
function createFieldContainer() {
  const fieldContainer = document.createElement('div');
  fieldContainer.classList.add('contacts-form__field');
  return fieldContainer
}
export { element, Field }
