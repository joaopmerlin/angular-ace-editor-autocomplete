import {AfterViewInit, Component, ViewChild} from "@angular/core";
import {AceEditorComponent} from "ng2-ace-editor";
import {DataService} from "./data.service";
import {SqlUtil} from "./sql.util";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('editor')
  editor: AceEditorComponent;

  text: string;

  constructor(private dataService: DataService) {
  }

  ngAfterViewInit(): void {
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });

    this.editor.getEditor().completers.push({
      getCompletions: (editor, session, pos, prefix, callback) => {
        let textInPosition = SqlUtil.getTextInPosition(this.text, pos.row, pos.column);

        if (SqlUtil.isAlias(this.text, textInPosition)) {
          const table = SqlUtil.getTableByAlias(this.text, textInPosition);
          textInPosition = table + '.' + textInPosition.split('.')[1];
        }

        const split = textInPosition.split('.');

        if (split.length === 1) {
          this.dataService.findSchemas(split[0]).subscribe(e => {
            callback(null, e.map(i => {
              return {value: '"' + i + '"', meta: 'schema', score: 1000};
            }));
          });
        } else if (split.length === 2) {
          this.dataService.findTables(split[0], split[1]).subscribe(e => {
            callback(null, e.map(i => {
              return {value: i, meta: 'table', score: 1000};
            }));
          });
        } else if (split.length === 3) {
          this.dataService.findColumns(split[0], split[1], split[2]).subscribe(e => {
            callback(null, e.map(i => {
              return {value: i, meta: 'columns', score: 1000};
            }));
          });
        }
      }
    });
  }

}
