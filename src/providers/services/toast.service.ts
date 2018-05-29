import {Injectable} from "@angular/core";
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastService {
  constructor(public toastCtrl: ToastController){

  }
  show(message:string){
    return this.toastCtrl.create({
      message: message,
      position: 'bottom',
      duration: 3000
    })
  }
}
