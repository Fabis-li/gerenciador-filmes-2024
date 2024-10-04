import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-barra-busca',
  standalone: true,
  imports: [],
  templateUrl: './barra-busca.component.html',
  styleUrl: './barra-busca.component.scss'
})
export class BarraBuscaComponent {
   constructor(private router: Router, private toastrService: ToastrService) { }

   public buscar(query: string): void {
    if(query.length < 1){
      this.toastrService.info('Digite algo para buscar!', 'Busca vazia');
      return;
    };

    this.router.navigate(['/busca'], { queryParams: { query: query } });
  }
}
