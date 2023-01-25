import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clase } from '../modelo/clase';
import { ServicioService } from '../modelo/servicio.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  id:number=-1
  clase:Clase
  constructor(private router:ActivatedRoute, private servicio:ServicioService) {
    this.clase= servicio.getClase(this.id)
  }

  ngOnInit() {
    this.router.params.subscribe(params => this.id=params['id'])
    console.log(this.id)
    this.clase = this.servicio.getClase(this.id)
  }

}
