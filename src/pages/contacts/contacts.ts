import { Component } from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database"
import {Contacts} from "../../models/contact";
import {DomSanitizer} from "@angular/platform-browser";
import {EmailComposer} from "@ionic-native/email-composer";
import {CallNumber} from "@ionic-native/call-number";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the ContactsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  public contacts: Observable<Contacts[]>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afDatabase: AngularFireDatabase,
    private sanitizer: DomSanitizer,
    private actionSheetCtrl: ActionSheetController,
    public emailComposer: EmailComposer,
    public callNumber: CallNumber) {
    this.contacts = this.afDatabase.list<Contacts>('contacts').valueChanges();
  }

  showImage(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  sendEmail(email){
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    this.emailComposer.open({
      app: 'gmail',
      to:   email
    });
  }
  call(phone){
    this.callNumber.callNumber(phone, true);
  }
  showSheet(key) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Выберите метод связи',
      buttons: [
        {
          text: 'Позвонить',
          handler: () => {
            this.call(key.phone);
          }
        },
        {
          text: 'Написать',
          handler: () => {
            this.sendEmail(key.email);
          }
        },
        {
          text: 'Отмена',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    actionSheet.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
