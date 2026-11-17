import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar', // <--- تأكد إنها موجودة هنا
  imports: [CommonModule, FormsModule],
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  links = ['Main', 'The Projects', 'Contact Us!'];
  isLoggedIn = true;
  username = 'Yaman';
}
