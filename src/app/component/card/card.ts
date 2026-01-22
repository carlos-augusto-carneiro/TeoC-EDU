import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() route: string = ''; // O link para onde o botão vai
  @Input() buttonText: string = 'Saiba Mais →'; // Valor padrão
}
