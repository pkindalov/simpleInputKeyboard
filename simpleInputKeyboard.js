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
  let darkMode;
  let imgsDir;
  let lettersCaseUPMode;
  let numbersAndSymbols;

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
    special = ["space", "enter", "^", "d"];
    lettersClass = "letter";
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

  function generateKeyboard(width, currentInput) {
    let container = document.createElement("div");
    let btn = document.createElement("button");
    let img = document.createElement("img");
    let span = document.createElement("span");

    englishLetters.forEach((letter, i) => {
      if (letter.toLowerCase() === "DEL".toLowerCase()) {
        addRemoveBtn(currentInput, container);
        return;
      }

      if (letter === "DOWN") {
        addUpDownBtn(currentInput, container);
        return;
      }

      if (letter === "SPACE") {
        addSpaceBtn(currentInput, container);
        return;
      }

      if (letter === "?123") {
        addNumsAndSymbolsBtn(currentInput, container);
        return;
      }

      addLetterBtn({
        currentInput: currentInput,
        container: container,
        letter: letter,
        letterIndex: i,
      });
    });
    return container;
  }

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
    let btn = document.createElement("btn");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "lower.png");
    img.setAttribute("id", "DOWN");
    btn.style.background = "none";
    btn.appendChild(img);
    let newImg;
    btn.onclick = () => {
      let letterDivs = document.getElementsByClassName(lettersClass);
      lettersCaseUPMode = !lettersCaseUPMode;
      if (lettersCaseUPMode) {
        Array.from(letterDivs).forEach((div, i) => {
          div.children[1].innerText = div.children[1].innerText.toUpperCase();
          englishLetters[i] = englishLetters[i].toUpperCase();
        });
        newImg = document.getElementById("DOWN");
        newImg.src = imgsDir + "lower.png";
      } else {
        Array.from(letterDivs).forEach((div, i) => {
          div.children[1].innerText = div.children[1].innerText.toLowerCase();
          englishLetters[i] = englishLetters[i].toLowerCase();
          newImg = document.getElementById("DOWN");
          newImg.src = imgsDir + "upper.png";
        });
      }
    };
    container.appendChild(btn);
  };

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

  //add ?123 button to keyboard. On click it must show numbers and special chars
  //on the keyboard
  //TODO not finishet yet
  const addNumsAndSymbolsBtn = (currentInput, container) => {
    let btn = document.createElement("button");
    let img = document.createElement("img");
    img.setAttribute("src", imgsDir + "123.png");
    btn.style.background = "none";
    btn.appendChild(img);
    btn.onclick = () => {
      let container = document.getElementsByClassName(genClass);
      if (container.length) container[0].innerHTML = "";
      let btn = document.createElement("button");
      btn.innerText = "test";
      btn.onclick = () => alert("test");
      container[0].append(btn);
      console.log(container);
    };
    container.appendChild(btn);
  };

  //add letter button to keyboard
  const addLetterBtn = (data) => {
    const { currentInput, container, letter, letterIndex } = data;
    let btn = document.createElement("button");
    let img = document.createElement("img");
    let span = document.createElement("span");
    img.setAttribute("src", imgsDir + "key.png");
    img.setAttribute("alt", "letter " + letter);
    img.style.zIndex = -1;
    btn.setAttribute("class", lettersClass);
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
      currentInput.value += englishLetters[letterIndex];
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
