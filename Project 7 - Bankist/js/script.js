const allUsers = [
  {
    account_id: 1,
    name: "Sanjay Sah",
    avatar: "sanjay.jpg",
    total_amount: 0,
    currency: "EUR",
    language: "pt-PT",
    interest_earned: 100,
    interest_rate: 6,
    pin: "1111",
    transactions: [
      {
        account_id: 2,
        name: "Amazon",
        avatar: "amazon.png",
        transaction_amount: -200,
        language: "pt-PT",
        currency: "EUR",
        date: "2023-10-09T06:38:17.037Z",
      },
      {
        account_id: 3,
        name: "Flipkart",
        avatar: "flipkart.png",
        transaction_amount: -100,
        language: "pt-PT",
        currency: "EUR",
        date: "2023-10-03T06:38:17.037Z",
      },
      {
        account_id: 101,
        name: "Self",
        avatar: "user.png",
        transaction_amount: 1000,
        language: "pt-PT",
        currency: "EUR",
        date: "2023-10-01T06:38:17.037Z",
      },
    ],
    loans: [
      {
        interest: 6000,
        loanType: "home",
        principal: 10000,
        rate: 0.1,
        time: 6,
        totalAmount: 16000,
        date: "2023-10-09T09:05:50.482Z",
      },
    ],
  },
  {
    account_id: 2,
    name: "Amazon",
    avatar: "amazon.png",
    total_amount: 0,
    interest_earned: 300,
    currency: "USD",
    language: "US",
    interest_rate: 6,
    pin: "2222",
    transactions: [
      {
        account_id: 1,
        name: "Sanjay Sah",
        avatar: "sanjay.jpg",
        transaction_amount: 100,
        language: "US",
        currency: "USD",
        date: "2023-10-01T06:38:17.037Z",
      },
    ],
  },
  {
    account_id: 3,
    name: "Flipkart",
    avatar: "flipkart.png",
    total_amount: 0,
    interest_earned: 200,
    currency: "INR",
    language: "HI",
    interest_rate: 6,
    pin: "3333",
    transactions: [
      {
        account_id: 1,
        name: "Sanjay Sah",
        avatar: "sanjay.jpg",
        transaction_amount: 200,
        currency: "INR",
        language: "HI",
        date: "2023-10-08T06:38:17.037Z",
      },
    ],
  },
];

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
const labelWelcome = document.querySelector(".welcome");
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

let loggedInUser =undefined;

const renderDataListUser = () => {
  let html = "";
  datalistUsers.innerHTML = "";
  allUsers.forEach((user) => {
    html += `<option value="${user.name}"></option>`;
  });
  datalistUsers.insertAdjacentHTML("afterbegin", html);
};

const renderDatalistReceiver = () => {
  let html = "";
  datalistReceiver.innerHTML = "";
  const allReceiver = allUsers.filter(
    (user) => user.account_id !== loggedInUser.account_id
  );
  allReceiver.forEach((receiver) => {
    html += `<option value="${receiver.name}"></option>`;
  });
  datalistReceiver.insertAdjacentHTML("afterbegin", html);
};

const renderLoginUserList = () => {
  let html = "";
  switchUsersList.innerHTML = "";
  const allOtherUserExceptCurrent = allUsers.filter(
    (user) => user.account_id !== loggedInUser.account_id
  );
  allOtherUserExceptCurrent.forEach((user) => {
    html += `
        <div class="user__list user-avatar-container" data-user_id="${
          user.account_id
        }">
            <img
            src="images/${user.avatar}"
            class="user__list-avatar"
            id="current-user-avatar"
            alt="${user.name}"
            />
            <p class="user__name">${user.name.split(" ")[0]}</p>
        </div>
    `;
  });
  switchUsersList.insertAdjacentHTML("afterbegin", html);
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
      loggedInUser.language,
      0
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

const changeUser = () => {
  // Event Delegation
  switchUsersList.addEventListener("click", (e) => {
    const userList = e.target.closest(".user__list");
    if(!userList) return;
    const userId = Number(userList.dataset.user_id);
    loggedInUser = allUsers.find((u) => u.account_id === userId);
    init(loggedInUser);
  });
};

const handleLoginFormSubmit = () => {
  renderDataListUser();
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = inputUserName.value;
    const pin = inputUserPin.value;

    const foundUser = allUsers.find((user) => user.name === username);
    if (!foundUser) {
      displayStatusMessage("user does not exist", "error");
      return;
    }
    if (foundUser.pin !== pin) {
      displayStatusMessage("Incorrect Pin", "error");
      return;
    }
    loggedInUser = foundUser;
    init(loggedInUser);
  });
};

formTransfer.addEventListener("submit", function (e) {
  e.preventDefault();
  const receiver = inputReceiverName.value;
  const amount = +inputAmountTransfer.value;
  const allReceiver = allUsers.filter(
    (user) => user.account_id !== loggedInUser.account_id
  );
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
  displayTransactionList(loggedInUser);
  displayCurrentBalance(loggedInUser);
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

  setTimeout(() => {
    displayTransactionList(loggedInUser);
    displayCurrentBalance(loggedInUser);
  }, 500);
});

const updateBalance = (user) => {
  user.total_amount = user.transactions
    .map((transaction) => transaction.transaction_amount)
    .reduce((acc, cur) => acc + cur, 0);
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

const displayWelcomeMessage = (username) => {
  const now = new Date();
  const hour = now.getHours();
  let greeting = "Good Night";
  if (hour >= 6 && hour <= 10) {
    greeting = "Good Morning";
  } else if (hour >= 11 && hour <= 14) {
    greeting = "Good Day";
  } else if (hour >= 15 && hour <= 18) {
    greeting = "Good Afternoon";
  } else if (hour >= 19 && hour <= 22) {
    greeting = "Good Evening";
  }
  labelWelcome.textContent = `${greeting}, ${username}!`;
};

const formatCurrency = (currency, language, amount) => {
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

const displayCurrentBalance = (user) => {
  updateBalance(user);
  labelCurrentBalance.textContent = formatCurrency(
    user.currency,
    user.language,
    user.total_amount
  );
};

const displayInterest = (user) => {
  labelInterestEarned.textContent = formatCurrency(
    user.currency,
    user.language,
    user.interest_earned
  );
};

const displayTransactionList = (user, sort = false) => {
  let html = "";
  transactionLists.innerHTML = "";

  const transactions = sort
    ? user.transactions
        .slice()
        .sort((a, b) => b.transaction_amount - a.transaction_amount)
    : user.transactions;

  transactions.forEach((transaction) => {
    html += `
        <div class="transaction__list">
            <div class="transaction__user">
                <div class="transaction__icon">
                    <img
                        src="images/${transaction.avatar}"
                        class="user-avatar"
                        alt="${transaction.name}"
                    />
                </div>
                <div class="transaction__label">
                    <p class="transaction__correspondents">${
                      transaction.name
                    }</p>
                    <p class="transaction__date">${formatTransactionDate(
                      transaction.date,
                      user.language
                    )}</p>
                </div>
            </div>
            <div class="transaction__amount">
                <p class="transaction__value">${formatCurrency(
                  transaction.currency,
                  transaction.language,
                  transaction.transaction_amount
                )}</p>
                <p class="transaction__type">                    ${
                  transaction.transaction_amount > 0 ? "credit" : "debit"
                }
                </p>
            </div>
        </div>
    `;
  });
  transactionLists.insertAdjacentHTML("afterbegin", html);
};

const handleSortTransactionBtnClick = () => {
  let sorted = false;
  btnSort.addEventListener("click", () => {
    displayTransactionList(loggedInUser, !sorted);
    sorted = !sorted;
  });
};

const init = () => {
  if (!loggedInUser) {
    handleLoginFormSubmit();
  } else {
    containerLogin.classList.add("hidden");
    containerApp.classList.remove("hidden");
    renderLoginUserList(loggedInUser);
    displayWelcomeMessage(loggedInUser.name);
    displayAvatar(loggedInUser.name, loggedInUser.avatar);
    displayCurrentBalance(loggedInUser);
    displayInterest(loggedInUser);
    displayTransactionList(loggedInUser);
    renderDatalistReceiver(loggedInUser);
    handleSortTransactionBtnClick(loggedInUser);
    displayTotalDeposit();
    displayTotalWithdrawal();
    displayLoanAmount();
    changeUser();
  }
};

init();
