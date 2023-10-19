import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Portfolio';
  constructor(private router: Router) {}
  isTerminalComponent(): boolean {
    const currentRoute = this.router.routerState.snapshot.url;
    return currentRoute === '/Shell'; 
  }

}
