const simpleInputKeyboard = (function () {
  // private singleton value which gets initialized only once
  let config;
  let className;
  let inputs;
  let inputNum;
  let genClass;
  let englishLetters;
  let special;
  let lettersClass;

  function initializeConfiguration(settings) {
    className = "bg-keyboard";
    inputs = [];
    inputNum = 0;
    // englishLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    englishLetters = [
      "Q",
      "W",
      "E",
      "R",
      "T",
      "Y",
      "U",
      "I",
      "O",
      "P",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "^",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      "DEL",
      "123",
      "BG",
      "space",
      "return",
    ];
    special = ["space", "enter", "^", "d"];
    lettersClass = "letter";
  }

  function getInputs() {
    return document.getElementsByClassName(className);
  }

  function addEventListeners(inputs) {
    Array.from(inputs).forEach((input) => {
      if (!input.hasFocusListener) {
        input.addEventListener("focus", (event) => showKeyBoard(event));
        input.hasFocusListener = true;
      }
    });
  }

  function showKeyBoard(event) {
    if (!event || !event.target) {
      console.log("Problem with event");
      return;
    }
    const currentInput = event.target;
    inputNum++;
    let keyboardWindow = generateKeyboardWindow(currentInput);
    document.body.appendChild(keyboardWindow);

    //TODO to put blur listener, to delete keyboard window
    if (!currentInput.hasBlurListener) {
      // currentInput.addEventListener('blur', () => destroyKeyboardWindow(keyboardWindow));
      currentInput.hasBlurListener = true;
    }
    // currentInputParent.insertBefore(test, currentInput.nextSibling);
  }

  function generateKeyboardWindow(currentInput) {
    let keyboardWindow = document.createElement("div");
    // let keyboardWindowWidth = currentInput.offsetWidth / 10 - 6.5 + "rem";
    let keyboardWindowWidth = "16.2rem";
    genClass = "bg-keyboard-" + inputNum;
    // keyboardWindow.innerText = 'test' + inputNum;
    keyboardWindow.setAttribute("class", genClass);
    keyboardWindow.style.backgroundColor = "green";
    keyboardWindow.style.borderRadius = "5px";
    keyboardWindow.style.display = "flex";
    keyboardWindow.style.width = keyboardWindowWidth;
    keyboardWindow.style.position = "absolute";
    keyboardWindow.style.textAlign = "center";
    keyboardWindow.style.top =
      (currentInput.getBoundingClientRect().top + 12) / 10 + "rem";
    keyboardWindow.style.left =
      currentInput.getBoundingClientRect().left + "px";
    keyboardWindow.style.zIndex = "99999999999999999999999999";
    let keysContainer = generateKeyboard(keyboardWindowWidth, currentInput);
    keyboardWindow.appendChild(keysContainer);
    return keyboardWindow;
  }

  function generateKeyboard(width, currentInput) {
    let container = document.createElement("div");
    let btn = document.createElement("button");
    container.style.width = width;
    // container.style.display = 'flex';
    // console.log(currentInput);
    englishLetters.forEach((letter) => {
      btn.innerText = letter;
      btn.setAttribute("class", lettersClass);
      container.appendChild(btn);
      btn.onclick = () => {
        // console.log(currentInput);
        currentInput.value += letter;
      };
      btn = document.createElement("button");
    });
    return container;
  }

  const destroyKeyboardWindow = (keyboardWindow) => {
    if (keyboardWindow) keyboardWindow.remove();
    let currentKeyboardWindow = document.getElementsByClassName(genClass);
    if (currentKeyboardWindow.length) currentKeyboardWindow[0].remove();
  };
  // we export the centralized method for retrieving the singleton value
  return {
    setConfig: function (settings) {
      // we initialize the singleton value only once
      if (!config) config = new initializeConfiguration(settings);
      // and return the same config value wherever it is asked for
      return config;
    },
    turnOn: function (turnOn) {
      if (!turnOn) return;
      inputs = getInputs();
      if (!inputs.length) return;
      addEventListeners(inputs);
    },
  };
})();

// export { simpleInputKeyboard };
