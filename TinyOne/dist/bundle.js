/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/field.js":
/*!*************************!*\
  !*** ./src/js/field.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return field; });\nfunction field() {\n  alert('gg ');\n  let element = {\n    addButton: document.querySelector('.contacts-form__button_add'),\n    // Открытие окна выбора поля\n    selectWindow: document.querySelector('.select-field-window'),\n    // Окно выбора типа создаваемого поля\n    windowCross: document.querySelectorAll('.popup-window__cross'),\n    // Крест - закрытие окна\n    selectWindowButton: document.querySelectorAll('.popup-window__button'),\n    // Кнопка - выбор поля\n    createWindow: document.querySelector('.create-field-window'),\n    // Окно создания поля\n    validWindow: document.querySelector('.success-validation-window'),\n    // Окно успешной валидации\n    createButton: document.querySelector('#createButton'),\n    // Кнопка создания поля\n    validBtn: document.querySelector('#validBtn'),\n    //Кнопка для валидации полей\n    modalBackground: document.querySelector('.modal'),\n    //Затемнение для модального окна\n    sendFieldsButton: document.querySelector('.contacts-form__button_send'),\n    // Кнопка, отправляющая\n    contactsForm: document.querySelector('.contacts-form'),\n    // Форма содержащая контакты и поля для заполнения\n    menu: document.querySelector('.menu') // Контекстное меню\n\n  };\n  let typeField = ''; // Тип поля, который выбрал пользователь для создания\n\n  let pressedField; // Поле, для которого вызвали контекстное меню\n\n  let newField; // Конструктор поля\n\n  function field(type, name, min, max, necessarily) {\n    this.uuid = uuidv4(); // Генерация идентификатора\n\n    this.type = type;\n    this.name = name;\n    this.min = min;\n    this.max = max;\n    this.necessarily = necessarily;\n  } // Функция создания поля\n\n\n  field.prototype.createCheckbox = function () {\n    // Создание контейнера для поля\n    const fieldContainer = createFieldContainer();\n    const divContainer = document.createElement('div'); // Создание контейнера для checkbox\n\n    divContainer.classList.add('contacts-form__checkbox');\n    newField = document.createElement('input');\n    newField.type = 'checkbox'; // Создание checkbox\n\n    fieldContainer.appendChild(divContainer);\n    element.sendFieldsButton.before(fieldContainer); // Добавление поля до кнопки \"send\"\n\n    divContainer.appendChild(newField);\n    newField.insertAdjacentHTML('afterend', `<label for=\"${this.uuid}\">${this.name}</label>`);\n    newField.classList.add('page__field');\n    newField.id = this.uuid; // Добавляем идентификатор полю\n\n    showSendBtn();\n  };\n\n  field.prototype.createTextInput = function () {\n    // Создание контейнера для поля\n    const fieldContainer = createFieldContainer();\n    newField = document.createElement(`${this.type}`);\n    newField.classList.add('page__text-input');\n    newField.placeholder = `${this.name}`; // Проверки установления минимального и максимального количества символов в полях\n    // Если передали пустые значения, значит ставить min и max количество символов не нужно\n\n    if (!this.min == '') newField.minLength = `${this.min}`;\n    if (!this.max == '') newField.maxLength = `${this.max}`;\n    fieldContainer.appendChild(newField);\n    element.sendFieldsButton.before(fieldContainer); // Добавление поля до кнопки \"send\"\n\n    newField.classList.add('page__field');\n    newField.id = this.uuid; // Добавляем идентификатор полю\n\n    showSendBtn();\n\n    if (this.type === 'input') {\n      newField.classList.add('contacts-form__text-input');\n    }\n\n    if (this.type === 'textarea') {\n      newField.classList.add('contacts-form__textarea');\n    }\n  };\n\n  field.prototype.addNecessarilyLabel = function () {\n    // Вывод предупреждения о том, что поле является обязательным для заполнения\n    if (this.necessarily) {\n      newField.classList.add('necessarily');\n      newField.insertAdjacentHTML('beforebegin', `<p class=\"contacts-form__required-field-label page__warn-label\">Обязательное поле *\n                       </p>`);\n    } else {\n      newField.insertAdjacentHTML('beforebegin', `<p class=\"page__warn-label\"></p>`);\n    }\n  }; // Кнопка \"+\" - открывает окно выбора типа поля\n\n\n  element.addButton.addEventListener('click', () => {\n    element.modalBackground.style.display = 'block';\n    showWindow(element.selectWindow);\n  }); // Обработчик клика на кнопку с типом поля (select, input, textarea)\n\n  element.selectWindowButton.forEach(button => {\n    button.addEventListener('click', () => {\n      closeTheWindow(element.selectWindow, () => {\n        typeField = button.value + ''; // Записваем тип поля, которое мы выбрали для создания\n\n        if (typeField === 'checkbox') {\n          document.querySelector('#minCountInput').style.display = 'none';\n          document.querySelector('#maxCountInput').style.display = 'none';\n        } else {\n          document.querySelector('#minCountInput').style.display = 'block';\n          document.querySelector('#maxCountInput').style.display = 'block';\n        }\n\n        showWindow(element.createWindow);\n      });\n    });\n  });\n  element.createButton.addEventListener('click', () => {\n    const name = document.querySelector('#nameInput').value;\n    let minCount = document.querySelector('#minCountInput').value;\n    let maxCount = document.querySelector('#maxCountInput').value;\n    let necessarily = false;\n\n    if (document.querySelector('#selectNecessarily').value == 'necessarily') {\n      necessarily = true;\n    } // Количество символов не может быть отрицательным\n\n\n    if (minCount <= 0) {\n      minCount = '';\n    }\n\n    if (maxCount <= 0 || maxCount < minCount) {\n      maxCount = '';\n    }\n\n    const newField = new field(typeField, name, minCount, maxCount, necessarily); // Если создаваемый тип checkbox,то создаётся checkbox\n\n    if (newField.type === 'checkbox') {\n      newField.createCheckbox();\n    } // Иначе текстовый input\n    else {\n        newField.createTextInput();\n      }\n\n    newField.addNecessarilyLabel(); // Добавление события для валидации min  количества символов\n\n    minCountUpdateEvent();\n    closeModal();\n    closeTheWindow(element.createWindow);\n  }); // Закрытие окна по нажатию на крест\n\n  element.windowCross.forEach(cross => {\n    cross.addEventListener('click', () => {\n      // lastButton = '';\n      closeModal(); // Закрывает окно, в котором находится крест\n\n      closeTheWindow(cross.parentNode.parentNode);\n    });\n  });\n  element.sendFieldsButton.addEventListener('click', () => {\n    if (validationCheck()) {\n      element.modalBackground.style.display = 'block';\n      showWindow(element.validWindow);\n    }\n  });\n  element.validBtn.addEventListener('click', () => {\n    closeModal();\n    closeTheWindow(element.validWindow);\n  }); // Делегирование событий для удаления полей на форме\n\n  element.contactsForm.addEventListener('contextmenu', e => {\n    e.preventDefault();\n\n    if (e.target.classList.contains('page__field')) {\n      pressedField = e.target;\n    }\n\n    if (e.target.parentNode.classList.contains('contacts-form__checkbox')) {\n      pressedField = e.target.parentNode;\n    }\n\n    showMenu(e.clientX, e.clientY, field);\n  }); // Клик на меню удаления поля\n\n  element.menu.addEventListener('click', e => {\n    e.preventDefault();\n    hideMenu();\n    deleteField();\n    hideSendBtn();\n  }); //Скрыть меню удаления при клике на окно\n\n  window.addEventListener('click', event => {\n    if (!event.target.classList.contains('page__field')) {\n      hideMenu();\n    }\n  });\n\n  function closeTheWindow(window, callback = () => {}) {\n    window.classList.add('popup-window__animation_to-right');\n    setTimeout(() => {\n      callback();\n      window.style.display = 'none';\n      window.classList.remove('popup-window__animation_from-left');\n    }, 300);\n  }\n\n  function showWindow(window) {\n    element.selectWindow.style.display = 'none';\n    element.validWindow.style.display = 'none';\n    element.createWindow.style.display = 'none';\n    window.style.display = 'block';\n    window.classList.remove('popup-window__animation_to-right');\n    window.classList.add('popup-window__animation_from-left');\n  }\n\n  function closeModal(time = 300) {\n    setTimeout(() => {\n      element.modalBackground.style.display = 'none';\n    }, time);\n  }\n\n  function uuidv4() {\n    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\n      const r = Math.random() * 16 | 0;\n      const v = c == 'x' ? r : r & 0x3 | 0x8;\n      return v.toString(16);\n    });\n  }\n\n  function minCountUpdateEvent() {\n    const fields = document.querySelectorAll('.page__text-input');\n    fields.forEach(e => {\n      e.oninput = () => {\n        if (e.value.length < e.minLength && e.value.length != 0) {\n          e.classList.add('page__field_backlight_red'); // Если у поля уже есть предупреждение о кол-ве символов, то его выводить не нужно\n\n          if (!e.parentNode.querySelector('.contacts-form__characters-warning-label')) {\n            e.insertAdjacentHTML('beforebegin', `<p class=\"contacts-form__characters-warning-label page__warn-label\">\n                                   Минимальное количество символов: ${e.minLength}\n                                   </p>`);\n          }\n        } else {\n          e.classList.remove('page__field_backlight_red');\n          const label = e.parentNode.querySelector('.contacts-form__characters-warning-label');\n\n          if (label) {\n            label.remove();\n          }\n        }\n      };\n    });\n  }\n\n  function validationCheck() {\n    const fields = document.querySelectorAll('.page__field');\n    let check = true;\n    fields.forEach(e => {\n      if (!necessarilyCheck(e)) {\n        check = false;\n        backlight(e);\n      }\n    });\n    return check;\n  }\n\n  function necessarilyCheck(field) {\n    let result = true;\n\n    switch (field.type) {\n      case 'checkbox':\n        if (field.classList.contains('necessarily') && !field.checked) {\n          result = !result;\n        }\n\n        break;\n\n      default:\n        if (field.classList.contains('necessarily') && !field.value || field.value.length < field.minLength) {\n          result = !result;\n        }\n\n        break;\n    }\n\n    return result;\n  }\n\n  function backlight(field) {\n    if (field.type != 'checkbox') {\n      field.classList.add('page__field_backlight_red');\n    } else {\n      field.parentNode.classList.add('contacts-form__checkbox_backlight');\n    }\n  }\n\n  function deleteField(callback = () => {}) {\n    const parentField = pressedField.parentNode;\n    parentField.parentNode.removeChild(parentField);\n    setTimeout(() => {\n      callback();\n    }, 200);\n  }\n\n  function createFieldContainer() {\n    const fieldContainer = document.createElement('div');\n    fieldContainer.classList.add('contacts-form__field');\n    return fieldContainer;\n  }\n\n  function showMenu(x, y) {\n    element.menu.style.left = x + pageXOffset + 'px';\n    element.menu.style.top = y + pageYOffset + 'px';\n    element.menu.classList.add('menu_show');\n  }\n\n  function hideMenu() {\n    element.menu.classList.remove('menu_show');\n  }\n\n  function showSendBtn() {\n    element.sendFieldsButton.style.display = 'block';\n  }\n\n  function hideSendBtn() {\n    if (!element.contactsForm.querySelectorAll('.contacts-form__field')[0]) {\n      element.sendFieldsButton.style.display = 'none';\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/js/field.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./field */ \"./src/js/field.js\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/scss/style.scss\");\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_scss_style_scss__WEBPACK_IMPORTED_MODULE_1__);\n\n\nObject(_field__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/scss/style.scss":
/*!*****************************!*\
  !*** ./src/scss/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin\n\n//# sourceURL=webpack:///./src/scss/style.scss?");

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./src/js/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/index.js */\"./src/js/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/index.js?");

/***/ })

/******/ });