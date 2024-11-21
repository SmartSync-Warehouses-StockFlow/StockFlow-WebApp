// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// ng-zorro-antd imports
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

import { NzTableModule } from 'ng-zorro-antd/table'; // Importa NzTableModule
import { NzButtonModule } from 'ng-zorro-antd/button'; // Para botones como el "Add Product"
import { NzPaginationModule } from 'ng-zorro-antd/pagination'; // Para la paginación
import { NzCardModule } from 'ng-zorro-antd/card';



// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

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
    HttpClientModule,
    ToastrModule.forRoot()

  ],
  providers: [
    { provide: NZ_ICONS, useValue: icons }, // Registramos los iconos aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
