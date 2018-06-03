import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, MenuController, NavController, NavParams} from 'ionic-angular';
import {Profile} from "../../models/profile";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {LicensePage} from "../license/license";
import {WelcomePage} from "../welcome/welcome";
import {ToastService} from "../../providers/services/toast.service";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  kzCities = [
    {city: 'Астана'},
    {city: 'Алматы'},
    {city: 'Актобе'},
    {city: 'Атырау'},
    {city: 'Аксу'},
    {city: 'Актау'},
    {city: 'Караганда'},
    {city: 'Костанай'},
    {city: 'Кокшетау'},
    {city: 'Кызылорда'},
    {city: 'Павлодар'},
    {city: 'Петропавловск'},
    {city: 'Семипалатинск'},
    {city: 'Тараз'},
    {city: 'Темиртау'},
    {city: 'Талдыкорган'},
    {city: 'Усть-Каменогорск'},
    {city: 'Уральск'},
    {city: 'Шымкент'},
    {city: 'Экибастуз'},
  ];
  profile = {} as Profile;
  id: any;
  loading: Loading;
  constructor(
    public menuCtrl: MenuController,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadCtrl: LoadingController,
    public toast: ToastService
  ) {
    this.menuCtrl.enable(false, 'mainMenu');
  }
  logout(){
    this.afAuth.auth.signOut();
    this.navCtrl.setRoot(WelcomePage);
  }
  ionViewWillEnter(){
  }
  createProfile(){
    this.afAuth.authState.subscribe( auth => {
      this.profile.email = auth.email;
      this.profile.didLicenseAccepted = false;
      this.profile.phone = this.profile.phone.replace("87","+77");
      this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
        .then(() => this.navCtrl.push(LicensePage));
    })
  }

}
