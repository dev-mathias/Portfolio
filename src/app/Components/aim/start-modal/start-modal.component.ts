import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-start-modal',
  templateUrl: './start-modal.component.html',
  styleUrls: ['./start-modal.component.css']
})
export class StartModalComponent implements OnInit {
  @Input() showRecap!:boolean;
  @Input() count!:number;
  @Input() timer!:number;
  @Input() oldTimer!:number;
  @Output() playClicked=new EventEmitter<void>();
  @Output() timerChanged= new EventEmitter<number>();
  @Output() lvlChanged=new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }
  onInputChange($event:any){
    this.timerChanged.emit($event)
  }
  start(){
    this.playClicked.emit();
  }
}
