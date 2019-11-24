(function() {
    document.addEventListener('DOMContentLoaded', function() {
        let 
        addButton = document.querySelector('.contacts-form__button_add'), //Открытие формы
        contactsForm = document.querySelector('.contacts-form'), // Форма, в которую добавляются поля
        selectWindow = document.querySelector('.select-field-window'), //Окно выбора типа создаваемого поля
        windowCross = document.querySelectorAll('.popup-window__cross'), //Крест - закрытие окна
        selectWindowButton = document.querySelectorAll('.popup-window__button'),//Кнопка - выбор поля
        createWindow = document.querySelector('.create-field-window');

        addButton.addEventListener('click', ()=>{
            showTheWindow(selectWindow);
        })

        selectWindowButton.forEach((button) => {
            button.addEventListener('click', ()=>{
                closeTheWindow(selectWindow, ()=>{
                    showTheWindow(createWindow);
                });
            })
        })

        windowCross.forEach((cross) =>{
            cross.addEventListener('click', ()=>{
                closeTheWindow(cross.parentNode.parentNode); //Закрывает окно, в котором находится крест
            })
        })

        function closeTheWindow(window, callback){
            window.classList.add('display_none');
            setTimeout(()=>{
                window.classList.remove('display_block');
                callback();
            }, 550)
        }
        function showTheWindow(window){
            window.classList.remove('display_none');
            window.classList.add('display_block');
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
