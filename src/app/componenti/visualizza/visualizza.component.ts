import { Component, OnInit } from '@angular/core';
import { ChiamateService } from '../../chiamate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-visualizza',
  templateUrl: './visualizza.component.html',
  styleUrl: './visualizza.component.css'
})
export class VisualizzaComponent implements OnInit {
  constructor(private chiamateService: ChiamateService, private router: Router, private route : ActivatedRoute) { }

  rich:any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.rich = JSON.parse(params['pippo']);
      console.log(this.rich, "richiesta");
      
    }); 
  }

}
