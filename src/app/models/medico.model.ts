import { Hospital } from "./hospital.model";


interface _MedicoUser
{
    
    _id : string,
    img : string
    nombre : string,

}
export class Medico
{
    constructor(

        public _id : string,
        public nombre : string,
        public img? : string,
        public usuario? : _MedicoUser,
        public hospital? : Hospital

    )
    {  }
}