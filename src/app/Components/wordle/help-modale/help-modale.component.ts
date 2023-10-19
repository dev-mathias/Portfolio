import { Component, EventEmitter, Input,Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-modale',
  templateUrl: './help-modale.component.html',
  styleUrls: ['./help-modale.component.css']
})
export class HelpModaleComponent implements OnInit {

  @Input() showHelpModal:boolean=false;
  @Output() closeClicked=new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }
  closeHelpModal()  {
    this.closeClicked.emit();
  }
}
