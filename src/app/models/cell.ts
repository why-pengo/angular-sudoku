export class Cell {
  constructor(
    public id: string, // row and column
    public guess: string[],
    public value: string,
    public solution: string
  ) {}
}
// https://en.wikipedia.org/wiki/Glossary_of_Sudoku
