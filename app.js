'use strict';
var ulEl = document.getElementById('list');
var numImages = 3;
var numOfImageCycles = 25;
// ulEl.width = 'fit-content';
// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
let allItems = [];
function Item(itemName, itemImageSrc){
  this.itemName = itemName;
  this.itemImageSrc = itemImageSrc;
  this.timesClicked = 0;
  this.timesShown = 0;
  allItems.push(this);
}


Item.prototype.renderItem = function(){
  var newLiEl = document.createElement('li');

  var newImg = document.createElement('img');
  newImg.src = this.itemImageSrc;
  newImg.id = this.itemName;
  newImg.height = '400';

  var newPEl = document.createElement('p');
  newPEl.textContent = 'Votes: ' + this.timesClicked;
  newLiEl.appendChild(newImg);
  newLiEl.appendChild(newPEl);

  ulEl.appendChild(newLiEl);
};

// Create an algorithm that will randomly generate three unique product images from the images directory and display them side-by-side-by-side in the browser window.
function getRandomNums() {
  var randomNums = [];
  while(randomNums.length < numImages){
    var randomNum = Math.floor(Math.random() * allItems.length);
    if(!randomNums.includes(randomNum)){
      allItems[randomNum].timesShown++;
      randomNums.push(randomNum);
    }
  }
  return randomNums;
}

function renderPage() {
  var randomNums = getRandomNums();

  for (var i = 0; i < randomNums.length; i++){
    allItems[randomNums[i]].renderItem();
  }
}
// Attach an event listener to the section of the HTML page where the images are going to be displayed.

var clickCounter = 0;
function handleVotes(voteEvent){
  if (clickCounter < numOfImageCycles){
    clickCounter++;
    for (var i = 0; i < allItems.length; i++){
      if(voteEvent.target.id === allItems[i].itemName){
        allItems[i].timesClicked++;
      }
    }
    ulEl.innerHTML = '';
    renderPage();
  } else if (clickCounter === numOfImageCycles){
    ulEl.innerHTML = '';

    for(var j = 0; j < allItems.length; j++){
      var newLiEl = document.createElement('li');
      newLiEl.textContent = allItems[j].itemName + ' was voted for ' + allItems[j].timesClicked + ' time(s) and shown ' + allItems[j].timesShown + ' time(s)';
      ulEl.appendChild(newLiEl);
    }
  }

  // Diagnostic Tools:
  // console.log(clickCounter);
  // var timeShownTotal = 0;
  // var clickTotal = 0;
  // for(var k = 0; k < allItems.length; k++){
  //   timeShownTotal += allItems[k].timesShown;
  //   clickTotal += allItems[k].timesClicked;
  // }
  // console.log('Total Clicks: ' + clickTotal);
  // console.log('Total items shown: ' + timeShownTotal);
}

new Item('Bag', 'img/bag.jpg');
new Item('Banana', 'img/banana.jpg');
new Item('Bathroom', 'img/bathroom.jpg');
new Item('Breakfast', 'img/breakfast.jpg');
new Item('Bubblegum', 'img/bubblegum.jpg');
new Item('Chair', 'img/chair.jpg');
new Item('Cthulhu', 'img/cthulhu.jpg');
new Item('Dog duck', 'img/dog-duck.jpg');
new Item('Dragon', 'img/dragon.jpg');
new Item('Pen', 'img/pen.jpg');
new Item('Pet sweep', 'img/pet-sweep.jpg');
new Item('Scissors', 'img/scissors.jpg');
new Item('Shark', 'img/shark.jpg');
new Item('Sweep', 'img/sweep.png');
new Item('Tauntaun', 'img/tauntaun.jpg');
new Item('Unicorn', 'img/unicorn.jpg');
new Item('Usb', 'img/usb.gif');
new Item('Water can', 'img/water-can.jpg');
new Item('Wine glass', 'img/wine-glass.jpg');




renderPage();
ulEl.addEventListener('click', handleVotes);
