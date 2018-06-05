import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {eduction} from "../../models/education";
import {DomSanitizer} from "@angular/platform-browser";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import * as $ from 'jquery';
import {ToastService} from "../../providers/services/toast.service";
import {ToastProvider} from "../../providers/toast/toast";
/**
 * Generated class for the EducationInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-education-info',
  templateUrl: 'education-info.html',
})
export class EducationInfoPage {
  education = {} as eduction;
  loading: Loading;
  url: any;
  isAuth: boolean = true;
  didLiked: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public loadingCtrl: LoadingController,
    public auth: AngularFireAuth,
    public db: AngularFireDatabase,
    public toast: ToastProvider
  ) {
  }

  videoLoaded(){
    this.loading.dismiss();
  }

  ionViewWillEnter(){
    if (this.auth.auth.currentUser == null) {
      this.isAuth = false;
    }
    this.education = this.navParams.get('item');
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.navParams.get('videourl'));
    this.startCountViews(this.isAuth);
    this.db.object('likes/education/' + this.education.key + '/' + this.auth.auth.currentUser.uid)
      .valueChanges()
      .subscribe(data => {
        if(data){
          $('#like').removeClass('far').addClass('fas').removeClass('likeButton').addClass('dislikeButton');
          this.didLiked = true;
        }
      });
    this.loading = this.loadingCtrl.create({
      content: 'Пожалуйста подождите'
    });
    this.loading.present();
  }
  startCountViews(auth) {
    this.db.object('views/education/'+ this.education.key + '/' + this.auth.auth.currentUser.uid).valueChanges().subscribe(data => {
      console.log(data);
      if (!data) {
        if (auth == true) {
          const count = this.education.viewCount + 1;
          this.db.object('education/' + this.education.key).update({viewCount: count});
          this.db.object('views/education/'+ this.education.key + '/' + this.auth.auth.currentUser.uid).set({view: 1});
        }
      }
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EducationInfoPage');
  }
  like(id, didLiked) {
    console.log(this.didLiked);
    if (didLiked == false && this.isAuth == true) {
      this.education.likeCount++;
      $('#like').removeClass('far').addClass('fas').removeClass('likeButton').addClass('dislikeButton');
      this.db.object('education/' + id.key + '/').update({likeCount: this.education.likeCount});
      this.db.object('likes/education/' + id.key + '/' + this.auth.auth.currentUser.uid).set({like: 1});
      this.didLiked = true;
    }
    else if(didLiked == true && this.isAuth == true){
      this.db.object('likes/education/'+ id.key + '/' + this.auth.auth.currentUser.uid).remove();
      this.didLiked = false;
      this.education.likeCount = this.education.likeCount - 1;
      $('#like').removeClass('fas').addClass('far').removeClass('dislikeButton').addClass('likeButton');
      this.db.object('education/' + id.key).update({likeCount: this.education.likeCount});
    }
    else if(this.isAuth == false){
      this.toast.showToast('Войдите или зарегистрируйтесь, чтобы оценивать записи');
    }
  }
}
