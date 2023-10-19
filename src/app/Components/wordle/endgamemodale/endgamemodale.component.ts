import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-endgamemodale',
  templateUrl: './endgamemodale.component.html',
  styleUrls: ['./endgamemodale.component.css']
})
export class EndgamemodaleComponent implements OnInit {
  @Input() wordFound:boolean=false;
  @Input() showEndGameModal:boolean=false;
  @Input() word:string="";
  @Output() restartClicked=new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  restartGame(){
    this.restartClicked.emit();
  }
}
