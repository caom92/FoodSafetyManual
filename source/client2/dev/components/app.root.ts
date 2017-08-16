// Importamos modulos externos necesarios para ejecutar la aplicacion
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UIRouterModule } from "@uirouter/angular";
import { MaterializeModule } from 'ng2-materialize';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

// Importamos los componentes de cada pagina de nuestra aplicacion
import { HomeComponent } from './app.home';
import { LogInComponent } from './app.login';

// Declaramos el modulo raiz que indica el inicio de nuestra aplicacion
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterializeModule.forRoot(),
    UIRouterModule.forRoot({
      states: [
        {
          name: 'login',
          url: '/login',
          component: LogInComponent
        }
      ],
      useHash: true,
      otherwise: '/login'
    })
  ],
  providers: [],
  declarations: [
    HomeComponent,
    LogInComponent
  ],
  bootstrap: [ HomeComponent ]
})
export class RootModule { }
