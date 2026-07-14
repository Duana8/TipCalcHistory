const form = document.getElementById('tip-form');
const billInput = document.getElementById('bill-amount');
const tipSelect = document.getElementById('tip-percentage');
const history = document.getElementById('history-list');
const empty_mes = document.getElementById('empty-message');

// Нажатие кнопки
form.addEventListener('submit', function(event) {
    event.preventDefault(); // = "Не перезагружай страницу"

    // Значения из полей
    let bill = Number(billInput.value);
    let percent = Number(tipSelect.value);

    // Подсчет
    let tip = Math.round((bill * percent),0);
    
    console.log('1. Синхронный код: Начало обработчика');
    
    // Добавление строчку в историю
    history.classList.remove('hidden');
    empty_mes.classList.add('hidden');

    setTimeout(() => {
        console.log('4. Макрозадача (setTimeout): Добавляем заказ в историю на странице');
        
        const historyList = document.getElementById('history-list');
        historyList.innerHTML += '<p>Заказ на ' + bill + ' — чаевые ' + tip + '</p>';
    }, 3000);

    Promise.resolve('Данные подготовлены для истории!')
        .then((message) => {
            console.log('3. Микрозадача (Promise.then): ' + message);
        });

    console.log('2. Синхронный код: Конец обработчика');
});