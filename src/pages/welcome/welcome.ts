import { Component } from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {LoginPage} from "../login/login";
import {NativePageTransitions, NativeTransitionOptions} from "@ionic-native/native-page-transitions";
import {User} from "../../models/user";
import {AngularFireAuth} from "angularfire2/auth";
import {ProfilePage} from "../profile/profile";
import {AngularFireDatabase} from "angularfire2/database-deprecated";
import {HomePage} from "../home/home";
import {TabsPage} from "../tabs/tabs";
import {LicensePage} from "../license/license";
import {SplashScreen} from "@ionic-native/splash-screen";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  user = {}  as User;
  message: string;
  constructor(
    private afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private nativePageTransitions: NativePageTransitions,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    public splashScreen: SplashScreen) {
    this.menuCtrl.enable(false, 'mainMenu');
  }

  ionViewWillEnter(){
    this.splashScreen.hide();
  }
  goToRegister(){
    this.navCtrl.push(RegisterPage);
  }
  async login(user: User){
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        this.afAuth.authState.subscribe(data => {
          this.afDatabase.object('profile/' + data.uid).subscribe(data => {
            if (!data.firstname){
              this.navCtrl.setRoot(ProfilePage);
            }
            else{
              if(data.didLicenseAccepted == false){
                this.navCtrl.setRoot(LicensePage);
              }
              else if(data.firstname && data.didLicenseAccepted){
                this.navCtrl.setRoot(TabsPage);
              }
            }
          })
        })
      })
      .catch(err => {
        switch (err.code){
          case 'auth/invalid-email':
            this.message = "Введите корректный почтовый адрес";
            this.user.email = "";
            this.user.password = "";
            break;
          case 'auth/user-not-found':
            this.message = "Пользователь с данным e-mail не найден!";
            this.user.email = "";
            this.user.password = "";
            break;
          case 'auth/wrong-password':
            this.user.email = "";
            this.user.password = "";
            this.message = "Неверный пароль";
            break;
          default:
            break;
        }
        this.showToast(this.message);
      })
  }
  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  signUpThroughFacebook(){
    this.showToast('Ой, мы еще не сделали авторизацию через Facebook:(');
  }
  signUpThroughGoogle(){
    this.showToast('Ой, мы еще не сделали авторизацию через Google:(');
  }
  showToast(message: String){
    let toast = this.toastCtrl.create({
      message: '' + message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'toast'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

}
