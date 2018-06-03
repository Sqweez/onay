import { Component } from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  Loading,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular';
import {Project} from "../../models/project";
import {DomSanitizer} from "@angular/platform-browser";
import {AngularFireDatabase} from "angularfire2/database";
import {Profile} from "../../models/profile";
import {CallNumber} from "@ionic-native/call-number";
import {EmailComposer} from "@ionic-native/email-composer";
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the ProjectInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-project-info',
  templateUrl: 'project-info.html',
})
export class ProjectInfoPage {
  data = {} as any;
  profile: Observable<Profile>;
  project = {} as Project;
  loading: Loading;
  url: any;
  phone: any;
  email: any;
  isAuth: boolean = true;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    private afDatabase: AngularFireDatabase,
    private alertCtrl: AlertController,
    public callNumber: CallNumber,
    public actionSheetCtrl: ActionSheetController,
    public emailComposer: EmailComposer,
    private auth: AngularFireAuth
  ) {
  }
  async call(phone){
    this.callNumber.callNumber(phone, true);
  }
  phoneTo(phone){
   let alert = this.alertCtrl.create({
     title:'Вы хотите позвонить автору проекта?',
     buttons: [
       {
         text: 'Да',
         handler: () => {
           this.call(phone);
         }
       },
       {
         text: 'Нет',
         role: 'cancel',
         handler: () => {
         }
       }
     ]
   });
    alert.present();
  }
  sendEmail(email){
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    this.emailComposer.open({
      app: 'gmail',
      to:   email
    });
  }
  mailTo(phone, email){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Выберите метод связи',
      buttons: [
        {
          text: 'Написать на почту',
          icon: 'mail',
          handler: () => {
            this.sendEmail(email);
          }
        },
        {
          text: 'Написать в WhatsApp',
          icon: 'logo-whatsapp',
          handler: () => {
            phone = phone.replace("+","");
            window.open('https://api.whatsapp.com/send?phone='+phone, '_system');
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
  videoLoaded(){
    this.loading.dismiss();
  }

  ionViewWillEnter(){
    if(this.auth.auth.currentUser == null){
      this.isAuth = false;
    }
    this.project = this.navParams.get('item');
    this.profile = this.afDatabase.object<Profile>('profile/' + this.project.uid).valueChanges();
    this.afDatabase.object('profile/' + this.project.uid)
      .valueChanges()
      .subscribe(data => {
        this.data = data;
        this.phone = this.data.phone;
        this.email = this.data.email;
      });
    console.log(this.profile);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.videoUrl);
    this.loading = this.loadingCtrl.create({
      content: 'Пожалуйста подождите'
    });
    this.loading.present();
  }
  ionViewDidLoad() {

  }

}
