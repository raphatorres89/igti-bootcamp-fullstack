function leftPad(value, count = 2, char = '0') {
  let newValue = value;

  if (value.length < count) {
    for (let i = 0; i < count - value.length; i++) {
      newValue = char + value;
    }
  }
  return newValue;
}

function getNewTimestamp() {
  const now = new Date();
  return `
  ${leftPad(now.getDate())}/${leftPad(now.getMonth() + 1)}/${now.getFullYear()} 
  ${leftPad(now.getHours())}:${leftPad(now.getMinutes())}:${leftPad(
    now.getSeconds()
  )}.${now.getMilliseconds()}`;
}
