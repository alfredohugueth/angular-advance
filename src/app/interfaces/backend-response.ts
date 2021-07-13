import { Hospital } from "../models/hospital.model";
import { Medico } from "../models/medico.model";

interface BackendResponse {
    ok : boolean
}

export interface hospitalResponse extends BackendResponse
{
    
    hospitales : Hospital[]

}

export interface creationHospital extends BackendResponse
{
    
    hospital : Hospital

}

export interface GetMedicoByID extends BackendResponse
{

    medicoDB : Medico
    
}
