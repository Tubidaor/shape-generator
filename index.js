let shibeImgs = []

// Get request to fetch Shibe images.
function getShibeImages() {
  //using cors anywhere to bypass CORS issues on local host.
  //Commenting out proxy for production. 
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
  const url = 'http://shibe.online/api/shibes?count=50&urls=true&httpsUrls=false'
  return fetch(url, {
    method: "GET",
    headers: {
      "content-type": 'application/json',
    }
  })
  .then(res => 
    (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
  )
  .catch(error => alert("Unable to retrieve images"))
}

// Function to run fetch request and then generate random shapes with shibes.
function displayImages() {
  getShibeImages()
    .then(images => {
      shibeImgs = images
      risingShapes(images)
    })
}
  
function risingShapes(shibeImgs) {    
  let shibes = []
  let browserWidth = document.documentElement.clientWidth;
  let  browserHeight = document.documentElement.clientHeight;
  let timing = 0
  let numberOfShapes = shibeImgs.length
  let resetPosition = false
  let enableAnimations = false
  /// To see if document matches media query.
  let reduceMotionQuery = matchMedia("(prefers-reduced-motion)")

// To enable animations if motion query matches.
  function setAccessibilityState() {
    if (reduceMotionQuery.matches) {
      enableAnimations = false;
    } else { 
      enableAnimations = true;
    }
  }
  setAccessibilityState()

  reduceMotionQuery.addListener(setAccessibilityState)


  //Function to start animations.
  function setup() {
    if (enableAnimations) {
      //Event listeners to start animation.
      if(document.readyState === "loading" || document.readyState === "complete") {
        setTimeout(generateShapes, 5000)
      }
      window.addEventListener("resize", setResetFlag, false)
    }
  }

  setup()

  //Creating an object for circles and square shapes.
  function CircleSquare(element, speed, xPos, yPos, delay, image, startingPos,
    rotation) {
    // Set initial object properties.
    function returnColor(){
      const colors = ["#186a3b", "#27ae60", "#154360", "#58d68d", " #2471a3",
        "#7fb3d5", "#f39c12", "#e67e22", "#eb984e", "#a6acaf"]

      return colors[Math.floor(Math.random() * 10)]
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
    this.image = image
    this.height = (Math.floor(Math.random() * 50) + 50) + "px"
    this.rotation = rotation
    this.hit = false
    this.element.style.backgroundImage = `url("${this.image}")`
    this.element.style.borderRadius = returnRadius()
    this.element.style.animationDelay = this.delay
    this.element.style.height = this.height
    this.element.style.width = this.height
    this.element.style.border = `5px solid ${returnColor()}`
    this.counter = 0;

    if(this.element.style.borderRadius === "50%") {
      this.element.classList.add("circle")
      this.element.classList.remove("circle-square")
    }
    if(this.element.style.borderRadius === "0px") {
      this.element.classList.add("square")
      this.element.classList.remove("circle-square")
    }
    
  }

  //Creating an object for triangle shapes
  function Triangle(element, speed, xPos, yPos, delay, image, startingPos,
    rotation) {
    // Set initial object properties.
    function returnColor(){
      const colors = ["#186a3b", "#27ae60", "#154360", "#58d68d", " #2471a3",
        "#7fb3d5", "#f39c12", "#e67e22", "#eb984e", "#a6acaf"]
  
      return colors[Math.floor(Math.random() * 10)]
    }
    
    this.element = element;
    this.speed = speed;
    this.xPos = xPos;
    this.yPos = yPos;
    this.startingPos = startingPos
    this.image = image
    this.hit = false
    this.height = Math.floor(Math.random() * 100) + "px"
    this.rotation = rotation
    this.element.style.animationDelay = this.delay
    this.element.style.height = this.height
    this.element.style.width = this.height
    this.element.style.backgroundColor = returnColor()
    this.counter = 0;    
  }
  
  function update() {
    // Determine position and update position.
    this.counter += this.speed / 5000;
    if(this.yPos < 0) {
      this.speed = 5
      this.hit = true
    } 

    // To change visibility of object.
    if(this.yPos > ((browserHeight/2) - 50) && this.yPos < (browserHeight/2)) {
      this.makeAppear()
    }
    
    if(this.yPos < -100 && this.yPos > -200) {
      this.makeDisappear()
    }

    // const element = this.element

    //To change animation. If object hits another object, animation starts.
    if(this.hit === false && this.yPos < 75) {
      //This method of checking to see if there was contact creates a lot of lag
      // and its not efficient. I was unable to find a better solution.
      const overlaps = this.overlaps()
        if(overlaps.length > 1) {
          // console.log(overlaps[0])
          // this.element.animate({"transform": `rotate(${this.rotation}deg) translateX(${Math.round($(overlaps[0]).height())}px) rotate(${this.rotation}deg)`}, 2000, "linear")
          // this.element.animate({"transform": `rotate(${this.rotation + 360}deg) translateX(${Math.round($(overlaps[0]).height())/2}px) rotate(${this.rotation -360}deg)`}, 4000, "linear")
          // this.element.animate({"transform": `rotate(${this.rotation + 360}deg) translateY(-200px) rotate(${this.rotation -360}deg)`}, 4000, "linear")
          // this.element.animate({"transform": `rotate(360deg) translate(20px,-${Math.round(this.yPos)*5}px) rotate(-360deg)`}, 6000, 'linear', function() {
          //   console.log( "all done" )})
          // this.makeDisappear()

          this.hit = true
          this.speed = 5
        }
    }
  

    this.yPos -= Math.sin(this.counter) / 40 + this.speed / 30;
    
    // Set position.
    setTransform(Math.round(this.xPos), Math.round(this.yPos), this.rotation,
      this.element);

    // If object goes above the browser window, move it back to the top and reset speed.
    if (this.yPos < -200) {
      this.yPos = this.startingPos;
      this.speed = 100
      this.hit = false
    }
  }

  //Function to check if there is a collision with another element. 
  function overlaps() {
    let elems = [];
    const objects = $(this.element).siblings()
    const thisObj = this.element

    objects.each(function() {
      let bounds = $(this).offset();
        bounds.right = bounds.left + $(this).innerWidth();
        bounds.bottom = bounds.top + $(this).innerHeight();
  
        let compare = $(thisObj).offset();
        compare.right = compare.left + $(thisObj).innerWidth();
        compare.bottom = compare.top + $(thisObj).innerHeight();
  
        let isOver = (!(compare.right < bounds.left ||
            compare.left > bounds.right ||
            compare.bottom < bounds.top ||
            compare.top > bounds.bottom));
  
        if (isOver) {return elems.push(this);}
        
      });    
  
    elems.join('');
    return elems;
  };
  
  
  //Function to make element appear. 
  function makeAppear() {
    let box = this.element
    
    if (box.classList.contains('hidden')) {
      box.classList.remove('hidden');
      setTimeout(function() {
        box.classList.remove('visuallyhidden');
      }, 50);
    }
  }
  
  //Function to make element dissappear. 
  function makeDisappear () {
    let box = this.element
    if (!box.classList.contains('hidden')) {
      box.classList.add('visuallyhidden');    
      setTimeout(function() {
        box.classList.add('hidden');
      },50)
    }
  }
  
  //To assign common functions to individual objects.
  CircleSquare.prototype.makeAppear = makeAppear
  CircleSquare.prototype.makeDisappear = makeDisappear
  CircleSquare.prototype.update = update
  CircleSquare.prototype.overlaps = overlaps
  Triangle.prototype.makeAppear = makeAppear
  Triangle.prototype.makeDisappear = makeDisappear
  Triangle.prototype.update = update
  Triangle.prototype.overlaps = overlaps
  
  
  function setTransform(xPos, yPos, rotation, el) {
    el.style.transform = `translate(${xPos}px, ${yPos}px) rotate(${rotation}deg)`
  }

  function generateShapes() {
    // Get nodes that will be copied.
    let originalCircle = document.querySelector(".circle-square");
    let originalTriangle = document.querySelector(".triangle");

    // Access objects element's parent container.
    let circleContainer = originalCircle.parentNode;
    let triangleContainer = originalCircle.parentNode
    
    circleContainer.style.display = "block";

    let startingOffset = -50

    // Create each individual object with individual properties.
    for (let i = 0; i < numberOfShapes; i++) {
      timing = timing + 1
      startingOffset = startingOffset + 150
      if(i % 2 === 0) {
      // Clone our original object and add it to its container.
      let circleClone = originalCircle.cloneNode(true);
      circleContainer.appendChild(circleClone);
      let initialXPos = setPositionX(50, browserWidth);
      let initialYPos = setPositionY(startingOffset, browserHeight);
      let speed = 100
      let initialDelay = `${timing}s`
      let shibeImage = shibeImgs[i]
      let rotation = () => {
        let leftRight = Math.floor(Math.random() * 2)

        if(leftRight === 0) {
          return Math.floor(Math.random() * 46) 
        }
        return Math.floor(Math.random() * -46)
      }

      // Create object
      let circleObject = new CircleSquare(circleClone,
        speed,
        initialXPos,
        initialYPos,
        initialDelay,
        shibeImage,
        initialYPos,
        rotation()
        );
      shibes.push(circleObject);
    } else {
       // clone our original object and add it to its container.
      let triangleClone = originalTriangle.cloneNode(true);
      triangleContainer.appendChild(triangleClone);

       // Set object's initial position and individual propreties
      let initialXPos = setPositionX(50, browserWidth);
      let initialYPos = setPositionY(startingOffset, browserHeight);
      let speed = 100
      let initialDelay = `${timing}s`
      let rotation = () => {
        let leftRight = Math.floor(Math.random() * 2)
        if(leftRight === 0) {
          return Math.floor(Math.random() * 46) 
        }
        return Math.floor(Math.random() * -46)
      }

       //Create object and push it to the Shibe ojbect array.
      let triangleObject = new Triangle(triangleClone,
        speed,
        initialXPos,
        initialYPos,
        initialDelay,
        false,
        initialYPos,
        rotation()
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
      for (let i = 0; i < shibes.length; i++) {
        let shape = shibes[i];
        shape.update();
      }      
    }

    // Reset the position of all the objects to a new value if screen size changes
    if (resetPosition) {
      browserWidth = document.documentElement.clientWidth;
      browserHeight = document.documentElement.clientHeight;

      for (let i = 0; i < shibes.length; i++) {
        startingOffset = startingOffset + 150
        let shape = shibes[i];

        shape.xPos = setPositionX(50, browserWidth);
        shape.yPos = setPositionY(startingOffset, browserHeight);
      }
      resetPosition = false;
    }
    requestAnimationFrame(moveShapes);
  }
  
  //To set position Y of object based on screen size.
  function setPositionY(offset, size) {
    const position = size - (size * .5) + offset
    return position;
  }

  //To set position X of object based on screen size.
  function setPositionX(offset, size) {
    const position = size - (Math.floor(Math.random() * size) - 50) + offset
    return position
  }
  //To change reset position, if true animation x y coordinates change on new
  // screen size.
  function setResetFlag(e) {
    resetPosition = true;
  }
}

//To change shape color for generation.
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
//To change color on label when it gets choosen. 
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

//To select shape for generation.
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
      shibeImg[i].style.backgroundImage = `url(${shibeImgs[Math.floor(
        Math.random() * shibeImgs.length)]}
      )`
    }
  }
  if(yesNo[1].value === "no" && !yesNo[0].checked) {
    for(let i = 0; i < shibeImg.length; i++) {
      shibeImg[i].style.backgroundImage = "none"
    }
  } 
}

//To generate shibes and shapes when generate button is clicked.
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

//To clear form to default and to delete/hide original shape.
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

//To generate default shibes at start.
function generateDefaultShibeImgs() {
  const shibeImg = document.getElementsByClassName("img-bk")

  for(let i = 0; i < shibeImg.length; i++) {
    shibeImg[i].style.backgroundImage = `url(${shibeImgs[Math.floor(
      Math.random() * shibeImgs.length)]}
    )`
  }
}

$(generateDefaultShibeImgs())
$(generateShibeShape())
$(labelColorChange())
$(clear())
$(displayImages())
