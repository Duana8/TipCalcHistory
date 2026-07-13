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

// Нажатие кнопки
form.addEventListener('submit', function(event) {
    event.preventDefault(); // = "Не перезагружай страницу"

    // Значения из полей
    let bill = Number(billInput.value);
    let percent = Number(tipSelect.value);

    // Подсчет
    let tip = Math.round((bill * percent),0);
    
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
        historyList.innerHTML += `<history-item>Заказ на ${bill} — чаевые ${tip}</history-item>`;
    });
});