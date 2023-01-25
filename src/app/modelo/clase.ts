export class Clase {
    private nombre:string;
    private puntuacion:number;
    
    constructor(nombre:string, puntuacion:number) {
        this.nombre=nombre
        this.puntuacion=puntuacion
    }

    
    public get Nombre() : string {
        return this.nombre
    }

    
    public get Puntuacion() : number {
        return this.puntuacion;
    }
    
    
}
