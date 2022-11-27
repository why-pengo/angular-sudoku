import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { Cell } from '../models/cell';
import { GameStateService } from '../services/game-state.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, AfterViewInit {
  sudoku = this.gameState.sudoku;
  rows = this.gameState.rows;
  rowsCount = this.gameState.rowsCount;
  cells: Cell[] = [];

  constructor(
    private render: Renderer2,
    private gameState: GameStateService,
    private utilsSrv: UtilsService
  ) {
    console.log(`sudoku = ${JSON.stringify(this.sudoku)}`);
    console.log(`rowsCount = ${this.rowsCount}`);
    console.log(`rows = ${this.rows}`);
    for (let i = 0; i < 9; i++) {
      let row_p = this.sudoku.puzzle[i];
      let row_s = this.sudoku.solution[i];
      // console.log(`row ${rows[i]}= ${JSON.stringify(row)}`);
      for (let j = 0; j < 9; j++) {
        // console.log(`row[j] = ${row[j]}`);
        // console.log(`cell id: ${rows[i]}${j}, solution: ${row_s[j]}, value: ${row_p[j]}`);
        // let c: Cell = { id: `${this.rows[i]}${j + 1}`, guess: [], solution: `${row_s[j]}`, value: `${row_p[j]}`, };
        let c = new Cell(
          `${this.rows[i]}${j + 1}`,
          [],
          `${row_p[j]}`,
          `${row_s[j]}`
        );
        this.cells.push(c);
      }
    }
    // console.log(`cells = ${JSON.stringify(this.cells)}`);
  }

  onShowCellId(event: Event): void {
    this.utilsSrv.onShowCellId(event, this.render);
  }

  ngAfterViewInit(): void {
    this.initializeBoard();
    this.setGridDarkBg();
  }

  ngOnInit(): void {}

  initializeBoard() {
    for (let i in this.cells) {
      const cell: Cell = this.cells[i];
      if (cell.value === '-1') continue;
      // console.log(`working on ${JSON.stringify(cell)}`);
      let el = document.getElementById(cell.id) as HTMLElement;
      let ch = el.querySelector('.cell_value') as HTMLElement;
      ch.textContent = cell.value;
    }
  }

  setGridDarkBg() {
    this.gridDarkBg(this.gameState.grid1);
    this.gridDarkBg(this.gameState.grid3);
    this.gridDarkBg(this.gameState.grid5);
    this.gridDarkBg(this.gameState.grid7);
    this.gridDarkBg(this.gameState.grid9);
  }

  gridDarkBg(gridList: any) {
    for (let i in gridList) {
      // console.log(`i = ${i}`);
      // console.log(`gridList[i] = ${gridList[i]}`);
      // console.log(`typeof gridList[i] = ${typeof gridList[i]}`);
      let g = document.getElementById(gridList[i]) as HTMLElement;
      this.render.addClass(g, 'grid-dark');
    }
  }

  onBoardClick(event: Event) {
    // console.log(event);
    const target = event.target as HTMLElement;
    let cell: number = 0;
    if (target.id.startsWith('R')) {
      // This is the Row not the cell
      return;
    } else {
      if (target.id) cell = parseInt(target.id);
      else if (target?.parentElement?.id)
        cell = parseInt(target.parentElement.id);
      else if (target?.parentElement?.parentElement?.id)
        cell = parseInt(target.parentElement.parentElement.id);
    }
    console.log(`cell clicked = ${cell}`);
    if (this.gameState.wasNumberClicked) {
      this.update_puzzle(cell);
    } else {
      if (this.sqHasValue(cell)) {
        if (this.gameState.hlRow !== '0') {
          this.unHighlightRowAndColumn(
            this.gameState.hlRow,
            this.gameState.hlColumn
          );
          this.unHighlightSquareByValue(cell.toString());
          this.setGridDarkBg();
        }
        // this.highlightRowAndColumn(r, c);
        this.highlightSquareByValue(cell.toString());
      }
    }
  }

  sqHasValue(sq: number) {
    console.log(`puzzle[${sq}] = ${this.sudoku.puzzle[sq]}`);
    return this.sudoku.puzzle[sq];
  }

  numberClicked(e: Event) {
    const target = e.target as HTMLElement;
    let n = target.id.replace('N', '');
    if (this.gameState.wasNumberClicked === true) {
      this.gameState.wasNumberClicked = false;
      this.gameState.numberClicked = '0';
      // this.board.classList.remove('crosshair');
    } else {
      this.gameState.wasNumberClicked = true;
      this.gameState.numberClicked = n;
      // board.classList.add('crosshair');
    }
  }

  highlightRowAndColumn(row: string, column: string) {
    console.log(`highlighting row = ${row}, column = ${column}`);
    this.gameState.hlRow = row;
    this.gameState.hlColumn = column;
    const col = document.getElementsByClassName(column);
    for (let i = 0; i < col.length; i++) {
      col[i].classList.remove('grid-dark'); // if it's there
      col[i].classList.add('selected');
    }
    const rw = document.getElementsByClassName(row);
    for (let i = 0; i < rw.length; i++) {
      rw[i].classList.remove('grid-dark'); // if it's there
      rw[i].classList.add('selected');
    }
  }

  unHighlightRowAndColumn(row: string, column: string) {
    console.log(`unhighlighting row = ${row}, column = ${column}`);
    const col = document.getElementsByClassName(column);
    for (let i = 0; i < col.length; i++) {
      col[i].classList.remove('selected');
    }
    const r = document.getElementsByClassName(row);
    for (let i = 0; i < r.length; i++) {
      r[i].classList.remove('selected');
    }
  }

  highlightSquareByValue(value: string) {
    for (let k in this.cells) {
      let sq_id = this.cells[k].id;
      // if (value === this.sudoku.puzzle[sq_id]) {
      //   let sqById = document.getElementById(sq_id) as HTMLElement;
      //   sqById.classList.remove('grid-dark'); // if it's there
      //   sqById.classList.add('selected-red');
      // }
    }
  }

  unHighlightSquareByValue(value: string) {
    for (let k in this.cells) {
      let sq_id = this.cells[k].id;
      let sqById = document.getElementById(sq_id) as HTMLElement;
      sqById.classList.remove('grid-dark'); // if it's there
      sqById.classList.remove('selected-red');
    }
  }

  update_puzzle(sq: number) {
    console.log(`sq = ${sq}, numberClicked = ${this.gameState.numberClicked}`);
    console.log(`user_puzzle[sq] = ${this.sudoku.puzzle[sq]}`);
    console.log(`puzzle_answer[sq] = ${this.sudoku.solution[sq]}`);
    if (this.sudoku.puzzle[sq] !== this.sudoku.solution[sq]) {
      alert(`Error: incorrect.`);
    } else {
      // this.sudoku.puzzle[sq] = parseInt(this.gameState.numberClicked);
      let selected_sq = document.getElementById(sq.toString()) as HTMLElement;
      selected_sq.innerHTML += `<div class="sq_value" id="sq_value_${sq}">${this.sudoku.puzzle[sq]}</div>`;
    }
  }
}
