// script.js

const transactionsList = document.getElementById("transactions");
const totalDisplay = document.getElementById("total");
const textInput = document.getElementById("text");
const amountInput = document.getElementById("amount");

let transactions = [];

function addTransaction() {
  const text = textInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (text === "" || isNaN(amount)) {
    alert("Please enter valid text and amount.");
    return;
  }

  const transaction = {
    id: generateID(),
    text,
    amount,
  };

  transactions.push(transaction);
  addTransactionToDOM(transaction);
  updateTotal();

  textInput.value = "";
  amountInput.value = "";
}

function generateID() {
  return Math.floor(Math.random() * 1000000000);
}

function addTransactionToDOM(transaction) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
        ${transaction.text} <span>${
    transaction.amount > 0 ? "+" : "-"
  }$${Math.abs(transaction.amount).toFixed(2)}</span>
        <button onclick="removeTransaction(${transaction.id})">x</button>
    `;
  transactionsList.appendChild(listItem);
}

function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateTransactionsDOM();
  updateTotal();
}

function updateTransactionsDOM() {
  transactionsList.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
}

function updateTotal() {
  const total = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}
