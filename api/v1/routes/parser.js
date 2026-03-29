import { console } from 'console';

export class Parser {
  constructor() {
    this.input = '';
  }

  parse(input) {
    this.input = input;
    return this;
  }

  extractLines() {
    return this.input.split('\n');
  }

  extractWords() {
    return this.input.split(/\s+/);
  }

  extractLinesWithPattern(pattern) {
    const regex = new RegExp(pattern, 'gm');
    const matches = this.input.match(regex);
    return matches? matches.map(match => match.trim()) : [];
  }
}

export function main() {
  const parser = new Parser();
  parser.parse('This is a test\nWith multiple lines');
  console.log(parser.extractLines()); // ['This is a test', 'With multiple lines']
  console.log(parser.extractWords()); // ['This', 'is', 'a', 'test', 'With', 'multiple', 'lines']
  console.log(parser.extractLinesWithPattern('test')); // ['test']
}

main();