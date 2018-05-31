import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {EmailComposer} from "@ionic-native/email-composer";

@Component({
  selector: 'page-about-us',
  templateUrl: 'about-us.html',
})
export class AboutUsPage {
  mail: string = 'sasha.katerinin@gmail.com';
  constructor(
    public email: EmailComposer,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
  sendEmail(){
    this.email.addAlias('gmail', 'com.google.android.gm');
    this.email.open({
      app: 'gmail',
      to: this.mail
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUsPage');
  }

}
