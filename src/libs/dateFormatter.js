const dateFormatter = (options) => {
  const delimiter = options.delimiter;
  const pattern = options.pattern;
  const id = options.element;

  // let d = 0,
  //   m = 0,
  //   y = 0;

  const libCharacter = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const targetInput = document.getElementById(`${id}`);

  if (targetInput) {
    targetInput.maxLength = 10;
    targetInput.setAttribute("type", "tel");

    function addPlaceHolder(type) {
      if (type == "y") return "YYYY";
      if (type == "d") return "DD";
      if (type == "m") return "MM";
    }
    let plc = "";
    pattern.forEach((type) => {
      plc = plc + addPlaceHolder(type) + delimiter;
    });
    targetInput.placeholder = plc;

    function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkCharacter(character) {
      return libCharacter.some((c) => c == character);
    }

    function validate(type, oldChar, newChar) {
      if (type == "d") {
        if (3 < parseInt(newChar) && parseInt(newChar) < 10) {
          targetInput.value = oldChar + "0" + newChar;
          if (targetInput.value.length < 9) addDelimiter();
        } else targetInput.value = oldChar + "" + newChar;
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
          addDelimiter();
        }
        if (l == 6) {
          validate(pattern[1], oldChar, newChar);
        }
        if (l == 7) {
          addDelimiter();
        }
        if (l == 9) {
          validate(pattern[2], oldChar, newChar);
        }
      }
      if (pattern[1] == "y") {
        if (l == 2) {
          addDelimiter();
        }
        if (l == 1) {
          validate(pattern[0], oldChar, newChar);
        }
        if (l == 7) {
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
          addDelimiter();
        }
        if (l == 4) {
          validate(pattern[1], oldChar, newChar);
        }
        if (l == 5) {
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
      if (!checkCharacter(newChar)) {
        targetInput.value = targetInput.value.slice(
          0,
          e.target.value.length - 1
        );
      }
      format(oldChar, newChar);
    });
  }
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
