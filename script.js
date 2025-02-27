const btns = document.querySelectorAll(".btn");
const eq = document.querySelector("#eq");
const res = document.querySelector("#result");
const op = ["+", "-", "*", "/"]
let eq_flag = false
let dot_flag = false
let zero_flag = false

btns.forEach((btn) => {
  btn.addEventListener("click", (btn) => {
    let key = btn.target.innerText;
    handleKey(key);
  });
});

document.addEventListener("keydown", (e) => {
  console.log(e)
  handleKey(e.key)
})


function handleKey(key) {
  let [eqLen, resLen] = getLength();
  if (zero_flag) {
    divByZero();
  }
  else if (isFinite(key)) {
    // if a no is given populate the display with the number
    if (eq_flag) {
      clear();
      eq_flag = false;
    }
    populate(key);
  } else {
    // if an operator is given
    if (op.includes(key)) {
      // if an operand is already in the display
      // allow an operator to be inserted
      if (eqLen == 1) {
        populate(` ${key} `);
        eq_flag = false;
      } else if (eqLen == 2) {
        // if an operand and an operator is 
        // already there change the operator
        changeOperator(key);
        eq_flag = false;
      } else if (eqLen == 3) {
        // if there are 3 elements 
        // then calculate and replace 
        // the display with result and the new operator
        calcAndReplace(key);
        eq_flag = false;
      } else if (eqLen == 0 && resLen == 1) {
        // if equation is cleared by backspace and 
        // there is a result use that with the new operator
        eq.innerText = `${res.innerText} ${key} `
        eq_flag = false;
      }
    } else if (key == "=" || key == "Enter") {
      // if there are 3 elements 
      // operand operator operand
      // then calculate 
      if (eqLen == 3) {
        res.innerText = calc();
        eq_flag = true;
      }
    } else if (key == "C") {
      // if clear key is given
      // clear the display
      clear();
    } else if (key == ".") {
      // if an operand is there insertion of dot is allowed
      // insert dot and disable it
      if (eqLen == 1 && dot_flag == false) {
        populate(key);
        dot_flag = true;
      } else if (eqLen == 3) {
        // if three elements are available then dot is allowed 
        // if dot is present disable dot
        if (dot_flag) {
          populate(key);
          dot_flag = false;
        }
      }
    } else if (key == "⌫" || key == "Backspace") {
      if (eqLen >= 1) {
        eq.innerText = remove(eqLen);
      } else if (eqLen == 0 && resLen == 1) {
        clear()
      }
    }
  }
}

function remove(len) {
  let text = eq.innerText
  if (len == 1 || len == 3) {
    return text.slice(0, -1)
  } else if (len == 2) {
    return text.slice(0, -3)
  }
}

function divByZero() {
  eq.innerText = ''
  clear_flag = true
  zero_flag = false
}

function calcAndReplace(key) {
  let result = calc();
  res.innerText = result
  if (!zero_flag) {
    eq.innerText = `${result} ${key} `
  }
  else {
    eq.innerText = ''
  }

}

function getLength() {
  let eqLen = eq.innerText.split(" ").filter(i => i).length
  let resLen = res.innerText.split(" ").filter(i => i).length
  return [eqLen, resLen]
}

function changeOperator(key) {
  let len = eq.innerText.length
  let text = eq.innerText
  eq.innerText = text.substring(0, len - 2) + key + text.substring(len - 1);
}

function populate(key) {
  eq.innerText += key
}

function clear() {
  res.innerText = "";
  eq.innerText = "";
  eq_flag = false
  dot_flag = false
  zero_flag = false
}

function calc() {
  const eqtn = eq.innerText.split(" ");
  const a = eqtn[0];
  const b = eqtn[2];
  const op = eqtn[1];
  let res = operate(a, b, op);
  if (isFinite(res)) {
    return parseFloat(res)
  } else {
    return res
  }
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
        return zeroDivideError()
      } else {
        res = div(a, b);
      }
      break;
  }
  return res.toFixed(2);
}

function zeroDivideError() {
  zero_flag = true
  eq.innerText = ''
  return "TO INFINITY AND BEYOND"
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
