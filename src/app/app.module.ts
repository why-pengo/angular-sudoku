import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { TimeComponent } from './time/time.component';
import { CellComponent } from './cell/cell.component';
import { CellDetailComponent } from './celldetail/cell-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    SettingsComponent,
    PageNotFoundComponent,
    TimeComponent,
    CellComponent,
    CellDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
