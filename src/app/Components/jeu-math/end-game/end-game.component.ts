import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css']
})
export class EndGameComponent implements OnInit {

  @Input() showEndModal:boolean=false;
  @Output() closeClicked=new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  closeEndModal()  {
    this.closeClicked.emit();
  }
}
