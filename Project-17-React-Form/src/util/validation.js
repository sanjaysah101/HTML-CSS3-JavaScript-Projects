export function isEmail(mail) {
  let mailFormat = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  return mail.match(mailFormat);
}

export function isNotEmpty(value) {
  return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
  if (value === null || value === undefined) {
    return false;
  }

  return value.length >= minLength;
}

export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}
