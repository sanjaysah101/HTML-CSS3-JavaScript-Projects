const handleTransferForm = (currentUser) => {
  renderDatalistReceiver(currentUser);
  formTransfer.addEventListener("submit", function (e) {
    e.preventDefault();
    const receiver = inputReceiverName.value;
    const amount = +inputAmountTransfer.value;
    const allReceiver = allUsers.filter(
      (user) => user.account_id !== currentUser.account_id
    );
    const foundReceiver = allReceiver.filter((user) => user.name === receiver);
    if (!foundReceiver.length) {
      displayStatusMessage("receiver not found", "error");
      return;
    }

    if (amount > currentUser.total_amount || amount <= 0) {
      displayStatusMessage("Insufficient amount", "error");
      return;
    }

    const date = new Date().toISOString();
    const newTransactionForSender = {
      account_id: foundReceiver[0].account_id,
      name: foundReceiver[0].name,
      avatar: foundReceiver[0].avatar,
      transaction_amount: -amount,
      currency: currentUser.currency,
      language: currentUser.language,
      date: date,
    };

    const newTransactionForReceiver = {
      account_id: currentUser.account_id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      transaction_amount: amount,
      currency: currentUser.currency,
      language: currentUser.language,
      date: date,
    };

    currentUser.transactions.unshift(newTransactionForSender);
    foundReceiver[0].transactions.unshift(newTransactionForReceiver);
    displayTransactionList(currentUser);
    displayCurrentBalance(currentUser);
    inputReceiverName.value = "";
    inputAmountTransfer.value = "";
  });
};
