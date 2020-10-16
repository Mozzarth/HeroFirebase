import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.models';
import { config } from 'rxjs';


const url = "https://heroe-crud-angular.firebaseio.com"


@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get(`${url}/heroes.json`).pipe(map(this.getArrayHero))
  }
  private getArrayHero(hero: Object) {
    const heroes: HeroeModel[] = []
    if (!hero) { return heroes }
    Object.keys(hero).forEach(key => {
      const heroe: HeroeModel = hero[key]
      heroe.id = key
      heroes.push(heroe)
    })

    return heroes
  }
  getById(id: string) {
    return this.http.get(`${url}/heroes/${id}.json`).pipe(
      map(
        (hero: HeroeModel) => {
          hero.id = id
          return hero
        })
    )
  }

  crear(hero: HeroeModel) {
    return this.http
      .post(`${url}/heroes.json`, hero)
      .pipe(map((id: any) => {
        hero.id = id.name
        return hero
      }))
  }

  actualizar(hero: HeroeModel) {
    const heroeTemp = { ...hero }
    delete heroeTemp.id
    return this.http.put(`${url}/heroes/${hero.id}.json`, heroeTemp)
  }

  anular(heroId: string) {
    return this.http.delete(`${url}/heroes/${heroId}.json`)
  }

}
