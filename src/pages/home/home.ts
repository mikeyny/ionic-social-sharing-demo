import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  quotes :any;
  private  apiUrl :string = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10";
  constructor(private http:Http, private socialSharing: SocialSharing ,public navCtrl: NavController) {
    this.getQuotes();
  }
  async getQuotes(){
          this.quotes = await this.http.get(this.apiUrl).map(res => res.json()).toPromise();;

    }
    doRefresh(refresher) {
      this.getQuotes();

      setTimeout(() => {
        console.log('Complete');
        refresher.complete();
      }, 2000);
    }
    compilemsg(index):string{
      var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
      return msg.concat(" \n sent from my awesome app");
    }
    regularShare(index){
      var msg = this.compilemsg(index);
      this.socialSharing.share(msg, null, null, null);
    }
    twitterShare(index){
      var msg  = this.compilemsg(index);
      this.socialSharing.shareViaTwitter(msg, null, null);
    }
    whatsappShare(index){
      var msg  = this.compilemsg(index);
       this.socialSharing.shareViaWhatsApp(msg, null, null);
     }
     facebookShare(index){
       var msg  = this.compilemsg(index);
        this.socialSharing.shareViaFacebook(msg, null, null);
      }

  }
