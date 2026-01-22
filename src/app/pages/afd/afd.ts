import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Canvas } from '../../component/canvas/canvas';

@Component({
  selector: 'app-afd',
  standalone: true,
  imports: [RouterLink, Canvas],
  templateUrl: './afd.html',
  styleUrls: ['./afd.css'],
})
export class Afd {

}
