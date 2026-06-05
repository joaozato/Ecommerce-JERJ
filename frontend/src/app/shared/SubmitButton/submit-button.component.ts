import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'submit-button', // Nome que precisa ser utilizado no html -> <submit-button>
  templateUrl: './submit-button.component.html',
  imports: [
    CommonModule
  ]
})
export class SubmitButtonComponent {

  // Texto que aparece no botão
  @Input() label: string = 'Enviar';

  // Tipo do botão: submit, button ou reset
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  // Desabilitar botão
  @Input() disabled: boolean = false;

  // Cor do botão
  @Input() color: 'blue' | 'green' | 'red' | 'orange' = 'blue';

  // Computa classes dinamicamente
  get buttonClasses(): string {
    const base = 'text-white font-bold py-2 px-4 rounded disabled:opacity-50';
    const colors: any = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      red: 'bg-red-500 hover:bg-red-600',
      orange: 'bg-orange-500 hover:bg-orange-600'
    };
    return `${base} ${colors[this.color]}`;
  }
}
