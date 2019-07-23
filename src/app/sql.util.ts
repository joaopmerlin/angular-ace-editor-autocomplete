export class SqlUtil {

  public static getTextInPosition(text: string, row: number, column: number): string {
    if (text == null) {
      return '';
    }
    const lines = text.split(/\n/g);
    const str = lines[row];
    const left = str.slice(0, column + 1).search(/\S+$/);
    const right = str.slice(column).search(/\s/);

    if (right < 0) {
      return str.slice(left);
    }

    return str.slice(left, right + column);
  }

  public static isAlias(text: string, search: string): boolean {
    const split = search.split('.');
    if (split.length !== 2) {
      return false;
    }
    const match = ' ' + split[0] + ' ';
    return text.indexOf(match) !== -1;
  }

  public static getTableByAlias(text: string, alias: string): string {
    alias = alias.split('.')[0];
    const split = text.split(' ' + alias + ' ');
    const first = split[0].trim();
    const left = first.slice(0, first.length + 1).search(/\S+$/);
    return first.slice(left);
  }

}
