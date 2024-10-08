import { Component} from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ResultadoBuscaFilme } from '../../models/resultado-busca-filme.model';
import { ListagemFilme } from '../../models/listagem-filme.model';
import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BarraBuscaComponent } from '../barra-busca/barra-busca.component';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, RouterLink, BarraBuscaComponent],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss'
})
export class BuscaComponent {
  public resultadoBusca?: ResultadoBuscaFilme;

  public maximoPaginasAlcancado: boolean = false;


  constructor(private route: ActivatedRoute, private filmeService: FilmeService) {
    route.queryParams.subscribe((params) => {
      this.buscar(params['query']);
    })
  }

  public buscar(query:string, pagina: number = 1): void {
    if(query.length < 1) return;

    // this.maximoPaginasAlcancado = false;

    this.filmeService.buscarFilmes(query, pagina).subscribe((res) => {
      const novoResultado = this.mapearResultadoBusca(res);

      // if(this.resultadoBusca){
      //   if(pagina >= this.resultadoBusca?.quantidadePaginas){
      //     this.maximoPaginasAlcancado = true;
      //   }

      //   this.resultadoBusca.pagina = novoResultado.pagina;
      //   this.resultadoBusca.filmes.push(...novoResultado.filmes);
      // } else {
        this.resultadoBusca = novoResultado;
      // }
    });
  }

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);

    if(numeroNota > 0 && numeroNota <= 30) return 'app-borda-nota-mais-baixa';
    else if(numeroNota > 30 && numeroNota <= 50) return 'app-borda-nota-baixa';
    else if(numeroNota > 50 && numeroNota <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }

  private mapearResultadoBusca(obj: any): ResultadoBuscaFilme {
    return {
      pagina: obj.page,
      quantidadePaginas: obj.total_pages,
      quantidadeResultados: obj.total_results,
      filmes: obj.results.map(this.mapearListagemFilme)
    }
  }

  private mapearListagemFilme(obj: any): ListagemFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: obj.release_date ? formatDate(obj.release_date, 'mediumDate', 'pt-BR') : 'Sem data de lançamento',
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
    }
  }
}
