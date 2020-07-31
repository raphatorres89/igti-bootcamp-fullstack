window.addEventListener('load', start);

var red = null;
var redInput = null;
var green = null;
var greenInput = null;
var blue = null;
var bluenInput = null;
var frame = null;

function start() {
  initParams();
  initEventListeners();
  changeFrameColor();
}

function initParams() {
  red = document.querySelector('#red');
  redInput = document.querySelector('#red-input');
  redInput.value = red.value;

  green = document.querySelector('#green');
  greenInput = document.querySelector('#green-input');
  greenInput.value = green.value;

  blue = document.querySelector('#blue');
  blueInput = document.querySelector('#blue-input');
  blueInput.value = blue.value;

  frame = document.querySelector('#final-color');
}

function initEventListeners() {
  red.addEventListener('change', function () {
    handleRangeChange(red, redInput);
  });

  green.addEventListener('change', function () {
    handleRangeChange(green, greenInput);
  });

  blue.addEventListener('change', function () {
    handleRangeChange(blue, blueInput);
  });
}

function handleRangeChange(rangeElement, inputElement) {
  inputElement.value = rangeElement.value;
  changeFrameColor();
}

function changeFrameColor() {
  var rgb = 'rgb(' + red.value + ',' + green.value + ',' + blue.value + ')';
  frame.style.backgroundColor = rgb;
}
