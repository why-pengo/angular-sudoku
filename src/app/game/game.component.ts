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
      console.log(`working on ${JSON.stringify(cell)}`);
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
      console.log(`i = ${i}`);
      console.log(`gridList[i] = ${gridList[i]}`);
      console.log(`typeof gridList[i] = ${typeof gridList[i]}`);
      let g = document.getElementById(gridList[i]) as HTMLElement;
      console.log(`g = ${g}`);
      this.render.addClass(g, 'grid-dark');
    }
  }

  onBoardClick(event: Event) {
    console.log(event);
    const target = event.target as HTMLElement;
    let cell;
    // console.log(`target_id clicked = ${target.id}`);
    if (target.id.startsWith('R')) {
      // This is the Row not the cell
      return;
    } else {
      cell = target.id;
    }
    console.log(`cell clicked = ${cell}`);
    // if (gameState.wasNumberClicked) {
    //     update_puzzle(sq);
    // } else {
    // if (this.sqHasValue(cell)) {
    // if (gameState.hlRow !== '0') {
    //   unHighlightRowAndColumn(gameState.hlRow, gameState.hlColumn);
    //   unHighlightSquareByValue(user_puzzle[sq]);
    //   setGridDarkBg();
    // }
    // highlightRowAndColumn(r, c);
    // highlightSquareByValue(user_puzzle[sq]);
    // }
    // }
  }

  sqHasValue(sq: string) {
    // console.log(`puzzle[${sq}] = ${user_puzzle[sq]}`)
    // return user_puzzle[sq];
  }

  // numberClicked(e: Event) {
  //   let n = e.target.id.replace('N', '');
  //   if (gameState.wasNumberClicked === true) {
  //     gameState.wasNumberClicked = false;
  //     gameState.numberClicked = '0';
  //     board.classList.remove('crosshair');
  //   } else {
  //     gameState.wasNumberClicked = true;
  //     gameState.numberClicked = n;
  //     board.classList.add('crosshair');
  //   }
  // }

  highlightRowAndColumn(row: string, column: string) {
    console.log(`highlighting row = ${row}, column = ${column}`);
    // gameState.hlRow = row;
    // gameState.hlColumn = column;
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
    // for (let k in squares) {
    //   let sq_id = squares[k];
    //   if (value === user_puzzle[sq_id]) {
    //     let sqById = document.getElementById(sq_id);
    //     sqById.classList.remove('grid-dark');  // if it's there
    //     sqById.classList.add('selected-red');
    //   }
    // }
  }

  unHighlightSquareByValue(value: string) {
    // for (let k in squares) {
    //   let sq_id = squares[k];
    //   let sqById = document.getElementById(sq_id);
    //   sqById.classList.remove('grid-dark');  // if it's there
    //   sqById.classList.remove('selected-red');
    // }
  }
}
