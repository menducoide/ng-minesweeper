import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field'; 
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card'; 


import {MatTableModule} from '@angular/material/table'; 
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
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule
   ],
  exports: [
     MatToolbarModule,   
     MatIconModule,
     MatButtonModule, 
     MatSidenavModule,
     MatListModule,
     MatGridListModule,
     MatMenuModule,
     MatDialogModule,
     MatFormFieldModule,
     MatInputModule,
     MatCardModule,
     MatTableModule
  ],
  providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}],
})
export class MaterialModule {}
