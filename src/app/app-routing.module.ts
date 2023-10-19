import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './Components/accueil/accueil.component';
import { ShellComponent } from './Components/shell/shell.component';
import { TodoComponent } from './Components/todo/todo.component';
import { LifegameComponent } from './Components/lifegame/lifegame.component';
import { WordleComponent } from './Components/wordle/wordle.component';
import { ControlmodaleComponent } from './Components/lifegame/controlmodale/controlmodale.component';
import { JeuMathComponent } from './Components/jeu-math/jeu-math.component';
import { AimComponent } from './Components/aim/aim.component';

const routes: Routes = [
  {path: "Accueil", component:AccueilComponent},
  {path:"Lifegame", component:LifegameComponent},
  {path:"Todo", component:TodoComponent},
  {path:"", component:ShellComponent},
  {path:"Shell", component:ShellComponent},
  {path:"Wordle", component:WordleComponent},
  {path:"control", component:ControlmodaleComponent},
  {path:"JeuMath", component:JeuMathComponent},
  {path:"Aim", component:AimComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
