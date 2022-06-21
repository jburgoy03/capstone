import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PO } from '../po.class';
import { PoLine } from '../poline.class';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent implements OnInit {

  po!: PO;

  constructor(
    private vendsvc: VendorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id: number = +this.route.snapshot.params["id"];
    this.PO(id);
  }

  PO(id: number): void {
    this.vendsvc.createPo(id).subscribe({
      next: (res) => {
        console.debug("PO:", res);
        this.po = res;
      },
      error: (err) => {
        console.error(err)
      }
    });
  }

}
