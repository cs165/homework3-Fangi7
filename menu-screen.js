// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement,mainElement, resultElement) {
    this.mainElement = mainElement
    this.containerElement = containerElement;
    this.resultElement = resultElement;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.createDiv = this.createDiv.bind(this);
    this.menuClick = this.menuClick.bind(this);

  }
  createDiv(menuChoice){
    const newdiv = document.createElement('div');
    //use context?
    newdiv.innerHTML = menuChoice.title;
    return newdiv;
  }
   menuClick(){
    console.log(this);
    this.flashcards = new FlashcardScreen(this.mainElement,this.resultElement,this.show);
    this.flashcards.createShow();
    this.hide();
  }
  show(){
    this.containerElement.classList.remove('inactive');
  }
  createShow() {
    var choicesVar = document.querySelector('#choices');
    console.log(choicesVar);
    //create new child
    console.log(FLASHCARD_DECKS.length);
    for(let i = 0; i < FLASHCARD_DECKS.length;i++){
      const newMenu = FLASHCARD_DECKS[i];
      const newDiv = this.createDiv(newMenu);
      console.log(newMenu);
      console.log(newDiv);

      newDiv.addEventListener('click',this.menuClick);
      choicesVar.appendChild(newDiv);
    }

  }

  hide() {
    this.containerElement.classList.add('inactive');
    //newDiv.removeEventListener('click',this.menuClick);
  }
}
