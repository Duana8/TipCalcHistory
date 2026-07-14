// Валюта
const currency = new Set();
currency.add("₽");
currency.add("$");
currency.add("€");

// Меню
const menu = new Map([
    ['Кофе', 150],
    ['Капучино', 180],
    ['Круассан', 120]
]);
const [rub] = currency;

const menuList = document.getElementById('menu-list');

if (menuList) {
    for (let [dish, price] of menu) {
        const li = document.createElement('li');
        li.classList.add('item');

        let result = `${dish} — ${price} ${rub}`;
        li.textContent = result + ' ';
        menuList.appendChild(li);
    }
}

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
    
    // Добавление строчку в историю
    history.classList.remove('hidden');
    empty_mes.classList.add('hidden');
    const historyList = document.getElementById('history-list');
    historyList.innerHTML += '<p>Заказ на ' + bill + ' — чаевые ' + tip + '</p>';
});