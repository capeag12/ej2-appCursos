import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import { ServicioService } from 'src/app/modelo/servicio.service';
import { Clase } from 'src/app/modelo/clase';

@Component({
  standalone:true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'clase-comp',
  templateUrl: './clase-comp.component.html',
  styleUrls: ['./clase-comp.component.scss'],
})
export class ClaseCompComponent implements OnInit {
  @Input() indice = -1;
  clase:Clase = new Clase("",0)
  constructor(private servicio:ServicioService) {
    
   }

  ngOnInit() {
    this.clase = this.servicio.getClase(this.indice)
  }

}
