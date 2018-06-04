import { Component } from '@angular/core';
import {
  ActionSheetController, AlertController,
  MenuController,
  NavController,
  NavParams
} from 'ionic-angular';
import {AngularFireDatabase} from "angularfire2/database";
import {Project} from "../../models/project";
import {DomSanitizer} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

@Component({
  selector: 'page-my-profile',
  templateUrl: 'my-profile.html',
})
export class MyProfilePage {
  change: boolean = false;
  projects: Observable<Project[]>;
  image: any;
  imageUrl: any;
  id: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private afDatabase: AngularFireDatabase,
    public sanitezer: DomSanitizer,
    public actionSheet: ActionSheetController,
    public alert: AlertController,

  ) {
    this.id = this.navParams.get('id');
    this.projects = this.afDatabase.list<Project>('projects/', ref => ref.orderByChild('uid').equalTo(this.id)).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }
  showImage(image){
    return this.sanitezer.bypassSecurityTrustResourceUrl(image);
  }
  pressEvent(data){
    const actionSheet = this.actionSheet.create({
      buttons: [
        {
          text: 'Удалить',
          role: 'destructive',
          icon: 'trash',
          cssClass: 'redText',
          handler: () => {
            this.showConfirmationAlert(data);
          }
        },{
          text: 'Отмена',
          role: 'cancel',
          icon: 'arrow-dropleft-circle',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  showConfirmationAlert(data){
    const confirm = this.alert.create({
      title: 'Подтверждение',
      message: 'Вы действительно хотите удалить проект "' + data.name + '" и все данные?',
      buttons: [
        {
          text: 'Да',
          handler: () => {
            this.deleteProject(data);
          }
        },
        {
          text: 'Отмена',
          handler: () => {
          }
        }
      ]
    });
    confirm.present();
  }
  deleteProject(data){
    this.afDatabase.object('projects/' + data.key).remove();
    this.afDatabase.list('likes/projects/' + data.key).remove();
    this.afDatabase.list('views/projects/' + data.key).remove();
  }
}
