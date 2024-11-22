// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
// ng-zorro-antd imports
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NzTableModule } from 'ng-zorro-antd/table'; // Importa NzTableModule
import { NzButtonModule } from 'ng-zorro-antd/button'; // Para botones como el "Add Product"
import { NzPaginationModule } from 'ng-zorro-antd/pagination'; // Para la paginación
import { NzCardModule } from 'ng-zorro-antd/card';


import UserService  from 'src/app/Service/userservice';
import SupplierService  from './Service/supplierservice';
import OrderService  from 'src/app/Service/orderservice';
import { RouterModule } from '@angular/router';  // Asegúrate de importar RouterModule
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.values(antDesignIcons);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NzIconModule, // Importamos NzIconModule
    NzTableModule, // Añade el módulo de tabla de NG-ZORRO
    NzButtonModule, // Añade el módulo de botón de NG-ZORRO si lo estás usando
    NzPaginationModule, 
    NzCardModule,
    RouterModule,
    FormsModule
  
  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }, 
    UserService ,
    SupplierService,
    OrderService,// Registramos los iconos aquí
    provideHttpClient(withInterceptorsFromDi())

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
