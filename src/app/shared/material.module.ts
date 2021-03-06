import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


@NgModule({
  imports: [
    CommonModule,    
    MatToolbarModule,  
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
   ],
  exports: [
     MatToolbarModule,   
     MatIconModule,
     MatButtonModule, 
     MatSidenavModule,
     MatListModule,
  ],
  providers: [],
})
export class MaterialModule {}
