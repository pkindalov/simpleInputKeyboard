const simpleInputKeyboard = (function () {
  // private singleton value which gets initialized only once
  let config;
  let className;
  let inputs;
  let inputNum;
  let genClass;
  let englishLetters;
  let bulgarianLetters;
  let isBgMode;
  let lettersClass;
  let darkMode;
  let imgsDir;
  let lettersCaseUPMode;
  let numbersAndSymbols;

  function initializeConfiguration(settings) {
    className = "keyboard";
    inputs = [];
    inputNum = 0;
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
      "DOWN",
      "Z",
      "X",
      "C",
      "V",
      "B",
      "N",
      "M",
      "DEL",
      "?123",
      "BG",
      "SPACE",
      "RETURN",
    ];
    bulgarianLetters = [
      "Я",
      "В",
      "Е",
      "Р",
      "Т",
      "Ъ",
      "У",
      "И",
      "О",
      "П",
      "Ч",
      "А",
      "С",
      "Д",
      "Ф",
      "Г",
      "Х",
      "Й",
      "К",
      "Л",
      "Ш",
      "Щ",
      "DOWN",
      "З",
      "Ь",
      "Ц",
      "Ж",
      "Б",
      "Н",
      "М",
      "Ю",
      "DEL",
      "?123",
      "EN",
      "SPACE",
      ".",
      "RETURN",
    ];
    isBgMode = false;
    lettersClass = "letter-keyboard-";
    darkMode = true;
    imgsDir = "./images/";
    lettersCaseUPMode = true;
    numbersAndSymbols = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "@",
      "#",
      "$",
      "_",
      "&",
      "-",
      "+",
      "(",
      ")",
      "/",
      "=\\<",
      "*",
      '"',
      "'",
      ":",
      ";",
      "!",
      "?",
      "DEL",
      "ABC",
      ",",
      "SPACE",
      ".",
      "RETURN",
    ];
  }

  const getInputs = () => document.getElementsByClassName(className);

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

    //to put blur listener, to delete keyboard window
    if (!currentInput.hasBlurListener) {
      // currentInput.addEventListener('blur', () => destroyKeyboardWindow(keyboardWindow));
      currentInput.hasBlurListener = true;
    }
    // currentInputParent.insertBefore(test, currentInput.nextSibling);
  }

  //generate the container for the letters
  function generateKeyboardWindow(currentInput) {
    let keyboardWindow = document.createElement("div");
    // let keyboardWindowWidth = currentInput.offsetWidth / 10 - 6.5 + "rem";
    let keyboardWindowWidth = "16.2rem";
    genClass = "keyboard-" + inputNum;
    // keyboardWindow.innerText = 'test' + inputNum;
    keyboardWindow.setAttribute("class", genClass);
    keyboardWindow.style.backgroundColor = "black";
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

  //generate key buttons in container and return the div with the keys
  function generateKeyboard(width, currentInput) {
    let container = document.createElement("div");
    container.setAttribute('id', 'keys-cont-keyboard-' + inputNum);
    englishLetters.forEach((text, i) => {
      addButtonOperation({
        text: text,
        el: currentInput,
        container: container,
        index: i,
        source: englishLetters,
      });
    });
    return container;
  }

  const addButtonOperation = (data) => {
    const { text, el, container, index, source } = data;
    switch (text) {
      case "DEL":
        addRemoveBtn(el, container);
        return;
      case "DOWN":
        addUpDownBtn(el, container);
        return;
      case "SPACE":
        addSpaceBtn(el, container);
        return;
      case "?123":
        addNumsAndSymbolsBtn(el, container);
        return;
      case "BG":
        addBulgarianKeayboard(el, container);
        return;
      case "RETURN":
        addReturnBtn(el, container);
        return;
      default:
        addLetterBtn({
          currentInput: el,
          container: container,
          letter: text,
        });
    }
  };

  //add button for removing the last entered char by the user
  const addRemoveBtn = (currentInput, container) => {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "remove.png");
    img.setAttribute("id", "DEL");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => {
      if (!currentInput.value) return;
      const newValue = currentInput.value.slice(0, -1);
      currentInput.value = newValue;
    };
    container.appendChild(btn);
  };

  //add button with the arrow icon to change letters in upper or lower case
  const addUpDownBtn = (currentInput, container) => {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "lower.png");
    img.setAttribute("id", "DOWN-" + container.getAttribute('id'));
    btn.style.background = "none";
    btn.setAttribute('data-is-upper', '0');
    btn.appendChild(img);
    let newImg;

    btn.onclick = () => {
      btn.dataset.isUpper = btn.dataset.isUpper === '0' ? '1' : '0';
      if (btn.dataset.isUpper === '1') {
        makeKeysLowerCase(container.children);
        newImg = document.getElementById("DOWN-" + container.getAttribute('id'));
        newImg.src = imgsDir + "upper.png";
      } else {
        makeKeysUpperCase(container.children);
        newImg = document.getElementById("DOWN-" + container.getAttribute('id'));
        newImg.src = imgsDir + "lower.png";
      }
    };
    container.appendChild(btn);
  };

  const makeKeysLowerCase = (arr) => {
    if (!arr.length) return;
    Array.from(arr).forEach((letterBtn, i) => {
      const buttonTextContent = letterBtn?.children[1]?.innerText;
      if (buttonTextContent) {
        letterBtn.children[1].innerText = letterBtn.children[1].innerText.toLowerCase();
      }
    });
  }

  const makeKeysUpperCase = (arr) => {
    if (!arr.length) return;
    Array.from(arr).forEach((letterBtn, i) => {
      const buttonTextContent = letterBtn?.children[1]?.innerText;
      if (buttonTextContent) {
        letterBtn.children[1].innerText = letterBtn.children[1].innerText.toUpperCase();
      }
    });
  }

  //add space button on the keyboard
  const addSpaceBtn = (currentInput, container) => {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "space.png");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => (currentInput.value += " ");
    container.appendChild(btn);
  };

  //add enter/return btn to the keyboard
  const addReturnBtn = (currentInput, container) => {
    const btn = document.createElement("button");
    const img = document.createElement("img");
    img.setAttribute("src", imgsDir + "returnBlue.png");
    btn.style.background = "none";
    btn.appendChild(img);
    // btn.onclick = () => (currentInput.value += "\n");
    btn.onclick = () => container.remove();
    container.appendChild(btn);
  };

  //add ?123 button to keyboard. On click it must show numbers and special chars
  //on the keyboard
  //TODO not finished yet
  const addNumsAndSymbolsBtn = (currentInput, container) => {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "123.png");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => {
      // let container = document.getElementsByClassName(genClass);
      // if (container.length) container[0].innerHTML = "";
      container.innerHTML = "";
      numbersAndSymbols.forEach((text, i) => {
        addButtonOperation({
          text: text,
          el: currentInput,
          container: container,
          index: i,
          source: numbersAndSymbols,
        });
      });
    };
    container.appendChild(btn);
  };

  const addBulgarianKeayboard = (currentInput, container) => {
    let btn = document.createElement("button");
    // btn.innerText = 'BG';
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "key.png");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => {
      isBgMode = true;
      // let container = document.getElementsByClassName(genClass);
      // if (container.length) container[0].innerHTML = "";
      container.innerHTML = "";
      bulgarianLetters.forEach((text, i) => {
        addButtonOperation({
          text: text,
          el: currentInput,
          container: container,
          index: i,
          source: bulgarianLetters,
        });
      });
    };
    container.appendChild(btn);
  }

  //add letter button to keyboard
  const addLetterBtn = (data) => {
    const { currentInput, container, letter } = data;
    let btn = document.createElement("button");
    let img = document.createElement("img");
    let span = document.createElement("span");
    img.setAttribute("src", imgsDir + "key.png");
    img.setAttribute("alt", "letter-" + letter);
    img.style.zIndex = -1;
    btn.setAttribute("class", lettersClass + inputNum);
    btn.style.background = "none";
    btn.style.textAlign = "center";
    btn.style.position = "relative";
    span.innerText = letter;
    span.style.position = "absolute";
    span.style.color = "white";
    span.style.top = "30%";
    span.style.left = "40%";
    span.style.fontSize = "1rem";
    span.style.zIndex = 2;

    btn.appendChild(img);
    btn.appendChild(span);
    container.appendChild(btn);
    btn.onclick = () => {
      currentInput.value += btn.innerText;
    };
  };

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
