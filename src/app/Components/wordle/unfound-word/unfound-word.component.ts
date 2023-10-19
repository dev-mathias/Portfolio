import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-unfound-word',
  templateUrl: './unfound-word.component.html',
  styleUrls: ['./unfound-word.component.css']
})
export class UnfoundWordComponent implements OnInit {
  @Input() unknownWord:boolean=false;
  @Output() continueClicked= new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  Continue(){
    this.continueClicked.emit();
  }
}
