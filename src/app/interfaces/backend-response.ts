import { Hospital } from "../models/hospital.model";

interface BackendResponse {
    ok : boolean
}

export interface hospitalResponse extends BackendResponse
{
    
    hospitales : Hospital[]

} 
