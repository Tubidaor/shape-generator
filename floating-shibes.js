export function risingShapes(arrShibes) {
  let shibes = []

  let browserWidth
  let browserHeight

  let timing = 0

  let numberOfShapes = arrShibes

  let resetPosition = false

  var enableAnimations = false
  var reduceMotionQuery = matchMedia("(prefers-reduced-motion)")

  function setAccessibilityState() {
    if (reduceMotionQuery.matches) {
      enableAnimations = false;
    } else { 
      enableAnimations = true;
    }
  }
  setAccessibilityState()
  reduceMotionQuery.addListener(setAccessibilityState)

  function setup() {
    if (enableAnimations) {
      window.addEventListener("DOMContentLoaded", generateCircle, false);
      window.addEventListener("resize", setResetFlag, false)
    }
  }
  setup()

  function Circle(element, speed, xPos, yPos, delay) {
    // set initial snowflake properties
    const colors = ["green", "blue", "orange"]
    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = 1;
    this.delay = delay
    // this.image = image
    // this.element.style.backgroundImage = `"url(${this.image})"`
    this.element.style.animationDelay = this.delay
    this.element.style.height = Math.floor(Math.random() * 100) + "px"
    this.element.style.width = this.element.style.height
    this.element.style.border = `10px solid ${colors[Math.floor(Math.random() * 4)]}`

    // declare variables used for snowflake's motion
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;

  }

  Circle.prototype.update = function () {
    // using some trigonometry to determine our x and y position
    this.counter += this.speed / 5000;
    // this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
    
    this.yPos -= Math.sin(this.counter) / 40 + this.speed / 30;
    // this.yPos -= Math.sin(this.counter)
    // this.scale = .5 + Math.abs(10 * Math.cos(this.counter) / 20);

    // setting our snowflake's position
    setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element);

    // if snowflake goes below the browser window, move it back to the top
    if (this.yPos < -2000) {
      this.yPos = browserHeight;
    }
    
  }

  function setTransform(xPos, yPos, scale, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  }

  function generateCircle() {

    // get our snowflake element from the DOM and store it
    var originalCircle = document.querySelector(".circle");

    // access our snowflake element's parent container
    var circleContainer = originalCircle.parentNode;
    circleContainer.style.display = "block";

    // get our browser's size
    browserWidth = document.documentElement.clientWidth;
    browserHeight = document.documentElement.clientHeight;
    console.log("height", browserHeight)

    // create each individual snowflake
    for (var i = 0; i < numberOfShapes; i++) {
      timing = timing + 1

      // clone our original snowflake and add it to snowflakeContainer
      var circleClone = originalCircle.cloneNode(true);
      circleContainer.appendChild(circleClone);

      // set our snowflake's initial position and related properties
      var initialXPos = getPosition(50, browserWidth);
      // var initialYPos = getPosition(50, browserHeight);
      var initialYPos = 647
      // var speed = 5 + Math.random() * 40;
      let speed = 100
      let initialDelay = `${timing}s`
      console.log(timing)
      // let shibeImage = shibes[i]

      // create our Snowflake object
      var circleObject = new Circle(circleClone,
        speed,
        initialXPos,
        initialYPos,
        initialDelay,
      );
      shibes.push(circleObject);
    }

    circleContainer.removeChild(originalCircle);

    moveCircles();
  }

  function moveCircles() {

    if (enableAnimations) {
      for (var i = 0; i < shibes.length; i++) {
        var circle = shibes[i];
        circle.update();
      }      
    }

    // Reset the position of all the snowflakes to a new value
    if (resetPosition) {
      browserWidth = document.documentElement.clientWidth;
      browserHeight = document.documentElement.clientHeight;

      for (var i = 0; i < shibes.length; i++) {
        var circle = shibes[i];

        circle.xPos = getPosition(50, browserWidth);
        circle.yPos = getPosition(50, browserHeight);
      }

      resetPosition = false;
    }

    requestAnimationFrame(moveCircles);
  }
  function getPosition(offset, size) {
    const position = Math.round(-1 * offset + Math.random() * (size + 2 * offset))
    // console.log(position)
    return position;
  }

  //
  // Trigger a reset of all the snowflakes' positions
  //
  function setResetFlag(e) {
    resetPosition = true;
  }
}

// $(risingShapes(50))


