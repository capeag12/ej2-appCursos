import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Clase } from './clase';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private clases:Clase[]
  private clasesSubject:BehaviorSubject<Clase[]>
  
  constructor() {
    this.clases = []
    this.clases.push(new Clase("Matemáticas",7))
    this.clases.push(new Clase("Lengua",6))
    this.clasesSubject = new BehaviorSubject<Clase[]>(this.clases)
   }

   getClasesObservable():Observable<Clase[]>{
    return this.clasesSubject.asObservable();
   }

   getClase(index:number):Clase{
    return this.clases[index]
   }

   addClase(clase:Clase){
    this.clases.push(clase)
    this.clasesSubject.next(this.clases)
   }


}
