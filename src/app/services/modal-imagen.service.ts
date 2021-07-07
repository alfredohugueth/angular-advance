import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  private _ocultarModal : boolean = true;
  public tipo! : string;
  public id! : string | undefined;
  public img! : string | undefined;

  get ocultarModal()
  {
    return this._ocultarModal;
  }

  abrirModal( tipo : 'usuarios' | 'medicos' | 'hospitales',
              id : string | undefined,
              img? : string )
  {
    this._ocultarModal = false;
    this.tipo = tipo;
    this.id = id;
    this.img = img;

  }

  cerrarModal()
  {
    this._ocultarModal = true;
  }

  constructor() { }
}
