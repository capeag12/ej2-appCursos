import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Clase } from './clase';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { json } from 'express';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private clases:Clase[]
  private clasesSubject:BehaviorSubject<Clase[]>
  
  constructor() {
    this.clases = []
    Filesystem.readFile({
      path: 'text.json',
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    }).then((result) => {
      console.log(result)
      
      let resultadoJSON = JSON.parse(result.data)
      console.log(resultadoJSON)
      
      for (let i = 0; i < resultadoJSON.length; i++) {
        let clase = resultadoJSON[i]
        this.addClase(new Clase(clase.nombre, clase.puntuacion))
        
      }
      console.log(this.clases)
      
    }).catch((err) => {
      console.log(err)
    });
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
    this.guardarClases()
   }

   guardarClases(){
    Filesystem.writeFile({path:'text.json', data:JSON.stringify(this.clases), directory:Directory.Data,encoding:Encoding.UTF8})
    .then((result) => {
    }).catch((err) => {
      console.log(err)
    });
   }

  eliminarClase(index:number){
    this.clases.splice(index,1)
    this.clasesSubject.next(this.clases)
    this.guardarClases()
  }

  


}
