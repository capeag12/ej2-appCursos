import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Clase } from '../modelo/clase';
import { ServicioService } from '../modelo/servicio.service';
import { Camera } from '@capacitor/camera';
import { CameraResultType, Photo } from '@capacitor/camera/dist/esm/definitions';
import { Directory, Filesystem } from '@capacitor/filesystem';
@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  id:number=-1
  path:string=""
  clase:Clase
  base:string =""
  storage:string ="saved-imgs"
  constructor(private router:ActivatedRoute, private servicio:ServicioService,private navCtrl: NavController) {
    this.path = "../"
    this.clase= servicio.getClase(this.id)
  }

  ngOnInit() {
    this.router.params.subscribe(params => this.id=params['id'])
    console.log(this.id)
    this.clase = this.servicio.getClase(this.id)
    this.path = ""
    this.leerFoto()
    
  }

  eliminar(){
    this.servicio.eliminarClase(this.id)
    this.navCtrl.back();
  }

  async fotografiar(){
    try {
      let img = await Camera.getPhoto({
        quality:100,
        allowEditing:false,
        resultType:CameraResultType.Uri,
      })
  
      const nombre = `img${this.id}.png`
      const base64 =await this.readAsBase64(img)
      console.log(base64)
      
      let guardado = await Filesystem.writeFile(
        {
          directory:Directory.Data,
          path:`${this.storage}/${nombre}`,
          data: base64
        }
      )
    } catch (error) {
      this.path = "../../assets/img/noimg.png"
    }
    

    this.leerFoto()
  }

  async leerFoto(){
    const nombre = `img${this.id}.png`
    const path = `${this.storage}/${nombre}`
    try {
      let file = await Filesystem.readFile({
        directory:Directory.Data,
        path:path
      })
      this.base = "foto leida"
  
      let datos = `data:image/png;base64,${file.data}`
      this.path = datos
    } catch {
      this.path = "../../assets/img/noimg.png"
    }
    
    
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    this.base = "leido"
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;
  }
  
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    this.base = "convert"
    reader.readAsDataURL(blob);
  });

}
