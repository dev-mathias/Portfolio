import { AfterViewInit, ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { Cible } from './cible';

@Component({
  selector: 'app-aim',
  templateUrl: './aim.component.html',
  styleUrls: ['./aim.component.css']
})
export class AimComponent implements OnInit, AfterViewInit {

  cibles :Cible[]= [];
  currentCible:Cible={} as Cible;
  previousCible:Cible={} as Cible;
  widthViewport:number=0;
  heightViewport:number=0;
  widthCible:number=20; // largeur de la cible
  heightCible:number=20; // hauteur de la cible
  numberCibleWidth:number=0; // nombre de cibles sur la largeur du conteneur
  numberCibleHeight:number=0; // nombre de cibles sur la hauteur du conteneur
  timer:number=10;
  timerRef:number=10;
  oldTimer:number=10;
  count:number=0;
  showStartModal:boolean = true;
  endGame:boolean = false;
  intervalId!:NodeJS.Timer;
  constructor(private cdRef:ChangeDetectorRef) {
    
  }
  ngAfterViewInit(): void {
    this.generateRandomCible();
    
  }

  ngOnInit(): void {
  this.configureGame();
  }
 configureGame(){
  this.widthViewport=window.innerWidth; 
  this.heightViewport=window.innerHeight;
  this.numberCibleHeight=Math.round(this.heightViewport/this.heightCible)-1;
  this.numberCibleWidth=Math.round(this.widthViewport/this.widthCible)-1;
  for(let i=0; i<this.numberCibleHeight;i++){  
    for(let j=0; j<this.numberCibleWidth;j++){
      const cible=new Cible(j,i);
      this.cibles.push(cible);
    }
  }
 }
  generateRandomCible() {
    this.currentCible.x=Math.floor(Math.random()*this.numberCibleWidth);
    this.currentCible.y=Math.floor(Math.random()*this.numberCibleHeight);
    console.log(this.currentCible);
    this.uncolorCible(this.previousCible.x,this.previousCible.y)
    this.colorCible(this.currentCible.x,this.currentCible.y);
  }

  checkTargetHit(event: MouseEvent) {
    const div=event.target as HTMLDivElement;
    const idCible=this.currentCible.y+"/"+this.currentCible.x;
    if(div.id==idCible){
      this.count++;
      this.previousCible.x=this.currentCible.x;
      this.previousCible.y=this.currentCible.y;
      this.generateRandomCible();
    }
  }
  colorCible(x:number,y:number){
    const divId=y+"/"+x;
    const div=document.getElementById(divId);
    if(div)
    {
      div.style.backgroundColor="red";
    }
  }
  uncolorCible(x:number,y:number){
    const divId=y+"/"+x;
    const div=document.getElementById(divId);
    if(div)
    {
      div.style.backgroundColor="transparent";
    }
  }
  start(){
    this.showStartModal=false;
    this.endGame=false;
    this.count=0; 
    this.oldTimer=this.timerRef;
    this.intervalId=setInterval(()=>{
      if(this.timer==0)
      {
        clearInterval(this.intervalId);
        this.stop();
      }
      this.timer--;
    },1000);
  }
  
  onTimerChange($event:any){
    this.timerRef=$event.target.value;
    this.timer=this.timerRef;
  }
  stop(){
    this.endGame=true;
    this.timer=this.timerRef
  }
}
