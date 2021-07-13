import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public base_url = environment.base_url;
  constructor() 
  {       }

  async actualizarFoto(
    archivo : File,
    tipo : 'usuarios' | 'medicos' | 'hospitales',
    id : string
  )
  {
    try 
    {
      
      /* Creamos el formulario para el envió de la data y el url al que sera enviada*/
      const url = `${ this.base_url }/upload/${ tipo }/${ id }`
      const formData = new FormData();
      formData.append( 'imagen', archivo );

      /* Realizamos la petición */
      const resp = await fetch( url, {
        method : 'PUT',
        headers : {
          'x-token' : localStorage.getItem( 'token' ) || ''
        },
        body : formData
      });

      const data = await resp.json();
      console.log('---> La respuesta del servidor es la siguiente: ', data);

      if ( data.ok ) 
      {
        return data.nombreArchivo;
      }
      else
      {
        return false;
      }

    } 
    catch (error) 
    {
      console.log('Error subiendo archivos...', error);
      return false
    }
  }
}
