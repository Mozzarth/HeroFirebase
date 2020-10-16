import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.models';
import { HeroesService } from 'src/app/services/heroes.service';

import { crud } from '../../libs/message'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: HeroeModel[]
  loadyng = true

  constructor(
    private heroService: HeroesService,
    private route: Router) { }

  ngOnInit(): void {
    this.cargarHeroes()
  }

  cargarHeroes() {
    this.heroService.get()
      .subscribe(data => {
        this.heroes = data
        this.loadyng = false
      }, console.log)
  }
  async remove(id: string) {
    let res = await crud("Eliminar", "¿Desea anular el registro?")
    if (!res.isConfirmed) { return }
    this.heroService.anular(id)
      .subscribe(a => this.cargarHeroes(), console.log)
  }

  edit(id: string) {
    this.route.navigate(["/hero", id])
  }
}
