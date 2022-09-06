import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';

import { SudokuCreator } from '@algorithm.ts/sudoku';
import { cell } from '../models/cell';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  // 3 x 3 = 9
  creator = new SudokuCreator({ childMatrixSize: 3 })
  sudoku = this.creator.createSudoku(1.0);
  rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  cells: cell[] = [];
  grid1 = ['A1', 'B1', 'C1', 'A2', 'B2', 'C2', 'A3', 'B3', 'C3'];
  grid2 = ['A4', 'B4', 'C4', 'A5', 'B5', 'C5', 'A6', 'B6', 'C6'];
  grid3 = ['A7', 'B7', 'C7', 'A8', 'B8', 'C8', 'A9', 'B9', 'C9'];
  grid4 = ['D1', 'E1', 'F1', 'D2', 'E2', 'F2', 'D3', 'E3', 'F3'];
  grid5 = ['D4', 'E4', 'F4', 'D5', 'E5', 'F5', 'D6', 'E6', 'F6'];
  grid6 = ['D7', 'E7', 'F7', 'D8', 'E8', 'F8', 'D9', 'E9', 'F9'];
  grid7 = ['G1', 'H1', 'I1', 'G2', 'H2', 'I2', 'G3', 'H3', 'I3'];
  grid8 = ['G4', 'H4', 'I4', 'G5', 'H5', 'I5', 'G6', 'H6', 'I6'];
  grid9 = ['G7', 'H7', 'I7', 'G8', 'H8', 'I8', 'G9', 'H9', 'I9'];

  constructor(private render: Renderer2) {
    // console.log(`sudoku = ${JSON.stringify(this.sudoku)}`);
    for (let i = 0; i < 9; i++) {
      let row_p = this.sudoku.puzzle[i]
      let row_s = this.sudoku.solution[i]
      // console.log(`row ${rows[i]}= ${JSON.stringify(row)}`);
      for (let j = 0; j < 9; j++) {
        // console.log(`row[j] = ${row[j]}`);
        // console.log(`cell id: ${rows[i]}${j}, solution: ${row_s[j]}, value: ${row_p[j]}`);
        let c: cell = { id: `${this.rows[i]}${j + 1}`, guess: [], solution: `${row_s[j]}`, value: `${row_p[j]}` }
        this.cells.push(c);
      };
    }
    // console.log(`cells = ${JSON.stringify(this.cells)}`);
  }

  ngOnInit(): void {
    this.setGridDarkBg();
    this.initializeBoard();
  }

  initializeBoard() {
    for (let i in this.cells) {
      let cell = this.cells[i];
      if (cell.value === '-1') 
        continue;
      // console.log(`working on ${JSON.stringify(cell)}`);
      let el = document.getElementById(cell.id) as HTMLElement;
      let ch = el.querySelector(".cell_value") as HTMLElement;
      ch.textContent = cell.value;
    }
  }

  setGridDarkBg() {
    this.gridDarkBg(this.grid1);
    this.gridDarkBg(this.grid3);
    this.gridDarkBg(this.grid5);
    this.gridDarkBg(this.grid7);
    this.gridDarkBg(this.grid9);
  }

  gridDarkBg(gridList: any) {
    for (let i in gridList) {
      let g = document.getElementById(gridList[i])!;
      g.classList.add('grid-dark');
    }
  }

  onShowCellId(event: Event) {
    let target = event.target as HTMLInputElement;
    let nodes = document.querySelectorAll('.cell_title') as NodeListOf<HTMLElement>;
    if (target.checked) {
      nodes.forEach(node => {
        this.render.removeClass(node, "invisible");
        this.render.addClass(node, "visible");
        console.log("checked");
        console.log(node.classList.value);
      });
    } else {
      nodes.forEach(node => {
        this.render.removeClass(node, "visisble");
        this.render.addClass(node, "invisible");
        console.log("unchecked");
        console.log(node.classList.value);
      });
    }
  }

  onBoardClick(event: Event) {
    console.log(event);
    const target = event.target as HTMLElement;
    let cell;
    // console.log(`target_id clicked = ${target.id}`);
    if (target.id.startsWith('R')) {  // This is the Row not the cell
      return;
    } else {
        cell = target.id;
    }
    console.log(`cell clicked = ${cell}`);
    // if (gameState.wasNumberClicked) {
    //     update_puzzle(sq);
    // } else {
    //     if (sqHasValue(sq)) {
    //         const classes = String(document.getElementById(sq).classList);
    //         const buf = classes.split(' ');
    //         const r = buf[1];
    //         const c = buf[2];
    //         console.log(`classes = ${classes}, buf = ${buf}, r = ${r}, c = ${c}`);
    //         if (gameState.hlRow !== '0') {
    //             unHighlightRowAndColumn(gameState.hlRow, gameState.hlColumn);
    //             unHighlightSquareByValue(user_puzzle[sq]);
    //             setGridDarkBg();
    //         }
    //         highlightRowAndColumn(r, c);
    //         highlightSquareByValue(user_puzzle[sq]);
    //     }
    // }
  }

}
