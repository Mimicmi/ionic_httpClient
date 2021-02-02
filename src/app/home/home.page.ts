import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CacheService } from "ionic-cache";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private http: HttpClient,
    private cache: CacheService) { }

  apiData: any;

  clearCache() {
    this.cache.clearAll();
  }

  getData() {
    const URL = "https://picsum.photos/v2/list?limit=10";

    /* this.http.get( URL ).subscribe( (data) => {
      console.log(data);
    }); */
    // on remplace le http.get() par un appel du cache

    const request = this.http.get(URL);
    this.cache.loadFromObservable('myCache', request).subscribe((data) => {
      this.apiData = data;
      console.log(data);
    });

  }

  onImageLoad(event) {
    console.log(event);
  }

  ionViewDidEnter() {

    this.getData();

  }


}
