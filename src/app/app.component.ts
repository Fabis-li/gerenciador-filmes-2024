import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilmeService } from './services/filme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private filmeService: FilmeService) { }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  


}
