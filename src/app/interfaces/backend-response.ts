import { Hospital } from "../models/hospital.model";

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
