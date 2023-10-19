import { Component, OnInit } from '@angular/core';
import { Dictionnary } from 'src/app/Models/dictionnary';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  currentIndex:number = 0;
  carousel!: HTMLElement | null;
  timer!: ReturnType<typeof setInterval>;
  images: HTMLImageElement[] =[];
  projectsDescription:Dictionnary={};
  projectsLink:Dictionnary={};
  constructor() { }

  ngOnInit(): void {
    this.projectsDescription={
      "Todo App":"A little todo App ",
      "Wordle":" It's a little game. Players try to guess a five-letter word within five attempts. After each guess, the game provides feedback by color-coding the letters.",
      "Make it to 10!": "It's a simple game. You just have to complete the equations to make them equal 10.",
      "Test your aim": "Test or improve your aim"
    }
    this.projectsLink={
      "Todo App" :"/Todo",
      "Wordle":"/Wordle",
      "Make it to 10!":"/JeuMath",
      "Test your aim":"/Aim",
      "Github": ""
    };
    this.carousel= document.querySelector('.carousel');
    if(this.carousel){
      this.images=Array.from(this.carousel!.querySelectorAll('img'));
    }
    if(this.images.length>0){
      this.startCarousel();
    }
  }
  
  showImage(index: number): void {
    this.carousel!.style.transform = `translateX(-${index * 100}%)`;
  }
  
  nextImage(): void {
    
    this.currentIndex++;
    if (this.currentIndex >= this.images.length) {
      this.currentIndex = 0;
    }
    this.showImage(this.currentIndex);
  }
  
   prevImage(): void {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.images!.length - 1;
    }
    this.showImage(this.currentIndex);
  }
  
  startCarousel(): void {
    
    this.timer = setInterval(this.nextImage.bind(this), 1500);
    //this.timer = setInterval(this.nextImage, 1000);
  }
  
  stopCarousel(): void {
    clearInterval(this.timer);
  }
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  goToExternalSite(){
    window.location.href="https://github.com/dev-mathias"
  }
}
