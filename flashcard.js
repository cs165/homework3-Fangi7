// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
class Flashcard {
  constructor(containerElement, frontText, backText, judgeAns, correctCnt, incorrectCnt, getNextCard, nowCardNum, cardArr) {

    let originX = null;
    let offsetX = 0;
    let offsetY = 0;
    let startMove = false;
    this.containerElement = containerElement;
    this.frontText = frontText;
    this.backText = backText;
    this.nowCardNum = nowCardNum;
    this.judgeAns = judgeAns;
    this.getNextCard = getNextCard;
    this.correctCnt = correctCnt;
    this.incorrectCnt = incorrectCnt;
    this.cardArr = cardArr;

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this._flipCardStart = this._flipCardStart.bind(this);
    this._flipCardEnd = this._flipCardEnd.bind(this);
    this._flipCardMove = this._flipCardMove.bind(this);

    this.containerElement.append(this.flashcardElement);
    console.log(this.flashcardElement);
    this.flashcardElement.addEventListener('pointerdown', this._flipCardStart);
    this.flashcardElement.addEventListener('pointerup', this._flipCardEnd);
    this.flashcardElement.addEventListener('pointermove', this._flipCardMove);
  }

  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent= backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }
  _flipCardStart(event) {
    this.startMove = true;
    this.originX = event.clientX;
    this.originY = event.clientY;
  }
  _flipCardEnd(event) {
    this.startMove = false;
    if((event.clientX - this.originX) > 150 ){
        this.judgeAns('right');
        console.log(this.cardArr);
        this.cardArr[this.nowCardNum][2] = 'right';
        this.flashcardElement.style.display = 'none';
        this.getNextCard(this.nowCardNum+1);

      }
    else if((this.originX - event.clientX) > 150 ){
        this.judgeAns('wrong');
        console.log(this.nowCardNum+1);
        this.cardArr[this.nowCardNum][2] = 'wrong';
        this.flashcardElement.style.display = 'none';
        this.getNextCard(this.nowCardNum+1);
      }
    else {
        this.flashcardElement.classList.toggle('show-word');
    }
    document.body.style.backgroundColor = "#d0e6df";
    this.flashcardElement.style.transform = 'translateX(0px) translateY(0px) rotate(0deg)';

  }
  _flipCardMove(event) {
    if(this.startMove == false) return;
      event.preventDefault();
      event.target.setPointerCapture(event.pointerId);
      //  console.log(event.pointerId);
        //this.flashcardElement.style.transition = '';
        this.flashcardElement.style.transform = 'translateX('+(event.clientX-this.originX)+'px)'+
        'translateY('+(event.clientY-this.originY)+'px) rotate('+(event.clientX-this.originX)*0.2+'deg)';
        if ((event.clientX - this.originX) > 150){
          document.body.style.backgroundColor = "#97b7b7";
          this.correctCntSpan = document.querySelector('.correct');
          this.incorrectCntSpan = document.querySelector('.incorrect');
          this.correctCntSpan.textContent = this.correctCnt + 1;
          this.incorrectCntSpan.textContent = this.incorrectCnt;
          console.log(this.correctCntSpan.textContent);
        }
        else if ((this.originX - event.clientX) > 150) {
          document.body.style.backgroundColor = "#97b7b7";
          this.correctCntSpan = document.querySelector('.correct');
          this.incorrectCntSpan = document.querySelector('.incorrect');
          this.incorrectCntSpan.textContent = this.incorrectCnt + 1;
          this.correctCntSpan.textContent = this.correctCnt;
          console.log(this.incorrectCntSpan.textContent);
        }
        else {
          document.body.style.backgroundColor = "#d0e6df";
        }

  }
  hide(){
      this.containerElement.classList.add('inactive');
  }
}
