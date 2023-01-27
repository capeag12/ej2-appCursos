import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Clase } from '../modelo/clase';
import { ServicioService } from '../modelo/servicio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listaClases:Clase[] = []
  formAdd: FormGroup;
  nombreAsignatura:FormControl
  puntuación:FormControl
  oculto:boolean=false


  constructor(private servicio:ServicioService) {
    servicio.getClasesObservable().subscribe(lista => this.listaClases = lista)
    this.nombreAsignatura = new FormControl("",[Validators.required, Validators.minLength(5)])
    this.puntuación = new FormControl("",[Validators.required])
    this.formAdd = new FormGroup({nombre:this.nombreAsignatura, puntuacion:this.puntuación})
    
  }

  addClase(){
    let clase:Clase = new Clase(this.nombreAsignatura.value, this.puntuación.value)
    this.servicio.addClase(clase)
    this.formAdd.reset()
  }

  ocultarODesocultar(){
    this.oculto = !this.oculto
  }

}
