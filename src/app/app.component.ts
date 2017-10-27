import { Component } from '@angular/core';
import { Http, URLSearchParams} from "@angular/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  longitude:number;
  latitude:number;
  states:string[];

  constructor(public http: Http){}

  getState(){
    this.requestState().then((data:string[]) => {
      this.states = data;
    });
  }

  requestState(){
    return (new Promise((resolve, reject) => {
      const params:URLSearchParams = new URLSearchParams();
      const url:string = "/api/states";

      params.set("latitude", this.latitude.toString());
      params.set("longitude", this.longitude.toString());

      this.http.get(url, {
        search: params
      }).subscribe(res=>{
        res = res.json();
        resolve(res);
      }, error=>{
        reject(error);
      })
    }));
  }
}
