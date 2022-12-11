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
    for (let i = 0; i < 9; i++) {
      let row_p = this.sudoku.puzzle[i];
      let row_s = this.sudoku.solution[i];
      for (let j = 0; j < 9; j++) {
        let c = new Cell(
          `${this.rows[i]}${j + 1}`,
          [],
          `${row_p[j] + 1}`,
          `${row_s[j] + 1}`
        );
        this.cells.push(c);
      }
    }
    // console.table(this.sudoku.puzzle);
    console.table(this.cells);
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
      if (cell.value === '0') continue;
      this.setCellValue(cell);
    }
  }

  setCellValue(cell: Cell) {
    let el = document.getElementById(cell.id) as HTMLElement;
    let ch = el.querySelector('.cell_value') as HTMLElement;
    ch.textContent = cell.value;
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
      let g = document.getElementById(gridList[i]) as HTMLElement;
      this.render.addClass(g, 'grid-dark');
    }
  }

  onBoardClick(event: Event) {
    const target = event.target as HTMLElement;
    let cellId: string = '0';
    if (target.id) cellId = target.id;
    else if (target?.parentElement?.id) cellId = target.parentElement.id;
    else if (target?.parentElement?.parentElement?.id)
      cellId = target.parentElement.parentElement.id;
    console.log(`cellId clicked = ${cellId}`);
    if (this.gameState.wasGuess) {
      this.update_puzzle(cellId);
    } else {
      if (this.getCellById(cellId)) {
        if (this.gameState.curHlCellId !== '0') {
          this.unHighlightRowAndColumn(this.gameState.curHlCellId);
          this.unHighlightSquareByValue(this.gameState.curHlCellId);
          this.setGridDarkBg();
        }
        this.highlightRowAndColumn(cellId.toString());
        this.highlightSquareByValue(cellId.toString());
      }
    }
  }

  getCellById(cellId: string): Cell {
    let cell: Cell = this.cells.find((c) => c.id === cellId)!;
    console.log(`cell[${cellId}] = ${JSON.stringify(cell)}`);
    return cell;
  }

  numberClicked(event: Event) {
    const target = event.target as HTMLElement;
    let numberId: string = '0';
    if (target.id) numberId = target.id;
    else if (target?.parentElement?.id) numberId = target.parentElement.id;
    else if (target?.parentElement?.parentElement?.id)
      numberId = target.parentElement.parentElement.id;
    console.log(`numberId clicked = ${numberId}`);

    let n = numberId.replace('N', '');
    if (this.gameState.wasGuess) {
      this.gameState.wasGuess = false;
      this.gameState.numberClicked = '0';
      // this.board.classList.remove('crosshair');
    } else {
      this.gameState.wasGuess = true;
      this.gameState.numberClicked = n;
      // board.classList.add('crosshair');
    }
  }

  highlightRowAndColumn(cellId: string) {
    let [row, column] = cellId.split('');
    console.log(`highlighting row = ${row}, column = ${column}`);
    if (cellId === this.gameState.curHlCellId) return;
    this.gameState.curHlCellId = cellId;

    for (let i in this.cells) {
      const cell: Cell = this.cells[i];
      if (cell.id.endsWith(column)) {
        let col = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(col, 'grid-dark'); // if it's there
        this.render.addClass(col, 'selected-cell');
      }
      if (cell.id.startsWith(row)) {
        let r = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(r, 'grid-dark'); // if it's there
        this.render.addClass(r, 'selected-cell');
      }
    }
  }

  unHighlightRowAndColumn(cellId: string) {
    let [row, column] = cellId.split('');
    console.log(`unhighlighting row = ${row}, column = ${column}`);

    for (let i in this.cells) {
      const cell: Cell = this.cells[i];
      if (cell.id.endsWith(column)) {
        let col = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(col, 'selected-cell');
      }
      if (cell.id.startsWith(row)) {
        let r = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(r, 'selected-cell');
      }
    }
  }

  highlightSquareByValue(cellId: string) {
    console.log(`highlightSquareByValue cellId = ${cellId}`);
    let cellIn: Cell = this.getCellById(cellId);
    if (cellIn.value === '0') return;
    for (let k in this.cells) {
      let cell: Cell = this.cells[k];
      if (cellIn.value === cell.value) {
        let el = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(el, 'selected-cell'); // if it's there
        this.render.addClass(el, 'selected-cell-red');
      }
    }
  }

  unHighlightSquareByValue(cellId: string) {
    console.log(`unHighlightSquareByValue cellId = ${cellId}`);
    let cellIn: Cell = this.getCellById(cellId);
    for (let k in this.cells) {
      let cell = this.cells[k];
      if (cellIn.value === cell.value) {
        let el = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(el, 'selected-cell-red');
      }
    }
  }

  update_puzzle(cellId: string) {
    console.log(
      `cellId = ${cellId}, numberClicked = ${this.gameState.numberClicked}`
    );
    let cell: Cell = this.getCellById(cellId);
    console.log(`cell = ${JSON.stringify(cell)}`);
    if (this.gameState.numberClicked !== cell.solution) {
      alert(`Error: incorrect.`);
    } else {
      cell.value = this.gameState.numberClicked;
      console.log(`cell = ${JSON.stringify(cell)}`);
      this.setCellValue(cell);
    }
  }
}
