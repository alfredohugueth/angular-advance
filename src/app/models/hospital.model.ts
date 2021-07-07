

interface _hospitalUser
{
    
    _id : string,
    img : string
    nombre : string,

}
export class Hospital
{
    constructor(

        public _id : string,
        public nombre : string,
        public ima? : string,
        public usuario? : _hospitalUser

    )
    {  }
}