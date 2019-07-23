import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AceEditorModule } from "ng2-ace-editor";
import { AppComponent } from "./app.component";
import {DataService} from "./data.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AceEditorModule],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
