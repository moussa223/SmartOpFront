import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  interventions: any;
  interventionFavori:any;
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get('http://localhost:3000/FavoriteIntervention').subscribe(res => {
      //console.log(res);
      this.interventions = res;
      console.log(this.interventions);
    });

    this.http.get('http://localhost:3000/TypeInterventionFavori').subscribe(res => {
      //console.log(res);
      this.interventionFavori = res;
      console.log(this.interventionFavori);
    });
  }

  onScroll() {
    this.currentPage++;
  }

  search() {
    if(this.searchTerm){
      const filteredSurgeons = this.interventions.filter((intervention: any) =>
        intervention.surgeon.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.interventions = filteredSurgeons;

      const filteredIntervention = this.interventionFavori.filter((intervention: any) =>
        intervention.surgeon.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.interventionFavori = filteredIntervention;

    }
    else {
      this.ngOnInit();
    }
  }

}
