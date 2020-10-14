import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  

  image: string;
  name: string;
  pokemons = [];
  data: any[] = [];
  status: boolean = false;
  details: any;
  detailsImage: any;
  detailsName: any;



  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    let pokemonsData;
    for (let i = this.data.length + 1; i <= this.data.length + 9; i++) {
      this.pokemonService.getPokemons(i).subscribe(res => {
        let abilities = res.abilities.map(ability => {
          return ability.ability.name;
        });
        let stats = this.mapStats(res);
        pokemonsData = {
          image: res.sprites.front_default,
          name: res.name,
          abilities: abilities,
          stats: stats
        };
        this.data.push(pokemonsData);

      }, err => {
        console.log(err);
      });
    };
    
  };

  mapStats(res): any {
    let stats: { [key: string]: string; } = {};
    res.stats.forEach(value => {
      switch (value.stat.name) {
        case "hp": 
        case "attack": 
        case "defense": 
        case "speed": {
          stats[value.stat.name] = value.base_stat;
          break;
        };
        case "special-attack": {
          stats["specialAttack"] = value.base_stat;
          break;
        };
        case "special-defense": {
          stats["specialDefense"] = value.base_stat;
          break;
        };
      };
    });

    stats["weight"] =  res.weight;
    stats["totalMoves"] = res.moves.length;
    return stats;
  };

  morePokemons() {
    this.getPokemons();
  };

  moreType(status, index) {
    let pokemonData = this.data[index];
    this.details = pokemonData.stats;
    this.detailsImage = pokemonData.image;
    this.detailsName = pokemonData.name + " #" + (index + 1);
    this.status = true;
  };

}
