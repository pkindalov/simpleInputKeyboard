const simpleInputKeyboard = (function () {
  // private singleton value which gets initialized only once
  let config;
  let className;
  let inputs;
  let inputNum;
  let genClass;

  function initializeConfiguration(settings) {
    className = 'bg-keyboard';
    inputs = [];
    inputNum = 0;
  }

  function getInputs() {
    return document.getElementsByClassName(className);
  }

  function addEventListeners(inputs) {
    Array.from(inputs).forEach(input => {
      if (!input.hasFocusListener) {
        input.addEventListener('focus', (event) => showKeyBoard(event));
        input.hasFocusListener = true;
      }
    });
  }

  function showKeyBoard(event) {
    if (!event || !event.target) {
      console.log('Problem with event');
      return;
    }
    const currentInput = event.target;
    const currentInputCoords = currentInput.getBoundingClientRect();
    const currentInputWidth = currentInput.offsetWidth;
    const currentInputParent = event.target.parentNode;

    //TODO if there is appended div container with the keyboard
    // console.log(currentInputCoords);
    // console.log(currentInputParent.getAttribute('data-hasКeyboard'));
    // console.log(currentInputParent.dataset);
    // console.log(currentInputParent.dataset.hasКeyboard);
    // console.log(currentInput?.nextSibling?.previousSibling?.classList.contains(className));
    //TODO to create a function which will return div container with the keyboard and to append it after the current input

    // if (document.getElementsByClassName(genClass).length) return;
    // if (currentInput.dataset.hasКeyboard) return;
    inputNum++;
    let keyboardWindow = document.createElement('div');
    genClass = 'bg-keyboard-' + inputNum;
    keyboardWindow.innerText = 'test' + inputNum;
    keyboardWindow.setAttribute('class', genClass);
    keyboardWindow.style.backgroundColor = 'green';
    keyboardWindow.style.borderRadius = '5px';
    keyboardWindow.style.width = ((currentInputWidth / 10) - 6.5) + 'rem';
    keyboardWindow.style.position = 'absolute';
    keyboardWindow.style.top = ((currentInputCoords.top + 12) / 10) + 'rem';
    // test.style.left = ((currentInputCoords.left / 10) - 0.3) + 'rem';
    keyboardWindow.style.left = currentInputCoords.left + 'px';
    keyboardWindow.style.zIndex = '99999999999999999999999999';
    currentInput.setAttribute('data-hasКeyboard', true);
    document.body.appendChild(keyboardWindow);

    //TODO to put blur listener, to delete keyboard window
    if (!currentInput.hasBlurListener) {
      currentInput.addEventListener('blur', () => destroyKeyboardWindow(keyboardWindow));
      currentInput.hasBlurListener = true;
    }
    // currentInputParent.insertBefore(test, currentInput.nextSibling);
  }

  const destroyKeyboardWindow = (keyboardWindow) => {
    if (keyboardWindow) keyboardWindow.remove();
    let currentKeyboardWindow = document.getElementsByClassName(genClass);
    if (currentKeyboardWindow.length) currentKeyboardWindow[0].remove();
    // keyboardWindow.setAttribute('data-hasКeyboard', false);
  }
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
    }
  }
})();

// export { simpleInputKeyboard };