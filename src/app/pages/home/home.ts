import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../../component/card/card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Card],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
