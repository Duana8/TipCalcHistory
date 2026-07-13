// Валюта
const currency = new Set();
currency.add("₽");
currency.add("$");
currency.add("€");
const currencyList = document.getElementById('currency');
if (currencyList) {
    for (let name of currency) {
        const option = document.createElement('option');
        option.value = name;
        option.innerHTML = `${name}`;
        currencyList.appendChild(option);
    }
}

// Меню
const menu = new Map([
    ['Кофе', 150],
    ['Капучино', 180],
    ['Круассан', 120]
]);
const [rub] = currency;

const menuList = document.getElementById('menu-list');
const orderList = document.getElementById('order-list');
const orderSum = document.getElementById('bill-amount');

if (menuList && orderList) {
    for (let [dish, price] of menu) {
        const li = document.createElement('li');
        li.classList.add('item');

        const orderInsert = document.createElement('button');
        orderInsert.textContent = '+';
        orderInsert.type = 'button';
        orderInsert.classList.add('btn-order');

        let result = `${dish} — ${price} ${rub}`;
        li.textContent = result + ' ';
        li.appendChild(orderInsert);
        menuList.appendChild(li);

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
    }
}

// История чаевых
customElements.define('history-item', class extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                p { 
                    margin: 8px 0; 
                    font-weight: 700;
                    color: #4a148c;
                }
            </style>
            <p><slot></slot></p>
        `;
    }
});

const form = document.getElementById('tip-form');
const billInput = document.getElementById('bill-amount');
const tipSelect = document.getElementById('tip-percentage');
const history = document.getElementById('history-list');
const empty_mes = document.getElementById('empty-message');
const currencySelect = document.getElementById('currency');

// Нажатие кнопки
form.addEventListener('submit', function (event) {
    event.preventDefault(); // = "Не перезагружай страницу"

    // Значения из полей
    let bill = Number(billInput.value);
    let percent = Number(tipSelect.value);

    // Подсчет
    let tip = Math.round((bill * percent), 0);
    let currency = currencySelect.value;

    // Добавление строчку в историю
    Promise.all([
        new Promise((resolve) => {
            history.classList.remove('hidden');
            resolve();
        }),
        new Promise((resolve) => {
            empty_mes.classList.add('hidden');
            resolve();
        })
    ]).then(() => {
        const historyList = document.getElementById('history-list');
        historyList.innerHTML += `<history-item>Заказ на ${bill} — чаевые ${tip} ${currency}</history-item>`;
    });
});