'use strict';
var ulEl = document.getElementById('list');
var headerEl = document.getElementById('header');
var currentRandomIndices = [];
// ulEl.width = 'fit-content';
// Create a constructor function that creates an object associated with each product, and has the following properties:
// Name of the product
// File path of image
Item.allItems = [];
function Item(itemName, itemImageSrc){
  this.itemName = itemName;
  this.itemImageSrc = itemImageSrc;
  this.timesClicked = 0;
  this.timesShown = 0;
  this.clickToShownRatio = this.timesClicked/this.timesShown;
  Item.allItems.push(this);
}

Item.numImages = 3;
Item.numOfImageCycles = 25;

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
  console.log(currentRandomIndices);

  while(randomNums.length < Item.numImages){
    var randomNum = Math.floor(Math.random() * Item.allItems.length);
    var checkRepeat = false;

    for(var i = 0; i < currentRandomIndices.length; i++){
      console.log('Inside for loop');
      if(currentRandomIndices.includes(randomNum)){
        checkRepeat = true;
        break;
      }
    }

    console.log('For loop passed, checking number');

    if(!randomNums.includes(randomNum)&& !checkRepeat){
      Item.allItems[randomNum].timesShown++;
      randomNums.push(randomNum);
      console.log('Number stuck');
    }
  }
  currentRandomIndices = [];
  return randomNums;
}

function renderPage() {
  var randomNums = getRandomNums();
  currentRandomIndices = randomNums;
  console.log(currentRandomIndices);
  console.log(randomNums);
  for (var i = 0; i < randomNums.length; i++){
    Item.allItems[randomNums[i]].renderItem();
  }
}
// Attach an event listener to the section of the HTML page where the images are going to be displayed.

var clickCounter = 0;
function handleVotes(voteEvent){

  if (clickCounter < Item.numOfImageCycles){
    clickCounter++;
    for (var i = 0; i < Item.allItems.length; i++){
      if(voteEvent.target.id === Item.allItems[i].itemName){
        Item.allItems[i].timesClicked++;
      }
    }
    ulEl.innerHTML = '';
    renderPage();
  } else if (clickCounter === Item.numOfImageCycles){
    ulEl.remove();
    headerEl.textContent = 'Here are the results!';
    renderItemChart();
    console.log(Item.allItems);


  }
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


function renderItemChart(){
  var ctx = document.getElementById('itemChart').getContext('2d');



  var itemNamesArr = [];

  for(var i = 0; i < Item.allItems.length; i++){
    itemNamesArr.push(Item.allItems[i].itemName);
  }

  var clicks = [];
  var shown = [];

  for(i = 0; i < Item.allItems.length; i++){
    clicks.push(Item.allItems[i].timesClicked);
    shown.push(Item.allItems[i].timesShown);
  }


  new Chart(ctx, {
    type: 'bar',

    data: {
      labels: itemNamesArr,
      datasets: [{
        label: 'Number of times item was clicked',
        backgroundColor: 'rgb(150, 10, 200, 0.4)',
        borderColor: 'rgb(255, 99, 132)',
        data: clicks
      },
      {
        label: 'Number of times item was shown',
        backgroundColor: 'rgb(80, 190, 92, 0.2)',
        borderColor: 'rgb(30, 99, 132)',
        data: shown
      }]
    },

    options: {
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
