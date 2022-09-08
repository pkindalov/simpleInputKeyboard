const simpleInputKeyboard = (function () {
  // private singleton value which gets initialized only once
  let config;
  let className;
  let inputs;
  let inputNum;

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
    console.log(currentInputCoords);
    // console.log(currentInputParent.getAttribute('data-hasКeyboard'));
    // console.log(currentInputParent.dataset);
    // console.log(currentInputParent.dataset.hasКeyboard);
    // console.log(currentInput?.nextSibling?.previousSibling?.classList.contains(className));
    //TODO to create a function which will return div container with the keyboard and to append it after the current input

    // if (document.getElementsByClassName(genClass).length) return;
    if (currentInput.dataset.hasКeyboard) return;
    inputNum++;
    let test = document.createElement('div');
    let genClass = 'bg-keyboard-' + inputNum;
    test.innerText = 'test' + inputNum;
    test.setAttribute('class', genClass);
    test.style.backgroundColor = 'green';
    test.style.borderRadius = '5px';
    test.style.width = ((currentInputWidth / 10) - 6.5) + 'rem';
    test.style.position = 'absolute';
    test.style.top = ((currentInputCoords.top + 12) / 10) + 'rem';
    // test.style.left = ((currentInputCoords.left / 10) - 0.3) + 'rem';
    test.style.left = currentInputCoords.left + 'px';
    test.style.zIndex = '99999999999999999999999999';
    currentInput.setAttribute('data-hasКeyboard', true);
    document.body.appendChild(test);

    //TODO to put blur listener, to delete keyboard window

    // currentInputParent.insertBefore(test, currentInput.nextSibling);
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