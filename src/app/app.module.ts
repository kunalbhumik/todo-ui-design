import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CategoryFilterPipe } from './category.pipe';
import { FilterPipe } from './appPipe/filter';
import { Pipe, PipeTransform } from '@angular/core';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    
  ],
  declarations: [AppComponent,TodoListComponent,CategoryFilterPipe,FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
