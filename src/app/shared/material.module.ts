import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  imports: [
    CommonModule,    
    MatToolbarModule,  
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
   ],
  exports: [
     MatToolbarModule,   
     MatIconModule,
     MatButtonModule, 
     MatSidenavModule,
     MatListModule,
     MatGridListModule,
     MatMenuModule,
  ],
  providers: [],
})
export class MaterialModule {}
