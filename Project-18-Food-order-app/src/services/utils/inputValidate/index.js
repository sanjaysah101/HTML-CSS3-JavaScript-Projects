export function isEmail(mail) {
  let mailFormat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  return mail.match(mailFormat);
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function isAllLetter(inputTxt) {
  var letters = /^[A-Za-z ]+$/;
  return inputTxt.match(letters);
}
