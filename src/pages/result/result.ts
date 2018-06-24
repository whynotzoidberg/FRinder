import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StartPage} from "../start/start";
import { Http } from '@angular/http';


/**
 * Generated class for the ResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-result',
  templateUrl: 'result.html',
})
export class ResultPage {

  likedCards: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultPage');
    this.likedCards = this.navParams.get('likedCards');
  }

  restart(){
    this.navCtrl.push(StartPage, {
    });
  }

  deleteItem(i){
    this.likedCards.splice(i,1);
    if(this.likedCards.length <= 0){
      this.restart();
    }
  }



  getMapLink(i){
    return "https://www.google.com/maps/place/?q=place_id:" +  this.likedCards[i].place_id;
  }


  createMapLink():string {

    // https://maps.googleapis.com/maps/api/directions/json?origin=47.994939,7.842517&mode=walking&destination=47.994939,7.842517
    //   // &waypoints=optimize:true%7C47.9763016,7.8177525%7C47.9848895,7.8541669&key=AIzaSyDRMVqSJjQJ2bnodfTwNcIJy1wpXiYYaYE


    // https://maps.googleapis.com/maps/api/directions/json?origin=47.994939,7.842517&mode=walking&
    // destination=47.997046,7.857177&waypoints=optimize:true%7C7.854290,47.992771%7C7.858306,47.993676%7C7.857177,47.997046%7C&key=AIzaSyDRMVqSJjQJ2bnodfTwNcIJy1wpXiYYaYE

    let url:string = 'https://maps.googleapis.com/maps/api/directions/json?origin=47.994939,7.842517&mode=walking&destination=';
    let callUrl = "";

    let dests = this.likedCards.slice();
    if(!dests || dests.length <= 0)return;
    let dest = dests.pop();

    url += dest.lat + "," + dest.lng + "&waypoints=optimize:true%7C";

    dests.forEach(function (value) {
      url += value.lat + "," + value.lng + "%7C";
    });

    url +=  "&key=AIzaSyDRMVqSJjQJ2bnodfTwNcIJy1wpXiYYaYE";

    let body = new FormData();
    body.append('routeLink', url);
    let backendUrl = "http://5.230.145.170/FRinder/places/route";
    this.http.post(backendUrl, body).subscribe(result => {

      console.log(result);

      let resultList = result.json().result;
      callUrl = "https://www.google.com/maps/dir/";

      let routes = resultList.routes;
      routes.forEach((value)=>{

       value.legs.forEach((leg)=>{
          let end = leg.end_location;
         callUrl += end.lat + "," + end.lng + "/"

       });

      });

      callUrl += "@47.984928,7.827998/data=!4m2!4m1!3e2";

      window.open( callUrl, "_system");
    });
  };
}
