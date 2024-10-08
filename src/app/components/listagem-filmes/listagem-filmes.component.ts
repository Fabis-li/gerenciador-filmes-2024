import { Component, OnInit } from '@angular/core';
import { FilmeService } from '../../services/filme.service';
import { ListagemFilme } from '../../models/listagem-filme.model';
import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FilmeFavorito } from '../../models/filme-favorito.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { FilmesFavoritosComponent } from "../filmes-favoritos/filmes-favoritos.component";
import { BarraBuscaComponent } from "../barra-busca/barra-busca.component";

@Component({
  selector: 'app-listagem-filmes',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgClass,
    RouterLink,
    FilmesFavoritosComponent,
    BarraBuscaComponent
  ],
  templateUrl: './listagem-filmes.component.html',
  styleUrl: './listagem-filmes.component.scss'
})
export class ListagemFilmesComponent implements OnInit {
  public filmes: ListagemFilme[];

  public filmesFavoritos: FilmeFavorito[];

  private pagina: number;

  public carregandoListagem: boolean;

  constructor(private filmeService: FilmeService, private localStorageService: LocalStorageService) {
    this.filmes = [];
    this.filmesFavoritos = [];
    this.pagina = 1;
    this.carregandoListagem = false;
  }

  ngOnInit(): void {
    this.buscarFilmesPopulares();

    this.filmesFavoritos = this.localStorageService.obterFavoritos();
  }

  public buscarFilmesPopulares() {
    this.carregandoListagem = true;

    this.filmeService.selecionarFilmesPopulares(this.pagina).subscribe((response) => {
      const resultados = response.results as any[];

      const filmesMapeados = resultados.map(this.mapearListagemFilmes);

      this.filmes.push(...filmesMapeados);

      this.pagina++;

      this.carregandoListagem = false;
    });
  }

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);

    if(numeroNota > 0 && numeroNota <= 30) return 'app-borda-nota-mais-baixa';
    else if(numeroNota > 30 && numeroNota <= 50) return 'app-borda-nota-baixa';
    else if(numeroNota > 50 && numeroNota <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }

  private mapearListagemFilmes(obj:any): ListagemFilme {
    return{
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      urlImagem:'https://image.tmdb.org/t/p/w500/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
    }
  }
}
