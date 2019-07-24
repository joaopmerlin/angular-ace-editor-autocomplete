export class SqlUtil {

  public static getTextInPosition(text: string, row: number, column: number): string {
    if (text == null) {
      return '';
    }
    const lines = text.split(/\n/g);
    const str = lines[row];
    const split = str.slice(0, column).split(/\s+/g);
    return split[split.length - 1].trim();
  }

  public static isAlias(text: string, search: string): boolean {
    const split = search.split('.');
    if (split.length !== 2) {
      return false;
    }
    const regex = new RegExp(`(\\"*\\w+\\-*\\w*\\"*)\\.(\\w+\\-*\\w*)\\s+(${split[0]})(\\s+|$)`);
    return text.search(regex) !== -1;
  }

  public static getTableByAlias(text: string, alias: string): string {
    alias = alias.split('.')[0];
    const regex = new RegExp(`(\\"*\\w+\\-*\\w*\\"*)\\.(\\w+\\-*\\w*)\\s+(${alias})(\\s+|$)`);
    const match = text.match(regex);
    return match[1] + '.' + match[2];
  }

}
