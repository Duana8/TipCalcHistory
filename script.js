customElements.define('history-item', class extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        
        shadow.innerHTML = `
            <style>
                :host {
                    margin: 8px 0;
                    font-weight: 700;
                    color: var(--paragraph-color); 
                }
            </style>
            <p><slot></slot></p>
        `;
    }
});

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
const [currencySymbol] = currency;

const menuList = document.getElementById('menu-list');
const orderList = document.getElementById('order-list');
const orderSum = document.getElementById('bill-amount');

if (menuList && orderList) {
    for (let [dish, price] of menu) {
        const li = document.createElement('li');
        li.classList.add('item');

        let result = `${dish} — ${price} ${currencySymbol}`;
        li.textContent = result + ' ';
        menuList.appendChild(li);

        const orderInsert = document.createElement('button');
        orderInsert.textContent = '+';
        orderInsert.type = 'button';
        orderInsert.classList.add('btn-order');

        orderInsert.addEventListener('click', function () {
            let currentSum = Number(orderSum.value) || 0;

            const orderItem = document.createElement('li');
            orderItem.classList.add('item');
            orderItem.textContent = result + ' ';

            const orderRemove = document.createElement('button');
            orderRemove.textContent = '✕';
            orderRemove.type = 'button';
            orderRemove.classList.add('btn-order');

            orderRemove.addEventListener('click', function () {
                let sumAfterRemove = (Number(orderSum.value) || 0) - price;
                orderSum.value = sumAfterRemove <= 0 ? '' : sumAfterRemove;
                orderItem.remove();
            });

            orderItem.appendChild(orderRemove);
            orderList.appendChild(orderItem);

            orderSum.value = currentSum + price;
        });

        li.appendChild(orderInsert);
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
    
    console.log('1. Синхронный код: Начало обработчика');
    
    // Добавление строчку в историю
    history.classList.remove('hidden');
    empty_mes.classList.add('hidden');

    setTimeout(() => {
        console.log('4. Макрозадача (setTimeout): Добавляем заказ в историю на странице');
        history.innerHTML += '<p>Заказ на ' + bill + ' — чаевые ' + tip + '</p>';
    }, 3000);

    Promise.resolve('Данные подготовлены для истории!')
        .then((message) => {
            console.log('3. Микрозадача (Promise.then): ' + message);
        });

    console.log('2. Синхронный код: Конец обработчика');
});