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
      for (let j = 0; j < 9; j++) {
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
      let g = document.getElementById(gridList[i]) as HTMLElement;
      this.render.addClass(g, 'grid-dark');
    }
  }

  onBoardClick(event: Event) {
    // console.log(event);
    const target = event.target as HTMLElement;
    let cellId: string = '0';
    if (target.id.startsWith('R')) {
      // This is the Row not the cell
      return;
    } else {
      if (target.id) cellId = target.id;
      else if (target?.parentElement?.id) cellId = target.parentElement.id;
      else if (target?.parentElement?.parentElement?.id)
        cellId = target.parentElement.parentElement.id;
    }
    console.log(`cellId clicked = ${cellId}`);
    if (this.gameState.wasGuess) {
      this.update_puzzle(cellId);
    } else {
      if (this.getCellById(cellId)) {
        if (this.gameState.curHlCellId !== '0') {
          this.unHighlightRowAndColumn(this.gameState.curHlCellId);
          this.unHighlightSquareByValue(cellId.toString());
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

  numberClicked(e: Event) {
    const target = e.target as HTMLElement;
    let n = target.id.replace('N', '');
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
    this.gameState.curHlCellId = cellId;

    for (let i in this.cells) {
      const cell: Cell = this.cells[i];
      if (cell.id.endsWith(column)) {
        let col = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(col, 'grid-dark'); // if it's there
        this.render.addClass(col, 'selected');
      }
      if (cell.id.startsWith(row)) {
        let r = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(r, 'grid-dark'); // if it's there
        this.render.addClass(r, 'selected');
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
        this.render.removeClass(col, 'selected');
      }
      if (cell.id.startsWith(row)) {
        let r = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(r, 'selected');
      }
    }
  }

  highlightSquareByValue(value: string) {
    for (let k in this.cells) {
      let cell: Cell = this.cells[k];
      if (value === cell.value) {
        let el = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.removeClass(el, 'grid-dark'); // if it's there
        this.render.addClass(el, 'selected-red');
      }
    }
  }

  unHighlightSquareByValue(value: string) {
    for (let k in this.cells) {
      let cell = this.cells[k];
      if (value === cell.value) {
        let el = document.getElementById(cell.id.toString()) as HTMLElement;
        this.render.addClass(el, 'grid-dark');
        this.render.removeClass(el, 'selected-red');
      }
    }
  }

  update_puzzle(cellId: string) {
    console.log(
      `cellId = ${cellId}, numberClicked = ${this.gameState.numberClicked}`
    );
    let cell: Cell = this.getCellById(cellId);
    console.log(`cell = ${JSON.stringify(cell)}`);
    if (cell.value !== cell.solution) {
      alert(`Error: incorrect.`);
    } else {
      // this.sudoku.puzzle[sq] = parseInt(this.gameState.numberClicked);
      let selected_sq = document.getElementById(
        cell.id.toString()
      ) as HTMLElement;
      // TODO: stopped here
      // selected_sq.innerHTML += `<div class="sq_value" id="sq_value_${sq}">${this.sudoku.puzzle[sq]}</div>`;
    }
  }
}
