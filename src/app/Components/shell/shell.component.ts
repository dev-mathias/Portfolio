import { AfterViewChecked, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Dictionnary } from 'src/app/Models/dictionnary';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit, AfterViewChecked { 
  myValue:string ="";
  messages:string[]=[];
  map:Dictionnary={};

  constructor(private router: Router) { }

  ngAfterViewChecked(): void {
    this.focusInput();
  }

  ngOnInit(): void {
    this.map={
      'help':'- <b>help</b> : display all available commands <br>- <b>about</b> : see who i am<br>- <b>skills</b> : check out my IT skills<br> - <b>softskills</b> : see my softskills <br>- <b>contact</b> : contact info<br>- <b>clear</b> : clear the terminal<br>- <b>exit</b> : go back to the normal view <br>- <b>wordle</b> : open a mini-game <br>- <b>todo</b> : open a little todo app <br>-<b> makeitten</b> : open a simple game' ,
      'about':'During my career transition, I started a bachelor\'s degree in IT management (2 years) to acquire a solid foundation in IT. Unfortunately, due to the Covid crisis, I had to drop out and return to my previous job. However, my strong desire to work in development led me to resume my studies in April 2022 through a training program offered by Technofutur, focusing on .NET development (C#). This training experience reaffirmed my passion for programming. Being self-taught and naturally curious, I enjoy learning about new technologies.',
      'skills':' -Html/css <br>-Javascript/Typescript<br> -Framework .Net (Web api, ASP.net core, Entity Framework, ...)<br> -Angular <br> -Github',
      'contact':' You can easily contact me via my email : dewalquemathias@gmail.com ',
      'softskills': '-Teamwork<br>-Empathy<br>-Curious / desire to learn / selftaught'
    }
    this.messages.push("Welcome to my portfolio ! Use the 'help' command  to see all available commands. </br>If you want to exit and go to a normal view type 'exit'. "); 
    this.focusInput();
    
    
  }
  public focusInput(){
    let input=document.getElementById("userInput");
    input?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    input?.focus();
  }
  public onInput(event:any){
    let flag:boolean=false;
    if(event.key=='Enter'){
      for(let key in this.map){
        if(this.map.hasOwnProperty(key) && key===this.myValue){ // si la commande est bien dans le dico 
          this.messages.push("notroot@localhost$  "+this.myValue);
          this.messages.push(this.map[key]);   
          flag=true;
        }
      }
      if(this.myValue==='clear')
      {
        this.messages.splice(1,this.messages.length);
        flag=true;
      }
      if(this.myValue==='exit'){
        this.router.navigate(['/Accueil']);
      }
      if(this.myValue==='wordle'){
        
        this.router.navigate(['/Wordle']);
      }
      if(this.myValue==='todo'){
        
        this.router.navigate(['/Todo']);
      }
      if(this.myValue==='makeitten'){
        
        this.router.navigate(['/JeuMath']);
      }
      if(this.myValue==="") 
      {
        this.messages.push("notroot@localhost$");
        flag=true;
      }
      if(!flag){
        this.messages.push("notroot@localhost$ "+this.myValue);
        this.messages.push("Unknow command. Type 'help' to see all available commands");
      }
      this.myValue="";
      this.focusInput();
    }
  }


  
  
}
