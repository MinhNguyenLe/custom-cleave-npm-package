const dateFormatter = (options) => {
  const delimiter = options.delimiter;
  const pattern = options.pattern;
  const id = options.element;

  const libCharacter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  let d = 0,
    m = 0,
    y = 0;

  const targetInput = document.getElementById(`${id}`);

  function addPlaceHolder(type) {
    if (type == "y") return "YYYY";
    if (type == "d") return "DD";
    if (type == "m") return "MM";
  }
  let plc = "";
  pattern.forEach((type, index) => {
    if (index < 2) plc = plc + addPlaceHolder(type) + delimiter;
    else plc = plc + addPlaceHolder(type);
  });

  targetInput.placeholder = plc;
  targetInput.maxLength = 10;
  targetInput.setAttribute("type", "tel");

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  function checkCharacter(character) {
    return libCharacter.some((c) => c == character);
  }

  function fixDayFormMonth() {
    if (
      (m == 1 || m == 3 || m == 4 || m == 7 || m == 8 || m == 10 || m == 12) &&
      d >= 31
    )
      d = 31;
    if ((m == 4 || m == 6 || m == 9 || m == 11) && d >= 30) d = 30;
    if (m == 2) {
      if (isLeapYear(y) && d >= 29) d = 29;
      if (!isLeapYear(y) && d >= 28) d = 28;
    }
  }

  function validateDate() {
    if (d >= 31) d = 31;
    if (m >= 12) m = 12;
    // if (parseInt(y) == 0) y = "1970";
    if (y >= 2100) y = 2100;
  }

  function validate(type, oldChar, newChar) {
    if (type == "d") {
      if (3 < parseInt(newChar) && parseInt(newChar) < 10) {
        targetInput.value = oldChar + "0" + newChar;
        if (targetInput.value.length < 9) addDelimiter();
      } else {
        targetInput.value = oldChar + "" + newChar;
      }
    }
    if (type == "m") {
      if (1 < parseInt(newChar) && parseInt(newChar) < 10) {
        targetInput.value = oldChar + "0" + newChar;
        if (targetInput.value.length < 9) addDelimiter();
      } else targetInput.value = oldChar + "" + newChar;
    }
  }

  // yyyy-mm-dd || yyyy-dd-mm || mm-dd-yyyy || dd-mm-yyyy || dd-yyyy-mm || mm-yyyy-dd
  function addDelimiter() {
    targetInput.value = targetInput.value + delimiter;
  }

  function format(oldChar, newChar) {
    let l = targetInput.value.length;
    if (pattern[0] == "y") {
      if (l == 4) {
        validateDate();
        addDelimiter();
      }
      if (l == 6) {
        validate(pattern[1], oldChar, newChar);
      }
      if (l == 7) {
        validateDate();
        addDelimiter();
      }
      if (l == 9) {
        validate(pattern[2], oldChar, newChar);
      }
    }
    if (pattern[1] == "y") {
      if (l == 2) {
        validateDate();
        addDelimiter();
      }
      if (l == 1) {
        validate(pattern[0], oldChar, newChar);
      }
      if (l == 7) {
        validateDate();
        addDelimiter();
      }
      if (l == 9) {
        validate(pattern[2], oldChar, newChar);
      }
    }
    if (pattern[2] == "y") {
      if (l == 1) {
        validate(pattern[0], oldChar, newChar);
      }
      if (l == 2) {
        validateDate();
        addDelimiter();
      }
      if (l == 4) {
        validate(pattern[1], oldChar, newChar);
      }
      if (l == 5) {
        validateDate();
        addDelimiter();
      }
    }
  }

  targetInput.addEventListener("input", (e) => {
    targetInput.addEventListener("keydown", (event) => {
      if (event.key == "Backspace") {
        targetInput.value = "";
      }
    });
    let newChar = e.target.value.substr(e.target.value.length - 1, 1),
      oldChar = e.target.value.slice(0, e.target.value.length - 1);
    if (pattern == ["m", "y", "d"]) {
      m = parseInt(targetInput.value.slice(0, 2));
      y = parseInt(targetInput.value.slice(3, 7));
      d = parseInt(targetInput.value.slice(8, 10));
    }
    if (pattern == ["d", "y", "m"]) {
      d = parseInt(targetInput.value.slice(0, 2));
      y = parseInt(targetInput.value.slice(3, 7));
      m = parseInt(targetInput.value.slice(8, 10));
    }
    if (pattern == ["y", "d", "m"]) {
      y = parseInt(targetInput.value.slice(0, 4));
      d = parseInt(targetInput.value.slice(5, 7));
      m = parseInt(targetInput.value.slice(8, 10));
    }
    if (pattern == ["y", "m", "d"]) {
      y = parseInt(targetInput.value.slice(0, 4));
      m = parseInt(targetInput.value.slice(5, 7));
      d = parseInt(targetInput.value.slice(8, 10));
    }
    if (pattern == ["d", "m", "y"]) {
      d = parseInt(targetInput.value.slice(0, 2));
      m = parseInt(targetInput.value.slice(3, 5));
      y = parseInt(targetInput.value.slice(6, 10));
    }
    if (pattern == ["m", "d", "y"]) {
      m = parseInt(targetInput.value.slice(0, 2));
      d = parseInt(targetInput.value.slice(3, 5));
      y = parseInt(targetInput.value.slice(6, 10));
    }
    if (!checkCharacter(newChar)) {
      targetInput.value = targetInput.value.slice(0, e.target.value.length - 1);
    }
    format(oldChar, newChar);
    console.log("d", d, "m", m, "y", y);
  });
};

module.exports = dateFormatter;
/**
 * INPUT
 * delimiter
 * pattern: y-m-d / d-m-y /...
 * validate
 * placeholder
 * max length = 10
 *
 * OUTPUT
 * handle -> calculate value of input = timestamp
 * format when change input
 */
