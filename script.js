const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Function to update values (balance, income, expense)
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0);
  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0);
  const expense = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1;

  balanceEl.innerText = `Balance: $${total.toFixed(2)}`;
  incomeEl.innerText = `Income: $${income.toFixed(2)}`;
  expenseEl.innerText = `Expense: $${expense.toFixed(2)}`;
}

// Function to add a new transaction to the DOM
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+';
  const li = document.createElement('li');
  li.classList.add(transaction.amount < 0 ? 'expense' : 'income');
  
  li.innerHTML = `
    ${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;
  
  transactionList.appendChild(li);
}

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  const text = document.getElementById('text').value;
  const amount = +document.getElementById('amount').value;

  const transaction = {
    id: Math.floor(Math.random() * 100000000),
    text,
    amount
  };

  transactions.push(transaction);

  addTransactionDOM(transaction);
  updateValues();

  localStorage.setItem('transactions', JSON.stringify(transactions));

  document.getElementById('text').value = '';
  document.getElementById('amount').value = '';
}

// Remove transaction
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);
  
  localStorage.setItem('transactions', JSON.stringify(transactions));

  init();
}

// Initialize app
function init() {
  transactionList.innerHTML = '';
  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();
transactionForm.addEventListener('submit', addTransaction);
