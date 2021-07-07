import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal : boolean = true;
  public tipo! : 'usuarios' | 'medicos' | 'hospitales';
  public id! : string | undefined;
  public img! : string | undefined;
  public base_url : string = environment.base_url;


  public nuevaImagen : EventEmitter<string> = new EventEmitter<string>()

  get ocultarModal()
  {
    return this._ocultarModal;
  }

  abrirModal( tipo : 'usuarios' | 'medicos' | 'hospitales',
              id : string | undefined,
              img : string = 'x' )
  {
    
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

    if ( img.includes( 'https' ) )
    {
      
      this.img = img;
    
    }
    else
    {
      
      this.img = `${ this.base_url }/upload/${ tipo }/${ img }`;

    }

  }

  cerrarModal()
  {
    this._ocultarModal = true;
  }

  constructor() { }
}
