
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
  console.log('itran')
  getShibeImages()
    .then(images => risingShapes(images)
    )
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