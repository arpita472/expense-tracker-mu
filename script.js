const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const transactionList = document.getElementById('transaction-list');
const transactionForm = document.getElementById('transaction-form');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateUI() {

  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach(transaction => {
    if (transaction.amount > 0) {
      totalIncome += transaction.amount;
    } else {
      totalExpense += transaction.amount;
    }
  });

  balance.textContent = `$${(totalIncome + totalExpense).toFixed(2)}`;
  income.textContent = `+$${totalIncome.toFixed(2)}`;
  expense.textContent = `-$${Math.abs(totalExpense).toFixed(2)}`;


  transactionList.innerHTML = '';
  transactions.forEach((transaction, index) => {
    const li = document.createElement('li');
    li.textContent = `${transaction.text} - $${transaction.amount.toFixed(2)} (${transaction.category})`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTransaction(index);
    li.appendChild(deleteButton);
    transactionList.appendChild(li);
  });


  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction(event) {
  event.preventDefault();

  const text = textInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  if (!text || isNaN(amount)) {
    alert('Please enter valid text and amount.');
    return;
  }

  const transaction = {
    text,
    amount,
    category
  };

  transactions.push(transaction);


  updateUI();

  textInput.value = '';
  amountInput.value = '';
}


function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

transactionForm.addEventListener('submit', addTransaction);

updateUI();
