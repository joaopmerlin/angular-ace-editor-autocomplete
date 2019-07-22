import { AfterViewInit, Component, ViewChild } from "@angular/core";
import { AceEditorComponent } from "ng2-ace-editor";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements AfterViewInit {
  @ViewChild("editor")
  editor: AceEditorComponent;

  text: string;

  ngAfterViewInit(): void {
    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });

    this.editor.getEditor().completers.push({
      getCompletions: (editor, session, pos, prefix, callback) => {
        const textInPosition = this.getTextInPosition(pos);
        const split = textInPosition.split(".");

        if (split.length === 1) {
          // schemas
          callback(null, this.findSchemas(split[0]));
        } else if (split.length === 2) {
          // tables
          callback(null, this.findTables(split[0], split[1]));
        } else if (split.length === 3) {
          // columns
          callback(null, this.findColumns(split[0], split[1], split[2]));
        }
      }
    });
  }

  private getTextInPosition({ row, column }): string {
    const lines = this.text.split(/\n/g);
    const str = lines[row];
    const left = str.slice(0, column + 1).search(/\S+$/);
    const right = str.slice(column).search(/\s/);

    if (right < 0) {
      return str.slice(left);
    }

    return str.slice(left, right + column);
  }

  private findSchemas(search: string): any[] {
    return [
      { value: '"schema-1"', meta: "schema" },
      { value: '"schema-2"', meta: "schema" },
      { value: '"schema-3"', meta: "schema" },
      { value: '"schema-4"', meta: "schema" },
      { value: '"schema-5"', meta: "schema" }
    ];
  }

  private findTables(schema: string, search: string): any[] {
    return [
      { value: "table-1", meta: "table" },
      { value: "table-2", meta: "table" },
      { value: "table-3", meta: "table" },
      { value: "table-4", meta: "table" },
      { value: "table-5", meta: "table" }
    ];
  }

  private findColumns(schema: string, table: string, search: string): any[] {
    return [
      { value: "column-1", meta: "column" },
      { value: "column-2", meta: "column" },
      { value: "column-3", meta: "column" },
      { value: "column-4", meta: "column" },
      { value: "column-5", meta: "column" }
    ];
  }
}
