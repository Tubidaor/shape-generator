// import {risingShapes} from './floating-shibes'

let shibeImgs = ["http://cdn.shibe.online/shibes/0bd5008f54215793a97a336571dd326fca5f2306.jpg","http://cdn.shibe.online/shibes/c1af70ecb3747c63ae91643ac37daa935c0665d6.jpg","http://cdn.shibe.online/shibes/593d4ea7d4a4763b380027c6badf2bd1bd2ac4b1.jpg","http://cdn.shibe.online/shibes/170806f7db8df79f15ff3df8d166cdb388a8961a.jpg","http://cdn.shibe.online/shibes/e0d907908da8db9ccf281ed0f3dee80ecadab810.jpg","http://cdn.shibe.online/shibes/c19ce3cd5be69e5d965d6b9c07c91615eb5d3bf2.jpg","http://cdn.shibe.online/shibes/27847ef23c5679eb4891d06badc890cf59e07b65.jpg","http://cdn.shibe.online/shibes/515ad674aa5e540f8ed8cb63c0b2ead55a032fa8.jpg","http://cdn.shibe.online/shibes/c5699177f0fc8206974af54aab13234e962aeeff.jpg","http://cdn.shibe.online/shibes/2d3f264d5dc87bdbc620fd5a7476b61162b74e2f.jpg","http://cdn.shibe.online/shibes/0bd5008f54215793a97a336571dd326fca5f2306.jpg","http://cdn.shibe.online/shibes/c1af70ecb3747c63ae91643ac37daa935c0665d6.jpg","http://cdn.shibe.online/shibes/593d4ea7d4a4763b380027c6badf2bd1bd2ac4b1.jpg","http://cdn.shibe.online/shibes/170806f7db8df79f15ff3df8d166cdb388a8961a.jpg","http://cdn.shibe.online/shibes/e0d907908da8db9ccf281ed0f3dee80ecadab810.jpg","http://cdn.shibe.online/shibes/c19ce3cd5be69e5d965d6b9c07c91615eb5d3bf2.jpg","http://cdn.shibe.online/shibes/27847ef23c5679eb4891d06badc890cf59e07b65.jpg","http://cdn.shibe.online/shibes/515ad674aa5e540f8ed8cb63c0b2ead55a032fa8.jpg","http://cdn.shibe.online/shibes/c5699177f0fc8206974af54aab13234e962aeeff.jpg","http://cdn.shibe.online/shibes/2d3f264d5dc87bdbc620fd5a7476b61162b74e2f.jpg","http://cdn.shibe.online/shibes/0bd5008f54215793a97a336571dd326fca5f2306.jpg","http://cdn.shibe.online/shibes/c1af70ecb3747c63ae91643ac37daa935c0665d6.jpg","http://cdn.shibe.online/shibes/593d4ea7d4a4763b380027c6badf2bd1bd2ac4b1.jpg","http://cdn.shibe.online/shibes/170806f7db8df79f15ff3df8d166cdb388a8961a.jpg","http://cdn.shibe.online/shibes/e0d907908da8db9ccf281ed0f3dee80ecadab810.jpg","http://cdn.shibe.online/shibes/c19ce3cd5be69e5d965d6b9c07c91615eb5d3bf2.jpg","http://cdn.shibe.online/shibes/27847ef23c5679eb4891d06badc890cf59e07b65.jpg","http://cdn.shibe.online/shibes/515ad674aa5e540f8ed8cb63c0b2ead55a032fa8.jpg","http://cdn.shibe.online/shibes/c5699177f0fc8206974af54aab13234e962aeeff.jpg","http://cdn.shibe.online/shibes/2d3f264d5dc87bdbc620fd5a7476b61162b74e2f.jpg"]

function getShibeImages() {
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const proxyUrl = "http://www.whateverorigin.org/get?url="
  const url = 'http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=false'
  return fetch(proxyUrl +  encodeURIComponent(url), {
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
  risingShapes(shibeImgs)
  // getShibeImages()
  //   .then(images => risingShapes(images)
  //   )

  // risingShapes(shibeImgs)
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
$.fn.overlaps = function(obj) {
  var elems = [];
  this.each(function() {
      var bounds = $(this).offset();
      bounds.right = bounds.left + $(this).outerWidth();
      bounds.bottom = bounds.top + $(this).outerHeight();

      var compare = $(obj).offset();
      compare.right = compare.left + $(obj).outerWidth();
      compare.bottom = compare.top + $(obj).outerHeight();

      var isOver = (!(compare.right < bounds.left ||
          compare.left > bounds.right ||
          compare.bottom < bounds.top ||
          compare.top > bounds.bottom));

      if (isOver) {elems.push(this);}
  });

  elems.join('');
  return elems;
};

// 
// function recthit(rectone, recttwo){
    
//   var r1 = $(rectone);
//   var r2 = $(recttwo);
  
//   var r1x = r1.offset().left; // 10
//   var r1w = r1.outerWidth(); // 50
//   var r1y = r1.offset().top; // 20
//   var r1h = r1.outerHeight(); // 50
  
//   var r2x = r2.offset().left; // 70
//   var r2w = r2.outerWidth(); // 50
//   var r2y = r2.offset().top; // 20
//   var r2h = r2.outerHeight(); // 50

//   // console.log('circle r1', r1x, r1y)
//   // console.log('square r2', r2x, r2y)
  
//   if(r1y+r1h < r2y ||
//     r1y > r2y+r2h ||
//     r1x > r2x+r2w ||
//     r1x+r1w < r2x) {
//       return false;
//   }else{
//       return true;   
//   }
  
// }//end function 

// function trianglehit(){
    
//   var r1 = this.element;
//   var r2 = $("circle-square");
  
//   var r1x = r1.offset().left; // 10
//   var r1w = r1.width(); // 50
//   var r1y = r1.offset().top; // 20
//   var r1h = r1.height(); // 50
  
//   var r2x = r2.offset().left; // 70
//   var r2w = r2.width(); // 50
//   var r2y = r2.offset().top; // 20
//   var r2h = r2.height(); // 50

//   // console.log('circle r1', r1x, r1y)
//   // console.log('square r2', r2x, r2y)
  
//   if(r1y+r1h < r2y ||
//     r1y > r2y+r2h ||
//     r1x > r2x+r2w ||
//     r1x+r1w < r2x) {
//       return false;
//   }else{
//       return true;   
//   }
  
// }

// function rotate(e) {

// $('.circle-square').css({
//   top: e.pageY,
//   left: e.pageX
// });

// const element = this.element

// element.each(function(){
//   if(recthit('.circle-square',element){
//     $(this).css({backgroundColor:'yellow'});
//   } else {
//     $(this).css({backgroundColor:'black'});
//   }
// });// end each
// $('.triangle').each(function(){
//   if(trianglehit('.circle-square',$(this))){
//     $(this).css({backgroundColor:'yellow'});
//   } else {
//     $(this).css({backgroundColor:'black'});
//   }
// });// end each
// }


// });
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

  let browserWidth = document.documentElement.clientWidth;
  let  browserHeight = document.documentElement.clientHeight;

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
      // if(document.readyState === "complete") {
      //   console.log('ready')
      //   setTimeout(generateCircle, 5000)
        window.addEventListener("DOMContentLoaded", generateShapes, true);
        // window.addEventListener("DOMContentLoaded", generateTriangle, true);
      // }
      window.addEventListener("resize", setResetFlag, false)
    }
  }
  setup()

  function Circle(element, speed, xPos, yPos, delay, image, startingPos) {
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
    this.startingPos = startingPos;
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
  function Triangle(element, speed, xPos, yPos, delay, image, startingPos) {
    // set initial snowflake properties
    function returnColor(){
      const colors = ["green", "blue", "orange"]
      return colors[Math.floor(Math.random() * 3)]
    }

    // function returnRadius() {
    //   const radius = ["50%", "0px"]
    //   return radius[Math.floor(Math.random() * 2)]
    // }

    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.startingPos = startingPos
    this.scale = 1;
    this.delay = delay
    this.image = image
    this.height = Math.floor(Math.random() * 100) + "px"
    // this.element.style.backgroundImage = `url("${this.image}")`
    // this.element.style.backgroundSize = this.height
    // this.element.style.borderRadius = returnRadius()
    // this.element.backgroundPosition = "center"
    this.element.style.animationDelay = this.delay
    this.element.style.height = this.height
    this.element.style.width = this.height
    this.element.style.backgroundColor = returnColor()

    // declare variables used for snowflake's motion
    this.counter = 0;
    this.sign = Math.random() < 0.5 ? 1 : -1;

  }

function update() {
    // using some trigonometry to determine our x and y position
    // this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;
    if(this.yPos < 0) {
      this.speed = 5
      
    } else {
      if(this.yPos > 50) {
        this.speed = 100
      }
    }
    this.counter += this.speed / 5000;

    if(this.yPos > ((browserHeight/2) - 50) && this.yPos < (browserHeight/2)) {
      this.makeAppear()
    }
    
    if(this.yPos < -100 && this.yPos > -200) {
      this.makeDisappear()
    }
    if(this.element.classList.contains('triangle') && (this.yPos < 50 && this.yPos > 0)) {
      this.collision()
    }

    
  
    
    this.yPos -= Math.sin(this.counter) / 40 + this.speed / 30;
    // this.yPos -= Math.sin(this.counter)
    // this.scale = .5 + Math.abs(10 * Math.cos(this.counter) / 20);

    // setting our snowflake's position
    setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element);

    // if snowflake goes below the browser window, move it back to the top
    if (this.yPos < -200) {
      this.yPos = this.startingPos;
    }
    
  }
  function collision() {
    // console.log('it collided')
      let box = this.element
      let area = $('.circle-square')
      let area2 = $('.triangle')

      let hitCircle = area.overlaps(box)
      let hitTriangle = area2.overlaps(box)
      // isOver? console.log(this.element): console.log("not over")
      if(hitCircle.length) {
        this.speed = 5
        // console.log(isOver[0].height)
      }
      if(hitTriangle.length) {
        this.speed = 5
      }
  
      // $(box)[isOver.length ? 'addClass' : 'removeClass']('over');
    
  }
  function makeAppear() {
    let box = this.element

    if (box.classList.contains('hidden')) {
      box.classList.remove('hidden');
      // box.classList.remove('visuallyhidden')
      setTimeout(function() {
        box.classList.remove('visuallyhidden');
      }, 50);
    }
  }
  function makeDisappear () {
    let box = this.element
    if (!box.classList.contains('hidden')) {
      box.classList.add('visuallyhidden');    
      // box.addEventListener('transitionend', () => {
      //   // console.log('added hidden')
      setTimeout(function() {

        box.classList.add('hidden');
      },50)
      // }, {
      //   capture: false,
      //   once: true,
      //   passive: false
      // });
    }
  }
  Circle.prototype.makeAppear = makeAppear
  Circle.prototype.makeDisappear = makeDisappear
  Circle.prototype.update = update
  Circle.prototype.makeFall = addFallingEffect
  Triangle.prototype.makeAppear = makeAppear
  Triangle.prototype.makeDisappear = makeDisappear
  Triangle.prototype.update = update
  Triangle.prototype.makeFall = addFallingEffect
  Triangle.prototype.collision = collision

  // Circle.prototype.makeAppear = function () {

  //   let box = this.element

  //   if (box.classList.contains('hidden')) {
  //     box.classList.remove('hidden');
  //     box.classList.remove('visuallyhidden')
  //     setTimeout(function () {
  //       box.classList.remove('visuallyhidden');
  //     }, 20);
  //   }
  // }

  // Circle.prototype.makeDisapper = function () {
  //   let box = this.element
  //   if (!box.classList.contains('hidden')) {
  //     box.classList.add('visuallyhidden');    
  //     box.addEventListener('transitionend', function(e) {
  //       box.classList.add('hidden');
  //     }, {
  //       capture: false,
  //       once: true,
  //       passive: false
  //     });
  //   }
  // }
  
  // Triangle.prototype.update = function () {
  //   // using some trigonometry to determine our x and y position
  //   this.counter += this.speed / 5000;
  //   // this.xPos += this.sign * this.speed * Math.cos(this.counter) / 40;

  //   if(this.yPos < 50) {
  //     this.speed = 5
  //   } else {
  //     if(this.yPos > 50) {
  //       this.speed = 100
  //     }
  //   }
    
   
  //   this.yPos -= Math.sin(this.counter) / 40 + this.speed / 30;
  //   // console.log(this.yPos)
  //   // this.yPos -= Math.sin(this.counter)
  //   // this.scale = .5 + Math.abs(10 * Math.cos(this.counter) / 20);

  //   // setting our snowflake's position
  //   setTransform(Math.round(this.xPos), Math.round(this.yPos), this.scale, this.element);

  //   // if snowflake goes below the browser window, move it back to the top
  //   if (this.yPos < -50) {
  //     this.yPos = browserHeight;
  //   }
    
  // }

  function setTransform(xPos, yPos, scale, el) {
    // if(yPos < 50) {
    //   yPos = yPos + 40
    // }         
    // el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    el.style.transform = `translate(${xPos}px, ${yPos}px)`
    // el.style.animation = `goup 5s infinite`
  }

  function generateShapes() {

    // get our snowflake element from the DOM and store it
    var originalCircle = document.querySelector(".circle-square");
    let originalTriangle = document.querySelector(".triangle");

    // access our snowflake element's parent container
    var circleContainer = originalCircle.parentNode;
    let triangleContainer = originalCircle.parentNode

    circleContainer.style.display = "block";

    // get our browser's size
    // browserWidth = document.documentElement.clientWidth;
    // browserHeight = document.documentElement.clientHeight;
    let startingOffset = -50

    // create each individual snowflake
    for (var i = 0; i < numberOfShapes; i++) {
      timing = timing + 1
      startingOffset = startingOffset + 150
      if(i % 2 === 0) {
      // clone our original snowflake and add it to snowflakeContainer
      var circleClone = originalCircle.cloneNode(true);
      circleContainer.appendChild(circleClone);

      // circleClone.style.display = "block"

      // set our snowflake's initial position and related properties
      var initialXPos = setPositionX(50, browserWidth);
      // let initialXPos = browserWidth / 2
      var initialYPos = setPositionY(startingOffset, browserHeight);
      // var initialYPos = 647
      // var speed = 5 + Math.random() * 40;
      let speed = 100
      let initialDelay = `${timing}s`
      let shibeImage = shibeImgs[i]
      

      // create our Snowflake object
      var circleObject = new Circle(circleClone,
        speed,
        initialXPos,
        initialYPos,
        initialDelay,
        shibeImage,
        initialYPos
      );
      shibes.push(circleObject);
    } else {
       // clone our original snowflake and add it to snowflakeContainer
       var triangleClone = originalTriangle.cloneNode(true);
       triangleContainer.appendChild(triangleClone);
 
       // set our snowflake's initial position and related properties
       var initialXPos = setPositionX(50, browserWidth);
       var initialYPos = setPositionY(startingOffset, browserHeight);
      //  var initialYPos = 647
       // var speed = 5 + Math.random() * 40;
       let speed = 100
       let initialDelay = `${timing}s`
       // let shibeImage = shibeImgs[i]
 
       // create our Snowflake object
       var triangleObject = new Triangle(triangleClone,
         speed,
         initialXPos,
         initialYPos,
         initialDelay,
         false,
         initialYPos
       );
       shibes.push(triangleObject);

    }


    }



    circleContainer.removeChild(originalCircle);
    triangleContainer.removeChild(originalTriangle);


    moveShapes();
  }

  function moveShapes() {
    let startingOffset = -50

    if (enableAnimations) {
      for (var i = 0; i < shibes.length; i++) {
        var shape = shibes[i];
        shape.update();
      }      
    }

    // Reset the position of all the snowflakes to a new value
    if (resetPosition) {
      browserWidth = document.documentElement.clientWidth;
      browserHeight = document.documentElement.clientHeight;

      for (var i = 0; i < shibes.length; i++) {
        startingOffset = startingOffset + 150
        var shape = shibes[i];

        shape.xPos = setPositionX(50, browserWidth);
        shape.yPos = setPositionY(startingOffset, browserHeight);
      }

      resetPosition = false;
    }

    requestAnimationFrame(moveShapes);
  }

  function setPositionY(offset, size) {
    // const position = Math.round(-1 * offset + Math.random() * (size + 2 * offset))
    const position = size - (size * .5) + offset
    return position;
  }
  function setPositionX(offset, size) {
    const position = size - (Math.floor(Math.random() * size) - 50) + offset
    return position
  }

  function addFallingEffect() {
    const shape = this.element
    shape.classList.add("falling")
  }
  //
  // Trigger a reset of all the snowflakes' positions
  //
  function setResetFlag(e) {
    resetPosition = true;
  }
}

function inputSelectColor() {
  const circleBorder = document.getElementById('circle-preview')
  const squareBorder = document.getElementById('square-preview')
  const triangleBorder = document.getElementById('triangle-preview')


      if($("input[name=color]:checked").val() === "orange") {
        circleBorder.style.border = "5px solid orange"
        squareBorder.style.border = "5px solid orange"
        triangleBorder.style.backgroundColor = "orange"

      }
      if($("input[name=color]:checked").val() === "blue") {

        circleBorder.style.border = "5px solid blue"
        squareBorder.style.border = "5px solid blue"
        triangleBorder.style.backgroundColor = "blue"
      }
      if($("input[name=color]:checked").val() === "green") {

        circleBorder.style.border = "5px solid green"
        squareBorder.style.border = "5px solid green"
        triangleBorder.style.backgroundColor = "green"
      }
}
function labelColorChange() {
  const orangeLabel = document.getElementById('orange-label')
  const blueLabel = document.getElementById('blue-label')
  const greenLabel = document.getElementById('green-label')

  $(document).ready(function() {
    $('input[name=color]').on("click", function() {
      if($("input[name=color]:checked").val() === "orange") {
        orangeLabel.style.color = "orange"

        blueLabel.style.color = "black"
        greenLabel.style.color = "black"
      }
      if($("input[name=color]:checked").val() === "blue") {
        orangeLabel.style.color = "black"
        blueLabel.style.color = "blue"
        greenLabel.style.color = "black"
      }
      if($("input[name=color]:checked").val() === "green") {
        orangeLabel.style.color = "black"
        blueLabel.style.color = "black"
        greenLabel.style.color = "green"

      }
    })
    })
}
function inputSelectShape() {

  const circle = document.getElementById('circle-preview')
  const square = document.getElementById('square-preview')
  const triangle = document.getElementById('triangle-preview')



      if($("input[name=shape]:checked").val() === "square") {
        square.classList.remove("shape-hidden")
        circle.classList.add("shape-hidden")
        triangle.classList.add("shape-hidden")
      }
      if($("input[name=shape]:checked").val() === "triangle") {
        square.classList.add("shape-hidden")
        circle.classList.add("shape-hidden")
        triangle.classList.remove("shape-hidden")
      }
      if($("input[name=shape]:checked").val() === "circle") {
        square.classList.add("shape-hidden")
        circle.classList.remove("shape-hidden")
        triangle.classList.add("shape-hidden")
      }

}

function fillWithShibe() {
  const shibeImg = document.getElementsByClassName("img-bk")
  const yesNo = $("input[name=yes-no]")


        if(yesNo[0].value === "yes" && yesNo[0].checked) {
          for(let i = 0; i < shibeImg.length; i++) {
            shibeImg[i].style.backgroundImage = `url(${shibeImgs[Math.floor(Math.random() * shibeImgs.length)]})`
          }
        }
        if(yesNo[1].value === "no" && !yesNo[0].checked) {
          for(let i = 0; i < shibeImg.length; i++) {
            shibeImg[i].style.backgroundImage = "none"
          }
        } 

}

function generateShibeShape() {
  const showShape = document.getElementById('shape-preview')

  $(document).ready(function() {
    $('#generate').on("click", function(event) {
      event.preventDefault()
      inputSelectColor()
      inputSelectShape()
      fillWithShibe()
      showShape.style.display = "block"
    })
  })
}
function clear() {
  const yesNo = $("input[name=yes-no]")
  const color = $("input[name=color]")
  const shape = $("input[name=shape]")
  const showShape = document.getElementById('shape-preview')
  const orangeLabel = document.getElementById('orange-label')
  const greenLabel = document.getElementById('green-label')
  const blueLabel = document.getElementById('blue-label')


  $(document).ready(function() {
    $("#clear").on("click", function(event) {
      event.preventDefault()
      color[0].checked = true
      yesNo[0].checked = true
      shape[0].checked = true
      orangeLabel.style.color = "orange"
      greenLabel.style.color = "black"
      blueLabel.style.color = "black"
      showShape.style.display = "none"
    })
  })
}
function generateDefaultShibeImgs() {
  const shibeImg = document.getElementsByClassName("img-bk")

  for(let i = 0; i < shibeImg.length; i++) {
    shibeImg[i].style.backgroundImage = `url(${shibeImgs[Math.floor(Math.random() * shibeImgs.length)]})`
  }

}

$(generateDefaultShibeImgs())
$(generateShibeShape())
$(labelColorChange())
$(clear())


