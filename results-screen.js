// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement, getNextCard, flashcard,menushow,mainhide) {
    this.containerElement = containerElement;
    this.flashcard = flashcard;
    this.getNextCard = getNextCard;
    this.menushow = menushow;
    this.mainhide = mainhide;
    this.percentSpan = document.querySelector('.percent');
    this.correctCntSpan = document.querySelectorAll('.correct');
    this.incorrectCntSpan = document.querySelectorAll('.incorrect');
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.continueClick = this.continueClick.bind(this);
    this.restartClick = this.restartClick.bind(this);
    this.ToMenuClick = this.ToMenuClick.bind(this);

    this.toMenu = document.querySelector('.to-menu');
    this.toMenu.addEventListener('click',this.ToMenuClick);
  }
  continueClick(){
    console.log(this.flashcard);
    console.log('click continue');
    this.hide();
    this.flashcard.style.display = '';
    this.getNextCard('continue');

  }
  restartClick(){
    this.hide();
    this.flashcard.style.display = '';
    this.getNextCard('restart');
  }
  ToMenuClick(){
    this.hide();
    this.mainhide();
    this.flashcard.style.display = '';
    this.containerElement.style.display = '';
    this.menushow();
  }
  show(numberCorrect, numberWrong) {
    console.log(numberCorrect);
    this.containerElement.classList.remove('inactive');
    console.log(this.correctCntSpan[1]);
    this.percentSpan.textContent = (numberCorrect/(numberCorrect+numberWrong))*100;
    this.correctCntSpan[1].textContent = numberCorrect;
    this.incorrectCntSpan[1].textContent = numberWrong;
    if(this.percentSpan.textContent == 100){
      this.continueSpan = document.querySelector('.continue');
      this.continueSpan.textContent = 'Start over?';
      this.continueSpan.addEventListener('click',this.restartClick);
    }
    else {
      this.continueSpan = document.querySelector('.continue');
      this.continueSpan.textContent = 'Continue';
      this.continueSpan.addEventListener('click',this.continueClick);
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
    this.continueSpan.removeEventListener('click',this.restartClick);
    this.continueSpan.removeEventListener('click',this.continueClick);
    this.toMenu.removeEventListener('click',this.ToMenuClick);
  }
}
