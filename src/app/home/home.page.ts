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
  searchText: string;


  clearCache() {
    this.cache.clearAll();
  }

  filterData() {
    console.log('searchText', this.searchText);
    const result = this.apiData.filter((item) => {
      return (item.author.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
    });
    console.log('Resultat', result);
    this.apiData = result;
  }

  getData() {
    const URL = "https://picsum.photos/v2/list?limit=10";
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
