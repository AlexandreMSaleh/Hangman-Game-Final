class Hangman {
  constructor(word, chances = 6) { 
    //Takes input for the word to be guessed and the amount of chances the user gets when created, defaults to 6
    this.word = word.toUpperCase().split(''); 
    //Takes the given word and splits up each character, making them upper case for easier comparison
    this.chances = chances; 
    //Takes the given amount of chances and uses them to determine when the game ends
    this.oldGuesses = []; 
    //Stores each letter guessed to prevent duplicate guesses
    this.progress = new Array(word.length); 
    //Starts out empty with the length of the correct word, adding each correct letter guessed
  }
    
  getUserInput() {
    let valid = false;
    //Determines whether or not to keep asking the user for input
    const readline = require('readline-sync');
    let input = "";
    while(!valid) {
      input = readline.question('Please enter your guess: ');
      if(this.isValidInput(input.toUpperCase())) valid = true;
      //Determines whether user input is valid, and stops asking for input if so
    }
    return input.toUpperCase();
  }
  
  isValidInput(guess) {
    if(guess.length != 1) {
      console.log();
      console.log('Please enter only one letter.');
      console.log();
      return false;
    }
    if(guess.toUpperCase() == guess.toLowerCase()) {
    //Determines whether or not the guess is a letter, since upper and lower will not affect a non-letter
      console.log();
      console.log('Please enter only letters.');
      console.log();
      return false;
    }
    for(let i = 0; i < this.oldGuesses.length; i++) {
      if(guess == this.oldGuesses[i]) {
        console.log();
        console.log('You have already guessed this letter.');
        console.log();
        return false;
      }
    }
    //Checks current guess to see if it has already been guessed
    this.oldGuesses.push(guess);
    //Adds the current guess to the list of old guesses if it is valid
    return true;
  }
  
  isCorrectGuess(letter) {
    let correct = false;
    for(let i = 0; i < this.word.length; i++) {
      if(letter == this.word[i]) {
        correct = true;
        this.progress[i] = letter;
      }
    }
    //Checks each character of the entered word to see if it matches the guessed letter and puts it in the progress array if it does
    return correct;
  }
  
  play() {
    let done = false;
    //Used to end the game when the user wins or loses
    console.log();
    console.log('Starting new Hangman game...');
    console.log('Instructions: Enter guesses one letter at a time as prompted to try to guess the \n' + this.word.length + '-letter-long word. If you guess wrong ' + this.chances + ' times, you lose.\nIf you guess all the letters in the word, you win.');
    console.log();
    while(!done) {
      console.log();
      console.log('Remaining Guesses: ' + this.chances);
      console.log('Current progress: ' + this.progress.join(' _ '));
      //Displays current progress separated by an underscore (there is one less underscore than letter in the word)
      console.log();
      if(this.isCorrectGuess(this.getUserInput())) {
      //Tests whether the user's guess is correct, and prints accordingly
        console.log('Your guess was correct!');
      } else {
        console.log('Your guess was incorrect.');
        this.chances--;
      }
      if(this.chances == 0) {
        console.log();
        console.log('You have run out of chances. You lose. Please start again.');
        done = true;
      }
      if(this.progress.join() == this.word.join()) {
        console.log();
        console.log('You have succesfully guessed all the letters in the word ' + this.word.join('') + '. Congratulations, you win!');
        done = true;
      }
    }
  }
}
  
let game1 = new Hangman('hangman');
game1.play();