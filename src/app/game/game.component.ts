import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
    // this.drawBoard();
  }

  drawBoard() {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    const board = document.getElementById('board');
    for (let i in rows) {
        const div = document.createElement('div');
        div.className = 'row justify-content-end';
        div.innerHTML = `
            <div class="square R${rows[i]} C1" id="${rows[i]}1"><p class="sq_title">${rows[i]}1</p></div>
            <div class="square R${rows[i]} C2" id="${rows[i]}2"><p class="sq_title">${rows[i]}2</p></div>
            <div class="square R${rows[i]} C3" id="${rows[i]}3"><p class="sq_title">${rows[i]}3</p></div>
            <div class="square R${rows[i]} C4" id="${rows[i]}4"><p class="sq_title">${rows[i]}4</p></div>
            <div class="square R${rows[i]} C5" id="${rows[i]}5"><p class="sq_title">${rows[i]}5</p></div>
            <div class="square R${rows[i]} C6" id="${rows[i]}6"><p class="sq_title">${rows[i]}6</p></div>
            <div class="square R${rows[i]} C7" id="${rows[i]}7"><p class="sq_title">${rows[i]}7</p></div>
            <div class="square R${rows[i]} C8" id="${rows[i]}8"><p class="sq_title">${rows[i]}8</p></div>
            <div class="square R${rows[i]} C9" id="${rows[i]}9"><p class="sq_title">${rows[i]}9</p></div>
        `;
        if (board) board.appendChild(div);
    }
    // setGridDarkBg();
}

}
