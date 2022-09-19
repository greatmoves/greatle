import getWord from './words.js';
var guesses = document.getElementById('guesses');
var solution = document.getElementById('word');

var i_index = 0;
var numGuesses = 0;
var word = '';

start();

document.getElementById("newGameButton").onmousedown = reset;

function start() {
    numGuesses = 0;
    word = getWord()
    console.log(word)
    i_index = 0;
    guesses = document.getElementById('guesses');
    document.addEventListener("keydown", typing);
    solution.innerText = '';
    // Init the rows
    for (let index = 0; index < 5; index++) {
        for (let y_index = 0; y_index < word.length; y_index++) {
            guesses.rows[index].insertCell();
            guesses.rows[index].cells[y_index].innerText = '';
        }
    }

}

function reset() {
    for (let index = 0; index < 5; index++) {
        for (let y_index = 0; y_index < word.length; y_index++) {
            guesses.rows[index].deleteCell(0);
        }
    }

    start();
}

function checkanswer() {
    var correct_guesses = 0;
    var guessWord = '';
    // https://stackoverflow.com/questions/19480916/count-number-of-occurrences-for-each-char-in-a-string
    var result = [...word].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {});
    for (let index = 0; index < word.length; index++) {
        var letter = guesses.rows[numGuesses].cells[index].innerText
        guessWord = guessWord.concat(letter)
        
    }
    for (let index = 0; index < word.length; index++) {
        var letter = guessWord[index]
        if(word[index] === guessWord[index]) {
            guesses.rows[numGuesses].cells[index].style.color = 'green';
            guesses.rows[numGuesses].cells[index].style.textDecoration = 'underline green';
            result[letter]--;
            correct_guesses++; 
        }
        
        guesses.rows[numGuesses].cells[index].innerText = guessWord[index];
    }
    for (let index = 0; index < word.length; index++) {
        var letter = guessWord[index]
        if(word.includes(letter) && result[letter] > 0 && word[index] !== guessWord[index]) {
            guesses.rows[numGuesses].cells[index].style.color = 'yellow';
            guesses.rows[numGuesses].cells[index].style.textDecoration = 'underline yellow';
            result[letter]--;
        }
        guesses.rows[numGuesses].cells[index].innerText = guessWord[index];
    }
    
    numGuesses++;
    i_index = 0;
    
    if(correct_guesses === word.length) {
        solution.innerText = 'Congratulations you guessed the word!';
        return true;
    }
    else if (numGuesses === 5) {
        solution.innerText = `You didn\'t get the word, the word was: ${word}!`;
        return true;
    } 

}


function typing(event) {
    var x = event.key;
    if(/^[a-z]$/i.test(x)) {
        try {
            guesses.rows[numGuesses].cells[i_index].innerText = x;
            i_index++;    
        } catch (error) {
            
        }
        
    } else if(x === 'Backspace') {
        
        if(i_index > 0) {
            i_index--;
            guesses.rows[numGuesses].cells[i_index].innerText = '';
        }
        
    } else if (x === 'Enter') {
        if(i_index < word.length) {
            // do something so that the answer must be 5 letters
        }  else {
            let check = checkanswer();
            if(check) {
                this.removeEventListener('keydown',typing);
            }
        }
        
    }
    
}

