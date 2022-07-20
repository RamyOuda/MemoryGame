const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// counter used to limit card flips
let counter = 0;

// store checked box's color as a string
let check = ``;

// updates when first box is clicked
let previousEvent = undefined;

// false for 1 second when 2nd box is incorrect
let clickable = true;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);

  // -------------

  for (let color of COLORS) {
    // set 'clickable' to false for 1 second after choosing an incorrect pair
    if (clickable) {
      // checks to make sure you are not clicking the same box twice
      if (event.target !== previousEvent) {
        // limit amount of cards flipped at a time to 2
        if (counter < 2) {
          if (event.target.classList.contains(color)) {
            event.target.style.backgroundColor = color;

            if (!check) {
              check = color;
              counter++;
              previousEvent = event.target;
            } else if (check === color) {
              console.log(`It's a match!`);

              previousEvent = undefined;
              check = ``;
              counter = 0;

              return; // exit the loop
            } else {
              clickable = false;

              setTimeout(function () {
                event.target.style.backgroundColor = `white`;
                previousEvent.style.backgroundColor = `white`;
                previousEvent = undefined;
                check = ``;
                counter = 0;
                clickable = true;
              }, 1000);
            }
          }
        }
      }
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */
