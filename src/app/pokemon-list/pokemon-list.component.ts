
import { DataService } from './../services/data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] =[]; //tipo arrat =inicialmente vazio
  page = 1;
  totalPokemons!: number;

  
  constructor(private dataService:DataService ) { }

  ngOnInit(): void {
  this.getPokemons();
  }

  getPokemons(){
    this.dataService.getPokemon(12, this.page + 12).subscribe((response: any) => {
      this.totalPokemons = response.count;

      const array: any[] = response.results;
      array.forEach(result => {
        this.dataService.getMoreData(result.name)
        .subscribe((uniqResponse:any)=> {
          this.pokemons.push(uniqResponse);
          console.log(this.pokemons);
        });
      });
    });
  }

}
