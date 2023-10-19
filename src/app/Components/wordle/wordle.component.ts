import {  Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { WordService } from 'src/app/Services/word.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent implements OnInit{
  @ViewChildren('inputRef') inputs!: QueryList<ElementRef> ;
  word:string="";
  words:string[]=[];
  dico:string[]=[];
  userGuess: string[] =[];
  userGuesses: string[][] = [];
  letters: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  wordFound:boolean=false;
  unknownWord:boolean=false;
  globalIndex:number=0;
  showEndGameModal:boolean=false;
  showHelpModal:boolean=false;
 

  constructor(private wordService: WordService,private router:Router,) { }
  

ngOnInit(): void {
  this.wordService.getWords().subscribe(data => {
    this.words = data.split('\n');
    this.word=this.getRandomWord();
    this.userGuesses = new Array(5).fill(null).map(() => new Array(this.word.length).fill(''));
    this.userGuess = new Array(this.word.length).fill(''); 
  });
  this.wordService.getAllWords().subscribe(data=>{
    this.dico=data.split("\n");
  })
  
    
}
getRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * this.words.length);
  return this.words[randomIndex];
}
trackByFn(index: number, item: any): number {
  return index;
}

testKeyUp(charIndex: number, attemptIndex: number, $event: KeyboardEvent) {
  const letterPattern = /^[a-zA-Z]$/;
  if (letterPattern.test($event.key)) {
      this.handleValidKeyPress(charIndex, attemptIndex);
  } else if ($event.key == 'Backspace') {
      this.handleBackspaceKeyPress(charIndex, attemptIndex);
  }else{
    this.handleUnvalidKeyPress(charIndex,attemptIndex);
  }
  
}
handleUnvalidKeyPress(charIndex: number, attemptIndex: number) {
  const globalIndex = this.calculateGlobalIndex(attemptIndex, charIndex);
  const actualInput = this.getInput(globalIndex);
  actualInput.value="";
}
handleValidKeyPress(charIndex: number, attemptIndex: number) {
   
    const globalIndex = this.calculateGlobalIndex(attemptIndex, charIndex);
    const actualInput = this.getInput(globalIndex);
     if(globalIndex!=24){
      const nextInput = this.getInput(globalIndex + 1);
     if (this.isEndOfLine(globalIndex)) {
         this.handleEndOfLine(attemptIndex, actualInput, nextInput,globalIndex);
     } else {
         this.disableInput(actualInput);
         setTimeout(() => {
             this.enableInput(nextInput);
             nextInput.focus();
         }, 10);
    } 
     }else{
      this.verify(attemptIndex);
     }
      
}
handleBackspaceKeyPress(charIndex: number, attemptIndex: number) {
    const globalIndex = this.calculateGlobalIndex(attemptIndex, charIndex);
    const actualInput = this.getInput(globalIndex);
    const prevInput = this.getInput(globalIndex - 1);
    if (charIndex != 0) {
        prevInput.value = "";
        this.enableInput(prevInput);
        prevInput.focus();
        this.disableInput(actualInput);
    }
}
handleEndOfLine(attemptIndex: number, actualInput: any, nextInput: any, globalIndex:number) {
    if (!this.verifyword(attemptIndex)) {
        this.unknownWord=true;
        this.globalIndex=globalIndex;
        const previousInputsRef = this.inputs.toArray().slice(globalIndex - 4, globalIndex + 1);
        for (let inputRef of previousInputsRef) {
            const input = inputRef.nativeElement as HTMLInputElement;
            input.value = "";
            this.disableInput(input);
        }
        
    } else {
        this.verify(attemptIndex);
        this.disableInput(actualInput);
        if(globalIndex!=24){
          this.enableInput(nextInput);
          nextInput.focus();
        }
    }
}
calculateGlobalIndex(attemptIndex: number, charIndex: number): number {
    return attemptIndex * this.word.length + charIndex;
}
isEndOfLine(globalIndex: number): boolean {
    return [4, 9, 14, 19, 24].includes(globalIndex);
}
getInput(globalIndex: number): HTMLInputElement {
    return this.inputs.toArray()[globalIndex].nativeElement as HTMLInputElement;
}
disableInput(input: HTMLInputElement) {
    input.disabled = true;
}
enableInput(input: HTMLInputElement) {
    input.disabled = false;
}
verifyword(attemptIndex:number):boolean{
    let word : string ="";
    this.userGuesses[attemptIndex].forEach(e=>{
      word=word+e;
    })
    if(!this.dico.includes(word)){
      return false
    }
    else return true;
}
verify( attemptIndex:number) {
      for (let i = 0; i < this.word.length; i++) {
        const inputId = `input_${attemptIndex}_${i}`;
        if (this.userGuesses[attemptIndex][i] === this.word[i]) {
            let input =document.getElementById(inputId);
            if(input) {
              input.style.backgroundColor="green";
              input.style.color="black";
            }
            let span=document.getElementById(this.userGuesses[attemptIndex][i]);
            if(span) span.style.backgroundColor="green";
        } else if (this.word.includes(this.userGuesses[attemptIndex][i])) {
            let input =document.getElementById(inputId);
            if(input)  {
              input.style.backgroundColor="yellow";
              input.style.color="black";
            }
            let span=document.getElementById(this.userGuesses[attemptIndex][i]);
          if(span) span.style.backgroundColor="yellow";
        } else {
          let input =document.getElementById(inputId);
          if(input)
          {
            input.style.backgroundColor="red";
            input.style.color="black";
          }  
          let span=document.getElementById(this.userGuesses[attemptIndex][i]);
          if(span) span.style.backgroundColor="black";
        }
        if (this.userGuesses[attemptIndex].join('') === this.word) {
          this.wordFound = true;
          this.showEndGameModal = true;
        } else if (attemptIndex === 4) {
          this.showEndGameModal = true;
        }
      }
}
Continue(): void {
    this.unknownWord = false;
    const returnInput = this.getInput(this.globalIndex - 4);
    this.enableInput(returnInput);
    returnInput.focus();
}
restartGame(): void {
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([this.router.url]);
}
openHelpModal(){
  this.showHelpModal=true;
}
closeHelpModal(){
  this.showHelpModal=false;
}
}