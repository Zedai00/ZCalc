const btns = document.querySelectorAll(".btn");
const eq = document.querySelector("#eq");
const res = document.querySelector("#result");

eq.innerText = "";
let dot_flag = false;
let op_flag = false;

btns.forEach((btn) => {
  btn.addEventListener("click", (btn) => {
    const key = btn.target.innerText;
    if (isFinite(key)) {
      eq.innerText += key;
    } else if (key == "C") {
      clear();
    } else {
      const len = eq.innerText.length;
      if (len <= 0) {
        return;
      }
      if (key == "=") {
        const result = calc();
        eq.innerText = "";
        res.innerText = result;
        op_flag = false;
      } else if (key == "." && dot_flag == false) {
        if (!isOperand(eq.innerText.charAt(len - 2))) {
          eq.innerText += key;
          dot_flag = true;
        }
      } else {
        if (isOperand(eq.innerText[len - 2])) {
          eq.innerText = replaceChar(eq.innerText, key, len - 2);
        } else if (op_flag) {
          const result = calc();
          res.innerText = result;
          eq.innerText = `${result} ${key} `;
          op_flag = false;
        } else {
          eq.innerText += ` ${key} `;
          dot_flag = false;
          op_flag = true;
        }
      }
    }
  });
});

function clear() {
  res.innerText = "";
  eq.innerText = "";
  dot_flag = false;
  op_flag = false;
}

function calc() {
  const eqtn = eq.innerText.split(" ");
  const a = eqtn[0];
  const b = eqtn[2];
  const op = eqtn[1];
  return operate(a, b, op);
}

function replaceChar(origString, replaceChar, index) {
  const firstPart = origString.substr(0, index);
  const lastPart = origString.substr(index + 1);

  const newString = firstPart + replaceChar + lastPart;
  return newString;
}
function isOperand(op) {
  return ["+", "-", "*", "/"].includes(op);
}

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  let res = 0;
  switch (op) {
    case "+":
      res = add(a, b);
      break;
    case "-":
      res = sub(a, b);
      break;
    case "*":
      res = mult(a, b);
      break;
    case "/":
      res = div(a, b);
      break;
  }
  return res.toFixed(2);
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mult(a, b) {
  return a * b;
}

function div(a, b) {
  return a / b;
}
