const simpleInputKeyboard = (function () {
  // private singleton value which gets initialized only once
  let config;
  let className;
  let inputs;

  function initializeConfiguration(settings) {
    className = 'bg-keyboard';
    inputs = [];
  }

  function getInputs() {
    return document.getElementsByClassName(className);
  }

  function addEventListeners(inputs) {
    Array.from(inputs).forEach(input => {
      if (!input.hasListener) {
        input.addEventListener('focus', (event) => showKeyBoard(event));
      }
    });
  }

  function showKeyBoard(event) {
    console.log(event);
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