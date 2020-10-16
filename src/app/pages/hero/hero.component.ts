import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.models';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs'

import { info, success } from "../../libs/message"
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  heroe: HeroeModel = new HeroeModel()

  constructor(private heroService: HeroesService,
    private cctivatedRoute: ActivatedRoute) { }



  ngOnInit(): void {

    this.cctivatedRoute.params.subscribe((param) => {
      if (param.id == -1) { return }
      this.getById(param.id)
    })
  }

  getById(id: string) {

    this.heroService.getById(id)
      .subscribe(hero => { this.heroe = hero })
  }
  guardar(form: NgForm) {
    let peticion: Observable<any>

    info("Espere", "Guardando información")
    if (!this.heroe.id) {
      peticion = this.heroService.crear(this.heroe)
    } else {
      peticion = this.heroService.actualizar(this.heroe)
    }
    peticion.subscribe(a => { success(this.heroe.nombre, "Se actualizó") })
  }

}
