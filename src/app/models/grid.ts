import { box } from "./box";
import { column } from "./column";
import { row } from "./row";

export interface grid {
    boxes: box[],
    rows: row[],
    columns: column[],
}
// https://en.wikipedia.org/wiki/Glossary_of_Sudoku