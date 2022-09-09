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
      "123",
      "BG",
      "SPACE",
      "return",
    ];
    special = ["space", "enter", "^", "d"];
    lettersClass = "letter";
    darkMode = true;
    imgsDir = './images/';
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
    let left = 2;
    // container.style.width = width;
    // container.style.display = 'flex';
    // console.log(currentInput);
    englishLetters.forEach((letter, i) => {

      if (letter === 'DEL') {
        img.setAttribute('src', imgsDir + 'remove.png');
        btn.style.background = 'none';
        btn.appendChild(img);
        container.appendChild(btn);
        btn = document.createElement("button");
        img = document.createElement("img");
        return;
      }

      if (letter === 'DOWN') {
        img.setAttribute('src', imgsDir + 'lower.png');
        btn.style.background = 'none';
        btn.appendChild(img);
        btn.onclick = () => {
          let letterDivs = document.getElementsByClassName(lettersClass);
          Array.from(letterDivs).forEach((div, i) => {
            div.children[1].innerText = div.children[1].innerText.toLowerCase()
            englishLetters[i] = englishLetters[i].toLowerCase();
          });
          img.src = imgsDir + 'upper.png';

        };
        container.appendChild(btn);
        btn = document.createElement("button");
        img = document.createElement("img");
        return;
      }

      if (letter === 'SPACE') {
        img.setAttribute('src', imgsDir + 'space.png');
        btn.style.background = 'none';
        btn.appendChild(img);
        container.appendChild(btn);
        btn = document.createElement("button");
        img = document.createElement("img");
        return;
      }


      // btn.innerText = letter;
      img.setAttribute('src', imgsDir + 'key.png');
      img.setAttribute('alt', 'letter ' + letter);
      img.style.zIndex = -1;
      btn.setAttribute("class", lettersClass);
      btn.style.background = 'none';
      btn.style.textAlign = 'center';
      btn.style.position = 'relative';
      span.innerText = letter;
      span.style.position = 'absolute';
      span.style.color = 'white';
      span.style.top = '30%';
      span.style.left = '40%';
      span.style.fontSize = '1rem';
      span.style.zIndex = 2;


      btn.appendChild(img);
      btn.appendChild(span);
      container.appendChild(btn);
      btn.onclick = () => {
        // currentInput.value += letter;
        currentInput.value += englishLetters[i];
      };
      btn = document.createElement("button");
      img = document.createElement("img");
      span = document.createElement("span");
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
