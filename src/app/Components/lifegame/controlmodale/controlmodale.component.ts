import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-controlmodale',
  templateUrl: './controlmodale.component.html',
  styleUrls: ['./controlmodale.component.css']
})
export class ControlmodaleComponent implements OnInit {
  @Input() openMenu:boolean=false;
  @Input() intervalId:NodeJS.Timer | null = null;
  @Output() closeClicked=new EventEmitter<void>();
  @Output() playClicked=new EventEmitter<void>();
  @Output() pauseClicked=new EventEmitter<void>();
  @Output() updateClicked=new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    this.openMenu=true;
  }
  closeMenu(){
    this.closeClicked.emit();
  }
  Play(){
    this.playClicked.emit();
  }
  Pause(){
    this.pauseClicked.emit();
  }
  Update(){
    this.updateClicked.emit();
  }
}
