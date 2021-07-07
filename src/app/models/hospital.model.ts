

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
        public img? : string,
        public usuario? : _hospitalUser

    )
    {  }
}