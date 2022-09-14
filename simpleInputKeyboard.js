const simpleInputKeyboard = (function () {
  // private singleton value which gets initialized only once
  let config;
  let className;
  let inputs;
  let inputNum;
  let isDisabled;
  let mainFlexContClass;
  let englishLetters;
  let bulgarianLetters;
  let lettersClass;
  let darkMode;
  let imgsDir;
  let lettersCaseUPMode;
  let numbersAndSymbols;
  let language;

  function initializeConfiguration(settings = {}) {
    let { clsName = 'keyboard',
      disableInput = false,
      darkTheme = true,
      imagesDir = "./images/",
      classNameOfLetters = "letter-keyboard-",
      lettersUppercase = true,
      lang = 'EN' //currently only english and bulgarian
    } = settings;
    // className = "keyboard";
    className = clsName;
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
    lettersClass = classNameOfLetters;
    darkMode = darkTheme;
    imgsDir = imagesDir;
    lettersCaseUPMode = lettersUppercase;
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
    isDisabled = disableInput;
    language = lang;
  }

  const getInputs = () => document.getElementsByClassName(className);

  function addEventListeners(inputs) {
    Array.from(inputs).forEach((input) => {
      if (!input.hasFocusListener) {
        input.addEventListener("focus", (event) => showKeyBoard(event));
        input.setAttribute('data-mode-uppercase', lettersCaseUPMode ? '1' : '0');
        input.setAttribute('data-mode-lang', language);
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
    if (isDisabled) currentInput.setAttribute('disabled', true);
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
    mainFlexContClass = "keyboard-" + inputNum;
    // keyboardWindow.innerText = 'test' + inputNum;
    keyboardWindow.setAttribute("class", mainFlexContClass);
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
      case "EN":
        addEnglishKeayboard(el, container);
        return;
      case 'ABC':
        turnLetterKeyboard(el, container);
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
    lettersCaseUPMode ? img.setAttribute("src", imgsDir + "lower.png") : img.setAttribute("src", imgsDir + "upper.png");
    img.setAttribute("id", "DOWN-" + container.getAttribute('id'));
    btn.style.background = "none";
    btn.appendChild(img);
    let newImg;

    btn.onclick = () => {
      currentInput.dataset.modeUppercase = currentInput.dataset.modeUppercase === '0' ? '1' : '0';
      if (currentInput.dataset.modeUppercase === '1') {
        transformKeys(container.children, "uppercase");
        newImg = document.getElementById("DOWN-" + container.getAttribute('id'));
        newImg.src = imgsDir + "lower.png";
      } else {
        transformKeys(container.children, "lowercase");
        newImg = document.getElementById("DOWN-" + container.getAttribute('id'));
        newImg.src = imgsDir + "upper.png";
      }
    };
    container.appendChild(btn);
  };

  const transformKeys = (arr, command) => {
    if (!arr.length) return;
    Array.from(arr).forEach((letterBtn, i) => {
      const buttonTextContent = letterBtn?.children[1]?.innerText;
      if (buttonTextContent) {
        letterBtn.children[1].innerText = (command === "uppercase") ? letterBtn.children[1].innerText.toUpperCase() : letterBtn.children[1].innerText.toLowerCase();
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
  const addNumsAndSymbolsBtn = (currentInput, container) => {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "123.png");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => {
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
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "key.png");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => {
      currentInput.dataset.modeLang = 'BG';
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

  const addEnglishKeayboard = (currentInput, container) => {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "key.png");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => {
      currentInput.dataset.modeLang = 'EN';
      container.innerHTML = "";
      englishLetters.forEach((text, i) => {
        addButtonOperation({
          text: text,
          el: currentInput,
          container: container,
          index: i,
          source: englishLetters,
        });
      });
    };
    container.appendChild(btn);
  }

  const turnLetterKeyboard = (currentInput, container) => {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "key.png");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => {
      switch (currentInput.dataset.modeLang) {
        case 'BG':
          container.innerHTML = "";
          //TODO need to extract this in another function
          bulgarianLetters.forEach((text, i) => {
            addButtonOperation({
              text: text,
              el: currentInput,
              container: container,
              index: i,
              source: bulgarianLetters,
            });
          });
          return;
        default:
          container.innerHTML = "";
          englishLetters.forEach((text, i) => {
            addButtonOperation({
              text: text,
              el: currentInput,
              container: container,
              index: i,
              source: englishLetters,
            });
          });
          return;
      }
    }
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
    if (letter && isNaN(letter)) {
      span.innerText = lettersCaseUPMode === true ? letter.toUpperCase() : letter.toLowerCase()
      return;
    }
    span.innerText = letter;
  };

  const destroyKeyboardWindow = (keyboardWindow) => {
    if (keyboardWindow) keyboardWindow.remove();
    let currentKeyboardWindow = document.getElementsByClassName(mainFlexContClass);
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
