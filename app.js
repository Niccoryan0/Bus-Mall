'use strict';

var ulEl = document.getElementById('list');
var headerEl = document.getElementById('header');
var currentRandomIndices = [];

// Class Constructor to make individual items with info including name, image source, times the picutre was clicked and times it was shown
Item.allItems = [];
function Item(itemName, itemImageSrc, timesClicked = 0, timesShown = 0){
  this.itemName = itemName;
  this.itemImageSrc = itemImageSrc;
  this.timesClicked = timesClicked;
  this.timesShown = timesShown;
  Item.allItems.push(this);
}

// Code is dynamic so these numbers can be changed to change number of images on screen and number of times images will display before graphs are shown
Item.numImages = 3;
Item.numOfImageCycles = 10;

// Render method for putting an item on screen
Item.prototype.renderItem = function(){
  var newLiEl = document.createElement('li');

  var newImg = document.createElement('img');
  newImg.src = this.itemImageSrc;
  newImg.id = this.itemName;
  newImg.height = '300';

  var newPEl = document.createElement('p');
  newPEl.textContent = 'Votes: ' + this.timesClicked;
  newLiEl.appendChild(newImg);
  newLiEl.appendChild(newPEl);

  ulEl.appendChild(newLiEl);
};

// Function for getting random nums to choose which pics to display
function getRandomNums() {
  var randomNums = [];

  while(randomNums.length < Item.numImages){
    var randomNum = Math.floor(Math.random() * Item.allItems.length);
    var checkRepeat = false;
    // Check if each image was in the last round of images
    for(var i = 0; i < currentRandomIndices.length; i++){
      if(currentRandomIndices.includes(randomNum)){
        checkRepeat = true;
        break;
      }
    }

    // Check if each image is in the current round of images AND if previous check returned true or false, only add numbers if neither are true
    if(!randomNums.includes(randomNum) && !checkRepeat){
      Item.allItems[randomNum].timesShown++;
      randomNums.push(randomNum);
    }
  }
  currentRandomIndices = [];
  return randomNums;
}


// Render page by getting the random numbers from the previous function and rendering the corresponding images to the screen.
function renderPage() {
  var randomNums = getRandomNums();
  currentRandomIndices = randomNums;
  for (var i = 0; i < randomNums.length; i++){
    Item.allItems[randomNums[i]].renderItem();
  }
}


// Event handler for clicks
var clickCounter = 0;
function handleVotes(voteEvent){
  var itemsMadeStringy = JSON.stringify(Item.allItems);
  localStorage.setItem('itemsFromLocalStorage', itemsMadeStringy);

  var itemChartHead = document.getElementById('itemChartHead');
  var ratioChartHead =document.getElementById('ratioChartHead');
  // Control numnber of times images display before graphs
  if (clickCounter < Item.numOfImageCycles){
    clickCounter++;
    // Increase click count for selected image
    for (var i = 0; i < Item.allItems.length; i++){
      if(voteEvent.target.id === Item.allItems[i].itemName){
        Item.allItems[i].timesClicked++;
      }
    }
    // Rerender page wiith new images
    ulEl.innerHTML = '';
    renderPage();
  } else if (clickCounter === Item.numOfImageCycles){
    // When click count is reached, display graphs
    ulEl.remove();
    headerEl.remove();
    itemChartHead.textContent = 'Here\'s how many times you were shown and clicked on each image:';
    ratioChartHead.textContent = 'Here\'s the clicked to shown ratio:';
    renderItemChart();
    renderRatioChart();


  }

}

if (!localStorage.getItem('itemsFromLocalStorage')){
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
} else {
  var itemsFromLocalAsAString = localStorage.getItem('itemsFromLocalStorage');
  var itemsFromLocalAsArray = JSON.parse(itemsFromLocalAsAString);

  for (var i = 0; i < itemsFromLocalAsArray.length; i++){
    var reItemName = itemsFromLocalAsArray[i].itemName;
    var reItemImageSrc = itemsFromLocalAsArray[i].itemImageSrc;
    var reTimesClicked = itemsFromLocalAsArray[i].timesClicked;
    var reTimesShown = itemsFromLocalAsArray[i].timesShown;
    new Item(reItemName, reItemImageSrc, reTimesClicked, reTimesShown);
  }
}


renderPage();
ulEl.addEventListener('click', handleVotes);

// Button click handler to reset local storage and refresh page
var resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function(){
  localStorage.clear();
  location.reload();
});

// Function to render the first chart, times clickes and times shown in a stacked bar
function renderItemChart(){
  var ctx = document.getElementById('itemChart').getContext('2d');
  var ratio = [];

  for(i = 0; i < Item.allItems.length; i++){
    ratio.push((Item.allItems[i].timesClicked/Item.allItems[i].timesShown));
  }


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


  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',

    data: {
      labels: itemNamesArr,
      datasets: [{
        label: 'Number of times item was clicked',
        backgroundColor: 'rgb(150, 10, 200, 0.8)',
        borderColor: 'rgb(1,1,1)',
        data: clicks
      }, {
        label: 'Number of times item was shown',
        backgroundColor: 'rgb(80, 190, 92, 0.6)',
        borderColor: 'rgb(30, 99, 132)',
        data: shown
      }]
    },

    options: {
      responsive: false,
      scales: {
        xAxes: [{
          stacked: true
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });
}

// Function to render the 2nd chart, percentage of times clicked to times shown
function renderRatioChart(){
  var ctx = document.getElementById('ratioChart').getContext('2d');



  var itemNamesArr = [];

  for(var i = 0; i < Item.allItems.length; i++){
    itemNamesArr.push(Item.allItems[i].itemName);
  }

  var ratio = [];
  // Percent calc
  for(i = 0; i < Item.allItems.length; i++){
    ratio.push((Item.allItems[i].timesClicked/Item.allItems[i].timesShown)*100);
  }


  // eslint-disable-next-line no-undef
  new Chart(ctx, {
    type: 'bar',

    data: {
      labels: itemNamesArr,
      datasets: [{
        label: 'Percentage of times clicked to times shown',
        backgroundColor: 'rgb(50, 180, 146, 1)',
        borderColor: '#2A3842',
        data: ratio
      }]

    },

    options: {
      responsive: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}


