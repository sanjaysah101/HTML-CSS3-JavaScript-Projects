"use strict";

const datalistUsers = document.getElementById("users-list");
const datalistReceiver = document.getElementById("receiver-name-list");
const switchUsersList = document.querySelector(".switch-users-list");

const inputUserName = document.getElementById("user-id");
const inputUserPin = document.getElementById("user-pin");
const inputReceiverName = document.getElementById("receiver-name");
const inputAmountTransfer = document.getElementById("amount-transfer");
const inputAmountLoan = document.getElementById("amount-loan");
const inputSelectLoanType = document.getElementById("loan-type");

const btnSort = document.getElementById("sort");

const containerLogin = document.querySelector(".login__container");
const containerApp = document.querySelector(".main__app");

const labelStatusMessage = document.querySelector(".status__message");
const labelWelcome = document.querySelector(".user-greeting");
const labelCurrentBalance = document.getElementById("current-balance");
const labelInterestEarned = document.getElementById("interest-earned");
const labelTotalDeposit = document.getElementById("total__deposit");
const labelTotalWithdrawn = document.getElementById("total__withdrawn");
const labelLoanAmount = document.getElementById("loan__amount");

const formLogin = document.getElementById("form-login");
const formTransfer = document.getElementById("form-transfer");
const formLoan = document.getElementById("form-loan");

const imgLoggedInUserAvatar = document.getElementById("current-user-avatar");

const transactionLists = document.getElementById("transaction__lists");

let loggedInUser;

// Utility Functions
const updateBalance = () => {
  loggedInUser.total_amount = loggedInUser.transactions
    .map((transaction) => transaction.transaction_amount)
    .reduce((acc, cur) => acc + cur, 0);
};

const formatCurrency = (
  currency,
  language = navigator.language,
  amount = 0
) => {
  return new Intl.NumberFormat(language, {
    style: "currency",
    currency,
  }).format(amount);
};

const formatTransactionDate = (date, locale) => {
  const calcDaysPassed = (curDate, preDate) =>
    Math.abs(Math.round((curDate - preDate) / 86_400_000));

  const now = new Date();
  const daysPassed = calcDaysPassed(now, new Date(date));

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(new Date(date));
};

const allUserExceptCurrentLoggedInUser = () =>
  allUsers.filter((user) => user.account_id !== loggedInUser.account_id);

const renderDataListUser = () => {
  datalistUsers.innerHTML = "";
  allUsers.forEach((user) => {
    const optionEl = document.createElement("option");
    optionEl.value = user.name;
    datalistUsers.appendChild(optionEl);
  });
};

const renderDatalistReceiver = () => {
  datalistReceiver.innerHTML = "";
  allUserExceptCurrentLoggedInUser().forEach((receiver) => {
    const optionEl = document.createElement("option");
    optionEl.value = receiver.name;
    datalistReceiver.appendChild(optionEl);
  });
};

const renderLoginUserList = () => {
  switchUsersList.innerHTML = "";
  const userList = allUserExceptCurrentLoggedInUser();
  userList.forEach((user) => {
    const div = document.createElement("div");
    div.classList.add("user__list", "user-avatar-container");
    div.setAttribute("data-user_id", user.account_id);

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", `images/${user.avatar}`);
    imgEl.setAttribute("id", "current-user-avatar");
    imgEl.alt = user.name;
    imgEl.classList.add("user__list-avatar");

    const pEl = document.createElement("p");
    pEl.classList.add("user__name");
    pEl.textContent = user.name.split(" ")[0];

    div.appendChild(imgEl);
    div.appendChild(pEl);
    switchUsersList.appendChild(div);
  });
};

const displayTotalDeposit = () => {
  const totalDeposit = loggedInUser.transactions
    .map((transaction) => transaction.transaction_amount)
    .filter((amount) => amount > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelTotalDeposit.textContent = formatCurrency(
    loggedInUser.currency,
    loggedInUser.language,
    totalDeposit
  );
};

const displayTotalWithdrawal = () => {
  const totalWithdrawal = loggedInUser.transactions
    .map((transaction) => transaction.transaction_amount)
    .filter((amount) => amount < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelTotalWithdrawn.textContent = formatCurrency(
    loggedInUser.currency,
    loggedInUser.language,
    Math.abs(totalWithdrawal)
  );
};

const displayLoanAmount = () => {
  if (!loggedInUser.loans) {
    labelLoanAmount.textContent = formatCurrency(
      loggedInUser.currency,
      loggedInUser.language
    );
    return;
  }
  const totalLoan = loggedInUser.loans
    .map((loan) => loan.principal)
    .reduce((acc, cur) => acc + cur, 0);

  labelLoanAmount.textContent = formatCurrency(
    loggedInUser.currency,
    loggedInUser.language,
    totalLoan
  );
};

const displayStatusMessage = (message, status) => {
  labelStatusMessage.textContent = message;
  labelStatusMessage.classList.remove("hidden");
  labelStatusMessage.classList.add(status);
  setTimeout(() => {
    labelStatusMessage.classList.add("hidden");
  }, 2000);
};

const displayAvatar = (altText, src) => {
  imgLoggedInUserAvatar.src = `images/${src}`;
  imgLoggedInUserAvatar.alt = altText;
};

const greetingTimes = [
  { startHour: 6, endHour: 10, greetingMessage: "Good Morning" },
  { startHour: 11, endHour: 14, greetingMessage: "Good Day" },
  { startHour: 15, endHour: 18, greetingMessage: "Good Afternoon" },
  { startHour: 19, endHour: 22, greetingMessage: "Good Evening" },
  { startHour: 23, endHour: 5, greetingMessage: "Good Night" }
];

const displayWelcomeMessage = (username) => {
  // Get the current date and hour
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  // Find the appropriate greeting based on the current hour
  const currentGreeting = greetingTimes.find(({ startHour, endHour }) =>
    (startHour <= endHour) ? (currentHour >= startHour && currentHour <= endHour) : (currentHour >= startHour || currentHour <= endHour)
  ) || { greetingMessage: "Hello" };

  // Display the greeting message to the user
  labelWelcome.textContent = `${currentGreeting.greetingMessage}, ${username}!`;
};

const displayCurrentBalance = () => {
  updateBalance();
  labelCurrentBalance.textContent = formatCurrency(
    loggedInUser.currency,
    loggedInUser.language,
    loggedInUser.total_amount
  );
};

const displayInterest = () => {
  labelInterestEarned.textContent = formatCurrency(
    loggedInUser.currency,
    loggedInUser.language,
    loggedInUser.interest_earned
  );
};

const displayTransactionList = (sort = false) => {
  transactionLists.innerHTML = "";

  const transactions = sort
    ? loggedInUser.transactions
        .slice()
        .sort((a, b) => b.transaction_amount - a.transaction_amount)
    : loggedInUser.transactions;

  transactions.forEach((transaction) => {
    const divTransactionList = document.createElement("div");
    divTransactionList.classList.add("transaction__list");

    const divTransactionUser = document.createElement("div");
    divTransactionUser.classList.add("transaction__user");

    const divTransactionIcon = document.createElement("div");
    divTransactionIcon.classList.add("transaction__icon");

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", `images/${transaction.avatar}`);
    imgEl.setAttribute("alt", transaction.name);
    imgEl.classList.add("user-avatar");

    divTransactionIcon.appendChild(imgEl);

    const divTransactionLabel = document.createElement("div");
    divTransactionLabel.classList.add("transaction__label");

    const pTransactionCorrespondents = document.createElement("p");
    pTransactionCorrespondents.classList.add("transaction__correspondents");
    pTransactionCorrespondents.textContent = transaction.name;

    const pTransactionDate = document.createElement("p");
    pTransactionDate.classList.add("transaction__date");
    pTransactionDate.textContent = formatTransactionDate(
      transaction.date,
      loggedInUser.language
    );

    divTransactionLabel.appendChild(pTransactionCorrespondents);
    divTransactionLabel.appendChild(pTransactionDate);
    divTransactionUser.appendChild(divTransactionIcon);
    divTransactionUser.appendChild(divTransactionLabel);

    const divTransactionAmount = document.createElement("div");
    divTransactionAmount.classList.add("transaction__amount");

    const pTransactionValue = document.createElement("p");
    pTransactionValue.classList.add("transaction__value");
    pTransactionValue.textContent = formatCurrency(
      transaction.currency,
      transaction.language,
      transaction.transaction_amount
    );

    const pTransactionType = document.createElement("p");
    pTransactionType.classList.add("transaction__type");
    pTransactionType.textContent =
      transaction.transaction_amount > 0 ? "credit" : "debit";

    divTransactionAmount.appendChild(pTransactionValue);
    divTransactionAmount.appendChild(pTransactionType);

    divTransactionList.appendChild(divTransactionUser);
    divTransactionList.appendChild(divTransactionAmount);

    transactionLists.appendChild(divTransactionList);
  });
};

const handleSortTransactionButtonClick = () => {
  let sorted = false;
  btnSort.addEventListener("click", () => {
    displayTransactionList(!sorted);
    sorted = !sorted;
  });
};

// Event Delegation Example
switchUsersList.addEventListener("click", (e) => {
  const userListEl = e.target.closest(".user__list");
  const userId = +userListEl.dataset.user_id;
  loggedInUser = allUsers.find((user) => user.account_id === userId);
  init(loggedInUser);
});

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = inputUserName.value;
  const pin = inputUserPin.value;

  const foundUser = allUsers.find((user) => user.name === username);
  if (!foundUser) {
    displayStatusMessage("user does not exist", "error");
  } else if (foundUser.pin !== pin) {
    displayStatusMessage("Incorrect Pin", "error");
  } else {
    loggedInUser = foundUser;
    init(loggedInUser);
  }
});

formTransfer.addEventListener("submit", (e) => {
  e.preventDefault();
  const receiver = inputReceiverName.value;
  const amount = +inputAmountTransfer.value;
  const allReceiver = allUserExceptCurrentLoggedInUser();
  const foundReceiver = allReceiver.find((user) => user.name === receiver);
  if (!foundReceiver) {
    displayStatusMessage("receiver not found", "error");
    return;
  }

  if (amount > loggedInUser.total_amount || amount <= 0) {
    displayStatusMessage("Insufficient amount", "error");
    return;
  }

  const date = new Date().toISOString();
  const newTransactionForSender = {
    account_id: foundReceiver.account_id,
    name: foundReceiver.name,
    avatar: foundReceiver.avatar,
    transaction_amount: -amount,
    currency: loggedInUser.currency,
    language: loggedInUser.language,
    date: date,
  };

  const newTransactionForReceiver = {
    account_id: loggedInUser.account_id,
    name: loggedInUser.name,
    avatar: loggedInUser.avatar,
    transaction_amount: amount,
    currency: loggedInUser.currency,
    language: loggedInUser.language,
    date: date,
  };

  loggedInUser.transactions.unshift(newTransactionForSender);
  foundReceiver.transactions.unshift(newTransactionForReceiver);
  displayTransactionList();
  displayCurrentBalance();
  displayTotalWithdrawal();
  inputReceiverName.value = "";
  inputAmountTransfer.value = "";
});

formLoan.addEventListener("submit", (e) => {
  e.preventDefault();
  const principal = +inputAmountLoan.value;
  const loanType = inputSelectLoanType.value;
  const time = 6;
  const rate = 0.1;
  const totalAmount = principal * (1 + rate * time);
  const interest = totalAmount - principal;
  const date = new Date().toISOString();

  const newLoan = {
    loanType,
    principal,
    time,
    rate,
    totalAmount,
    interest,
    date,
  };

  if (!loggedInUser.loans) {
    loggedInUser.loans = [];
  }
  loggedInUser.loans.unshift(newLoan);

  const newTransactionForSender = {
    account_id: loggedInUser.account_id,
    name: loggedInUser.name,
    avatar: loggedInUser.avatar,
    transaction_amount: principal,
    currency: loggedInUser.currency,
    language: loggedInUser.language,
    date: date,
  };

  loggedInUser.transactions.unshift(newTransactionForSender);
  inputAmountLoan.value = "";
  inputSelectLoanType.value = "";
  displayTotalDeposit();
  displayLoanAmount();
  displayTransactionList();
  displayCurrentBalance();
});

const init = () => {
  if (!loggedInUser) {
    renderDataListUser();
  } else {
    containerLogin.classList.add("hidden");
    containerApp.classList.remove("hidden");
    displayAvatar(loggedInUser.name, loggedInUser.avatar);
    displayCurrentBalance();
    displayInterest();
    displayLoanAmount();
    displayTotalDeposit();
    displayTotalWithdrawal();
    displayTransactionList();
    displayWelcomeMessage(loggedInUser.name);
    handleSortTransactionButtonClick();
    renderDatalistReceiver();
    renderLoginUserList();
  }
};

init();
