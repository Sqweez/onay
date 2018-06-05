import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {User} from "../../models/user";
import {LoginPage} from "../login/login";
import {WelcomePage} from "../welcome/welcome";
import {ProfilePage} from "../profile/profile";
import {StatusBar} from "@ionic-native/status-bar";
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  passwordConfirmation: string = "";
  constructor(private statusBar: StatusBar, private afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public toastControlle: ToastController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, 'mainMenu');
  }

  register(user: User){
    if(this.user.password == this.passwordConfirmation){
      this.user.email = this.user.email.trim();
     this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
       this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
         this.showToast('Вы успешно зарегистрированы!');
         this.navCtrl.setRoot(ProfilePage);
       })
     });
    }
    else{
      this.showToast('Пароли не совпадают!');
      this.user.password = "";
      this.passwordConfirmation = "";
    }
  }
  showToast(message: String){
    let toast = this.toastControlle.create({
      message: '' + message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
