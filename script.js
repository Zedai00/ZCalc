const btns = document.querySelectorAll(".btn");
const eq = document.querySelector("#eq");
const res = document.querySelector("#result");

eq.innerText = "";
let dot_flag = false;
let op_flag = false;
let op_last_flag = false;
let eq_flag = false;
let first_pass = false;
btns.forEach((btn) => {
  btn.addEventListener("click", (btn) => {
    const key = btn.target.innerText;
    if (isFinite(key)) {
      if (eq_flag){
        eq.innerText = "";
        eq_flag = false
      }
      if(first_pass) {
        op_flag = true
      }
      op_last_flag = false
      eq.innerText += key;
    } else if (key == "C") {
      clear();
    } else {
      const len = eq.innerText.length;
      if (len <= 0) {
        return;
      }
      if (key == "=") {
        if (!op_last_flag) {
        const result = calc();
        res.innerText = result;
        eq_flag = true}
      } else if (key == "." && dot_flag == false) {
        if (!isOperand(eq.innerText.charAt(len - 2))) {
          eq.innerText += key;
          dot_flag = true;
        }
      } else {
        if (isOperand(eq.innerText[len - 2])) {
          eq.innerText = replaceChar(eq.innerText, key, len - 2);
        } else if (op_flag) {
          if (!eq_flag) {
            const result = calc();
            res.innerText = result;
            eq.innerText = `${result} ${key} `;
          }else {
            result = res.innerText
            eq_flag = false
            eq.innerText = `${result} ${key} `;
          }
        } else {
          eq.innerText += ` ${key} `;
          dot_flag = false;
          op_flag = true;
        }
        op_last_flag = true
      }
    }
  });
});

function clear() {
  res.innerText = "";
  eq.innerText = "";
  dot_flag = false;
  op_flag = false;
  first_pass = false;
  op_last_flag = false;
}

function calc() {
  first_pass = true
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
      if (b == 0) {
        res = "TO INFINITY AND BEYOND";
      } else {
        res = div(a, b);
      }
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
