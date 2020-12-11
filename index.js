// import {risingShapes} from './floating-shibes'

let shibeImgs = []

function getShibeImages() {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const url = 'http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true'
  return fetch(proxyUrl + url, {
    method: "GET",
    headers: {
      "content-type": 'application/json'
    }
  })
  .then(res => 
    (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
  )
  .catch(error => alert("Unable to retrieve images"))
}

function displayImages() {
  // console.log('itran')
  // risingShapes(50)
  getShibeImages()
    .then(images => risingShapes(images)
    )

  // risingShapes(50)
}

function makeImgWrappers(shibesArray) {
  // const options = {
  //   height: window.screen.width,
  //   width: this.height

  // }
  let screenWith = screen.width
  // ${Math.floor(Math.random() * screenWith)

  const style = `
    "margin-left: 100px;
    animation: goup 5s infinite;
    height: 50px;
    width= 50px;"`
  let shibes = ""
  for(let i = 0; i < shibesArray.length; i++) {
    shibes += `<div class="shibe-wrapper" style=${style}><img class="shibe-img" src=${shibesArray[i]}></div>`
  }
  $(".results-shibes").html(shibes)
}
$(displayImages())

//need three different shapes
//need to randomly make them appear on horizontal plain
//need to make them move up the dom
//need to make them hit eachother and either stick or rotate and keep falling


//need to make css of animation, then apply the three different styles, then once it hits, apply the other class to it.

// 
function recthit(rectone, recttwo){
    
  var r1 = $(rectone);
  var r2 = $(recttwo);
  
  var r1x = r1.offset().left; // 10
  var r1w = r1.outerWidth(); // 50
  var r1y = r1.offset().top; // 20
  var r1h = r1.outerHeight(); // 50
  
  var r2x = r2.offset().left; // 70
  var r2w = r2.outerWidth(); // 50
  var r2y = r2.offset().top; // 20
  var r2h = r2.outerHeight(); // 50

  // console.log('circle r1', r1x, r1y)
  // console.log('square r2', r2x, r2y)
  
  if(r1y+r1h < r2y ||
    r1y > r2y+r2h ||
    r1x > r2x+r2w ||
    r1x+r1w < r2x) {
      return false;
  }else{
      return true;   
  }
  
}//end function 

function trianglehit(rectone, recttwo){
    
  var r1 = $(rectone);
  var r2 = $(recttwo);
  
  var r1x = r1.offset().left; // 10
  var r1w = r1.width(); // 50
  var r1y = r1.offset().top; // 20
  var r1h = r1.height(); // 50
  
  var r2x = r2.offset().left; // 70
  var r2w = r2.width(); // 50
  var r2y = r2.offset().top; // 20
  var r2h = r2.height(); // 50

  // console.log('circle r1', r1x, r1y)
  // console.log('square r2', r2x, r2y)
  
  if(r1y+r1h < r2y ||
    r1y > r2y+r2h ||
    r1x > r2x+r2w ||
    r1x+r1w < r2x) {
      return false;
  }else{
      return true;   
  }
  
}
//end function 
// $(document).mousemove(function(e) {

// $('.circle').css({
//   top: e.pageY,
//   left: e.pageX
// });

//one to many hit detect
// $('.square').each(function(){
//   if(recthit('.circle',$(this))){
//     $(this).css({backgroundColor:'yellow'});
//   } else {
//     $(this).css({backgroundColor:'black'});
//   }
// });// end each
// $('.triangle').each(function(){
//   if(trianglehit('.circle',$(this))){
//     $(this).css({backgroundColor:'yellow'});
//   } else {
//     $(this).css({backgroundColor:'black'});
//   }
// });// end each


// });
 // end mousmove

function risingShapes(shibeImgs) {
  let shibes = []

  let browserWidth
  let browserHeight

  let timing = 0

  let numberOfShapes = shibeImgs.length

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
      if(document.readyState === "complete") {
        setTimeout(generateCircle, 2000)
        // window.addEventListener("DOMContentLoaded", generateCircle, true);
      }
      window.addEventListener("resize", setResetFlag, false)
    }
  }
  setup()

  function Circle(element, speed, xPos, yPos, delay, image) {
    // set initial snowflake properties
    function returnColor(){
      const colors = ["green", "blue", "orange"]
      return colors[Math.floor(Math.random() * 3)]
    }

    function returnRadius() {
      const radius = ["50%", "0px"]
      return radius[Math.floor(Math.random() * 2)]
    }

    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = 1;
    this.delay = delay
    this.image = image
    this.height = Math.floor(Math.random() * 100) + "px"
    this.element.style.backgroundImage = `url("${this.image}")`
    this.element.style.backgroundSize = this.height
    this.element.style.borderRadius = returnRadius()
    this.element.backgroundPosition = "center"
    this.element.style.animationDelay = this.delay
    this.element.style.height = this.height
    this.element.style.width = this.height
    this.element.style.border = `5px solid ${returnColor()}`

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
      let shibeImage = shibeImgs[i]

      // create our Snowflake object
      var circleObject = new Circle(circleClone,
        speed,
        initialXPos,
        initialYPos,
        initialDelay,
        shibeImage
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
