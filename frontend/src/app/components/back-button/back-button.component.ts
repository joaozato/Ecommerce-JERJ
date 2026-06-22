import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  standalone: true,
  templateUrl: './back-button.component.html'
})
export class BackButtonComponent {

  constructor(
    private location: Location,
    private router: Router,
  ) {}

  back(): void {
    if (window.history.length > 1) { // Verifica se existe um histórico de navegação
      this.location.back();
    } else {
      this.router.navigate(['/admin/dashboard']);
    }
  }

}
