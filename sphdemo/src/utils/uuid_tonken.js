import { v4 as uuidv4 } from 'uuid';
export const getUUID = () =>{
    let uuid_tonken = localStorage.getItem('UUIDTONKEN');
    if(!uuid_tonken){
        uuid_tonken = uuidv4();
        localStorage.setItem('UUIDTONKEN',uuid_tonken)
    }

    return uuid_tonken
}