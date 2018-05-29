import {Injectable} from "@angular/core";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class Autentification {
  constructor(
    private afAuth: AngularFireAuth
  ){}

  isUserLogged(){
    this.afAuth.authState.subscribe(data => {
      if(data){
        return true;
      }
      else {
        return false;
      }
    })
  }
}
