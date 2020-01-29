export default function getElements(doc) {
    let element = {
        addButton: doc.querySelector('.contacts-form__button_add'), // Открытие окна выбора поля
        selectWindow: doc.querySelector('.select-field-window'), // Окно выбора типа создаваемого поля
        windowCross: doc.querySelectorAll('.popup-window__cross'), // Крест - закрытие окна
        selectWindowButton: doc.querySelectorAll('.popup-window__button'), // Кнопка - выбор поля
        createWindow: doc.querySelector('.create-field-window'), // Окно создания поля
        validWindow: doc.querySelector('.success-validation-window'), // Окно успешной валидации
        createButton: doc.querySelector('#createButton'), // Кнопка создания поля
        validBtn: doc.querySelector('#validBtn'),//Кнопка для валидации полей
        modalBackground: doc.querySelector('.modal'),//Затемнение для модального окна
        sendFieldsButton: doc.querySelector('.contacts-form__button_send'), // Кнопка, отправляющая
        contactsForm: doc.querySelector('.contacts-form'), // Форма содержащая контакты и поля для заполнения
        menu: doc.querySelector('.menu'), // Контекстное меню
        typeField: '', // Тип поля, который выбрал пользователь для создания
        pressedField: '',// Поле, для которого вызвали контекстное меню
        newField: '',
        // test: document.querySelector('.test'),
    }
    let result = true;
    for (let key in element) {
        if (element[key] === null) {
            result = false;
            break;
        }
    }
    return new Promise((resolve, reject) => {
        if (result) {
            resolve(element);
        }
        else {
            reject('Ошибка, не найден элемент на странице');
        }
    })
}