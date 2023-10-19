import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  @Input() showHelpModal:boolean=false;
  @Output() closeClicked=new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  closeHelpModal()  {
    this.closeClicked.emit();
  }
}
