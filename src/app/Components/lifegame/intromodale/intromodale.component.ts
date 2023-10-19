import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';

@Component({
  selector: 'app-intromodale',
  templateUrl: './intromodale.component.html',
  styleUrls: ['./intromodale.component.css']
})
export class IntromodaleComponent implements OnInit {
  @Input() openModal:boolean=true;
  @Output() continueClicked=new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  Continue()
  {
    this.continueClicked.emit();
  }
}
