import {Component} from '@angular/core';
import {
  ActionSheetController,
  AlertController,
  Loading,
  LoadingController, ModalController,
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
import * as $ from 'jquery';
import {ToastProvider} from "../../providers/toast/toast";
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
  likes = {} as any;
  didLiked: boolean = false;
  image: any;

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
    private auth: AngularFireAuth,
    public toast: ToastProvider,
    public modalCtrl: ModalController
  ) {
  }

  async call(phone) {
    this.callNumber.callNumber(phone, true);
  }

  showImage(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  phoneTo(phone) {
    let alert = this.alertCtrl.create({
      title: 'Вы хотите позвонить автору проекта?',
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

  sendEmail(email) {
    this.emailComposer.addAlias('gmail', 'com.google.android.gm');
    this.emailComposer.open({
      app: 'gmail',
      to: email
    });
  }

  mailTo(phone, email) {
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
            phone = phone.replace("+", "");
            window.open('https://api.whatsapp.com/send?phone=' + phone, '_system');
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

  videoLoaded() {
    $('#loading').css('display', 'none');
    $('#content').css('display', 'block');
  }

  ionViewWillEnter() {
    if (this.auth.auth.currentUser == null) {
      this.isAuth = false;
    }
    this.project = this.navParams.get('item');
    if(this.project.videoUrl){
     $('#content').css('display', 'none');
     $('#loading').css('display', 'block');
     this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.videoUrl);
    }
    if(this.isAuth == true){
      this.afDatabase.object('likes/projects/' + this.project.key + '/' + this.auth.auth.currentUser.uid)
        .valueChanges()
        .subscribe(data => {
          if(data){
            $('#like').removeClass('far').addClass('fas').removeClass('likeButton').addClass('dislikeButton');
            this.didLiked = true;
          }
        });
      this.startCountViews(this.isAuth);
    }
    this.profile = this.afDatabase.object<Profile>('profile/' + this.project.uid).valueChanges();
    this.afDatabase.object('profile/' + this.project.uid)
      .valueChanges()
      .subscribe(data => {
        this.data = data;
        this.phone = this.data.phone;
        this.email = this.data.email;
      });
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl(this.project.imageUrl);
    this.loading = this.loadingCtrl.create({
      content: 'Пожалуйста подождите'
    });
  }

  startCountViews(auth) {
    if(auth == true){
      this.afDatabase.object('views/projects/' + this.project.key + '/'+ this.auth.auth.currentUser.uid).valueChanges().subscribe(data => {
        if (!data) {
          const count = this.project.viewCount + 1;
          this.afDatabase.object('projects/' + this.project.key).update({viewCount: count});
          this.afDatabase.object('views/' + '/projects/'+ this.project.key + '/' + this.auth.auth.currentUser.uid).set({view: 1});
        }
      })
    }
  }

  like(id, didLiked) {
    console.log(this.didLiked);
    if (didLiked == false) {
      this.project.likeCount++;
      $('#like').removeClass('far').addClass('fas').removeClass('likeButton').addClass('dislikeButton');
      this.afDatabase.object('projects/' + id.key + '/').update({likeCount: this.project.likeCount});
      this.afDatabase.object('likes/projects/' + id.key + '/' + this.auth.auth.currentUser.uid).set({like: 1});
      this.didLiked = true;
    }
    else {
      this.afDatabase.object('likes/projects/'+ id.key + '/' + this.auth.auth.currentUser.uid).remove();
      this.didLiked = false;
      this.project.likeCount = this.project.likeCount - 1;
      $('#like').removeClass('fas').addClass('far').removeClass('dislikeButton').addClass('likeButton');
      this.afDatabase.object('projects/' + id.key).update({likeCount: this.project.likeCount});
    }
  }

  showModal(count) {
    /*if(count == 0){
      this.toast.showToast('У данного проекта еще нет лайков:(');
    }
    else {
      const modal = this.modalCtrl.create(WhoLikesPage, {id: this.project.key});
      modal.present();
    }*/
  }
}
