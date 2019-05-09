// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement,resultElement,menushow) {
    this.correctCnt = 0;
    this.incorrectCnt = 0;
    this.totalCnt = 0;
    this.cardArr = new Array();
    this.menushow = menushow;

    this.correctCntSpan = document.querySelector('.correct');
    this.incorrectCntSpan = document.querySelector('.incorrect');
    this.correctCntSpan.textContent = this.correctCnt;
    this.incorrectCntSpan.textContent = this.incorrectCnt;
    this.resultElement = resultElement;
    this.containerElement = containerElement;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.judgeAns = this.judgeAns.bind(this);
    this.getNextCard = this.getNextCard.bind(this);
  }
  judgeAns(ans){
    console.log(this);
    console.log(this.correctCntSpan);
    console.log(this.correctCnt);
    if(ans == 'right') this.correctCnt++;
    else if(ans == 'wrong') this.incorrectCnt++;

    this.correctCntSpan.textContent = this.correctCnt;
    this.incorrectCntSpan.textContent = this.incorrectCnt;

  }
  getNextCard(nowCardNum){
    if(nowCardNum == 'continue'){
      this.correctCnt = 0;
      this.incorrectCnt = 0;
      this.correctCntSpan.textContent = this.correctCnt;
      this.incorrectCntSpan.textContent = this.incorrectCnt;
      this.getNextCard(0);
      return;
    }
    else if(nowCardNum == 'restart'){
      this.correctCnt = 0;
      this.incorrectCnt = 0;
      for(let i=0;i<this.cardArr.length;i++){
        this.cardArr[i][2]='wrong';
      }
      this.correctCntSpan.textContent = this.correctCnt;
      this.incorrectCntSpan.textContent = this.incorrectCnt;
      this.getNextCard(0);
      return;
    }
    else if(nowCardNum >= this.cardArr.length) {
        const result = new ResultsScreen(this.resultElement,this.getNextCard,this.containerElement,this.menushow,this.hide);
        this.containerElement.style.display = 'none';
        result.show(this.correctCnt,this.incorrectCnt);
        return;
    }

    else if(this.cardArr[nowCardNum][2]=='right'){
      console.log('this card rigth, should not display');
      nowCardNum++;
      this.getNextCard(nowCardNum);
      return;
    }
    const flashcardContainer = document.querySelector('#flashcard-container');
    console.log(nowCardNum);
    console.log(this.cardArr);
    const card = new Flashcard(flashcardContainer,this.cardArr[nowCardNum][0],this.cardArr[nowCardNum][1], this.judgeAns, this.correctCnt, this.incorrectCnt, this.getNextCard, nowCardNum,this.cardArr);
    console.log(card);
    console.log("NEW CARD");
  }
  show(){
      this.containerElement.classList.remove('inactive');
  }
  createShow() {
    this.containerElement.classList.remove('inactive');
    const targetTitle = event.srcElement.innerHTML;
    console.log(event);
    console.log('#'+targetTitle+'#');
      for(let i=0;i<FLASHCARD_DECKS.length;i++){
      if(FLASHCARD_DECKS[i].title == targetTitle){
        const word_obj = FLASHCARD_DECKS[i]['words'];
        console.log(FLASHCARD_DECKS[i]['words']);
        var j=0;
        for(let key in word_obj){
          //console.log(key);
          this.cardArr[j] = new Array();
          this.cardArr[j][0] = key;
          this.cardArr[j][1] =  word_obj[key];
          this.cardArr[j][2] = 'wrong';
          j++;
        }
        this.totalCnt = j-1;
        console.log(this.cardArr);
        console.log(this.totalCnt);
        console.log(this.cardArr.length);
        this.getNextCard(0);
      }
    }
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
