import { Component } from '@angular/core';
import { Clase } from '../modelo/clase';
import { ServicioService } from '../modelo/servicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaClases:Clase[] = []
  constructor(private servicio:ServicioService) {
    servicio.getClasesObservable().subscribe(lista => this.listaClases = lista)
  }

}
