import { Component, OnInit } from '@angular/core';
import { SystemServiceService } from 'src/app/system-service.service';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  vendors!: Vendor[];

  constructor(
    private vendsvc: VendorService,
    private syssvc: SystemServiceService
  ) { }

  get isAdmin() {
    return this.syssvc._user?.isAdmin
  }

  ngOnInit(): void {
    this.vendsvc.list().subscribe({
      next: (res) => {
        console.debug("User:", res);
        this.vendors = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
