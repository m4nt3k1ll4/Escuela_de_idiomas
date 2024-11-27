import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  constructor(private router: Router) {}
  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
