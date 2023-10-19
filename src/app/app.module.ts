import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, NgFor } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './Components/accueil/accueil.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShellComponent } from './Components/shell/shell.component';
import { TodoComponent } from './Components/todo/todo.component';
import { LifegameComponent } from './Components/lifegame/lifegame.component';
import { WordleComponent } from './Components/wordle/wordle.component';
import { HttpClientModule } from '@angular/common/http';
import { EndgamemodaleComponent } from './Components/wordle/endgamemodale/endgamemodale.component';
import { UnfoundWordComponent } from './Components/wordle/unfound-word/unfound-word.component';
import { HelpModaleComponent } from './Components/wordle/help-modale/help-modale.component';
import { IntromodaleComponent } from './Components/lifegame/intromodale/intromodale.component';
import { ControlmodaleComponent } from './Components/lifegame/controlmodale/controlmodale.component';
import { JeuMathComponent } from './Components/jeu-math/jeu-math.component';
import { HelpComponent } from './Components/jeu-math/help/help.component';
import { EndGameComponent } from './Components/jeu-math/end-game/end-game.component';
import { AimComponent } from './Components/aim/aim.component';
import { StartModalComponent } from './Components/aim/start-modal/start-modal.component';
import { EndModalComponent } from './Components/aim/end-modal/end-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ShellComponent,
    TodoComponent, 
    LifegameComponent, 
    WordleComponent, 
    EndgamemodaleComponent, 
    UnfoundWordComponent, 
    HelpModaleComponent, 
    IntromodaleComponent, 
    ControlmodaleComponent, 
    JeuMathComponent, 
    HelpComponent, EndGameComponent, AimComponent, StartModalComponent, EndModalComponent, 
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    CommonModule,
    NgFor, HttpClientModule, ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
