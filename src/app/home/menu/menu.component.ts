import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Routes, Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,NgIf],
  providers: [AuthService],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  token: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token == null) {
      this.router.navigate(['/home/body']);
    }
  }
  logout(): void {
    localStorage.clear();
    window.location.reload();
  }
}

