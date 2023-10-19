import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  loading: boolean = true;
  constructor(private router: Router) { 
    this.simulateLoading();
  }

  simulateLoading() {
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/login']);
    }, 1500);
  }

  ngOnInit() {
  }

}
