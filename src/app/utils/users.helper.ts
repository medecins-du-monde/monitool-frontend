import { User } from 'src/app/models/classes/user.model';

export default class UsersHelper {

    static areEquals(date1: Date, date2: Date ): boolean {
      if (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      ) {
        return true;
        }
      else {
        return false;
      }
    }

    static isNull(user: User): boolean{
        return (
            (user.id === null) && 
            (user.name === null) && 
            (user.password === null) &&
            (user.role === null) &&
            (user.username === null)
        )
    }

    static isInternal(user: User): boolean {
        let returnValue = true;

        if(user.name === null){
            returnValue = false;
        }
        if(RegExp("^user:[a-z0-9\\.\\-\\_]+$").test(user.id) == false){
            returnValue = false;
        }
        if(["owner", "read"].includes(user.role) == false){
            returnValue = false;
        }
        return returnValue;
    }

    static isPartner(user: User): boolean {
        let returnValue = true;

        if(user.name === null){
            returnValue = false;
        }else if(user.name.length < 1){
            returnValue = false;
        }

        if(["owner", "read"].includes(user.role) == false){
            returnValue = false;
        }

        if(user.username === null){
            returnValue = false;
        }else if(user.username.length < 1){
            returnValue = false;
        }

        if(user.password != null){
            if(user.password.length < 6){
                returnValue = false;
            }
        }
        return true;
    }
}
  
  