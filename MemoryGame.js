// Array creation for every card
const games = document.querySelectorAll('.memory-card');
// variable if card is flipped
let flipped = false;
// variable for first and second draws
let first, second;
// variable for counting the number of flips in the entire game
let flips = 0;
// variable for rotations of matching pairs
let rotations = 0;
// variable for calculating points
let points = 0;
// constant for extracting score value from HTML
const score = document.getElementById('score-value');
// constant for selecting tag by given score I'd
const score_base = document.getElementById('score');
// constant for selecting tag by given start-button I'd
const pressed_start = document.getElementById('start-button');
// variables for selecting board games and rules and header
var ele1 = document.querySelector('#Memory-game');
var ele2 = document.querySelector('#rules');
var ele3 = document.getElementById('card-flip-game');
// constant for selecting refresh button
const pressed_refresh = document.getElementById('button-refresh');
// constant for selecting back button
const pressed_back = document.getElementById('back-button');
// variables for selecting end button
const pressed_end = document.getElementById('end-Button');
// constant for selecting begin button
const pressed_begin = document.getElementById('begin-button');
// Events when begin button is clicked
pressed_begin.addEventListener('click', function() {
    pressed_start.classList.add('Move-things-right');
    pressed_back.classList.add('Move-things-right');
    ele2.classList.add('Move-things-right');
    ele3.classList.add('Move-things-left');
    pressed_begin.classList.add('Move-things-left');
    pressed_refresh.classList.add('Move-things-right');
});
// Events when refresh button is clicked
pressed_refresh.addEventListener('click', function() {
    location.reload();
});
// Events when back button is clicked
pressed_back.addEventListener('click', function() {
    pressed_start.classList.remove('Move-things-right');
    pressed_back.classList.remove('Move-things-right');
    ele2.classList.remove('Move-things-right');
    ele3.classList.remove('Move-things-left');
    pressed_refresh.classList.remove('Move-things-right');
    pressed_begin.classList.remove('Move-things-left');
});
// Events when start button is clicked
pressed_start.addEventListener('click', function() {
    pressed_start.classList.remove('Move-things-right');
    pressed_back.classList.remove('Move-things-right');
    ele2.classList.remove('Move-things-right');
    pressed_refresh.classList.remove('Move-things-right');
    ele1.classList.add('Move-things-down');
    pressed_end.classList.add('Move-things-down');
    score_base.classList.add('Move-things-down');
});
// Events when end button is clicked
pressed_end.addEventListener('click', function() {
    ele1.classList.remove('Move-things-down');
    pressed_end.classList.remove('Move-things-down');
    points = 0;
    GetPoints();
    games.forEach(game => {
        game.classList.add('Rotate-Cards');
        game.classList.remove('Rotate-Cards');
    });
    score_base.classList.remove('Move-things-down');
    pressed_start.classList.add('Move-things-right');
    pressed_back.classList.add('Move-things-right');
    ele2.classList.add('Move-things-right');
    pressed_refresh.classList.add('Move-things-right');
});
// function definition if first card is pushed in the game
function AddFirstCard() {
    flipped = true;
}

// function definition if second card is pushed in the game
function AddSecondCard() {
    flipped = false;
}
// function of flip cars
function Flip() {
    this.classList.add('Rotate-Cards');
    if (!flipped) {
        // If no card is flipped, then the flipped card is the first card
        AddFirstCard();
        first = this;
    } else {
        // If a card is flipped, then the flipped card is the second card
        AddSecondCard();
        second = this;
        // If the two flipped cards contain the same data
        if (first.dataset.framework === second.dataset.framework) {
            first.removeEventListener('click', Flip);
            second.removeEventListener('click', Flip);
            // Incrementing he points
            points = points + 2;
            // Incrementing the flips
            flips = flips + 2;
            // Incrementing the rotations
            rotations = rotations + 2;
            Visualize();
            GetPoints();
        } else {
            // Re-flip the two cards back
            setTimeout(() => {
                first.classList.remove('Rotate-Cards');
                second.classList.remove('Rotate-Cards');
                // Decrementing the points
                points--;
                // Incrementing the flips
                flips = flips + 2;
                GetPoints();
            }, 1500); // Re-flip them after 1.5 seconds
        }
    }
}

// variables for score board creation
var score_board = document.getElementById('score-board');
var flips_board = document.getElementById('flips-board');
var dis_score = document.querySelector('#display-score');
var total_score = document.querySelector('#total-score');
var total_flips = document.querySelector('#total-flips');

// function Visualize to check if all cards have been flipped
function Visualize() {
    if (rotations === 48) {
        // If all cards have been flipped, then the game is over
        ele1.classList.remove('Move-things-down');
        pressed_end.classList.remove('Move-things-down');
        score_base.classList.remove('Move-things-down');
        dis_score.classList.add('Move-things-right');
        total_score.classList.add('Move-things-right');
        total_flips.classList.add('Move-things-right');
        // Calling function to show score
        ShowScore();
    }
}

function ShowScore() {
    // Changing the text Content of the selected elements
    score_board.textContent = points;
    flips_board.textContent = flips;
}

// function to evaluate and display score as per the scored points after each flip
function GetPoints() {
    if (points === 0) {
        // If points are zero display in blue color
        score.style.color = 'blue';
        score.textContent = points;
    }
    if (points > 0) {
        // If points are more than zero display in green color
        score.style.color = 'green';
        score.textContent = points;
    }
    if (points < 0) {
        // If points are less than zero display in red color
        score.style.color = 'red';
        score.textContent = points;
    }
}

// Immediately Invoked function
(function ShuffleCards() {
    games.forEach(game => {
        let random = Math.floor(Math.random() * 24);
        // Styling and updating Flex order property
        game.style.order = random;
    });
})(); // due to this it will be automatically called when its lines are read by compiler

// Calling the flip function on click for every card in the game board
games.forEach(game => game.addEventListener('click', Flip));