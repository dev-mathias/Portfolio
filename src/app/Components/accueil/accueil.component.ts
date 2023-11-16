import { AfterViewInit, Component, OnInit } from '@angular/core';
import gsap from 'gsap';

import ScrollTrigger from 'gsap/ScrollTrigger';
import { Dictionnary } from 'src/app/Models/dictionnary';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit, AfterViewInit {
  currentIndex:number = 0;
  carousel!: HTMLElement | null;
  timer!: ReturnType<typeof setInterval>;
  images: HTMLImageElement[] =[];
  projectsDescription:Dictionnary={};
  projectsLink:Dictionnary={};
  constructor() { }
 
 
  
  ngOnInit(): void {
    gsap.registerPlugin(ScrollTrigger);
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
  ngAfterViewInit(): void {
    const first=document.querySelector('.first');
    const second=document.querySelector('.second');
    const third=document.querySelector('.third');
    const TL=gsap.timeline();
    TL
    .from(first,{opacity:0,duration:1},1)
    .from(second,{opacity:0,duration:1.5},2)
    .from(third,{opacity:0,duration:1.5},3);

    const four=document.querySelector('.four');
    const five=document.querySelector('.five');

    gsap.to(five,{
      duration:1.5,
      opacity:1,
      scale:1.25,
      scrollTrigger:{
        trigger:".five",
        markers:true,
        start:"-60% center",
        toggleActions:"play none none reverse",
      }

    })

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
