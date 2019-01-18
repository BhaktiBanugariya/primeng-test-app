import { Component, OnInit, Input } from '@angular/core';
import {OverlayPanelModule, OverlayPanel} from 'primeng/overlaypanel';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {

  constructor() {
    
   }
   @Input('resident') resident: string = "";

  ngOnInit() {
  }

  getDetail(event,overlaypanel: OverlayPanel){
    overlaypanel.toggle(event);
  }
}
