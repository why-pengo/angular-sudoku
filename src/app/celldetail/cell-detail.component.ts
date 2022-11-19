import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-celldetail',
  templateUrl: './cell-detail.component.html',
  styleUrls: ['./cell-detail.component.css'],
})
export class CellDetailComponent implements OnInit {
  constructor(private render: Renderer2) {}

  ngOnInit(): void {
    let gridCell = document.querySelector('.cell') as HTMLElement;
    this.render.setStyle(gridCell, 'max-width', '6rem');

    let cellTitle = document.querySelector('.cell_title') as HTMLElement;
    this.render.removeClass(cellTitle, 'invisible');
    this.render.addClass(cellTitle, 'visible');

    let cellValue = document.querySelector('.cell_value') as HTMLElement;
    cellValue.textContent = '7';

    let guesses = document.querySelectorAll(
      '.guess'
    ) as NodeListOf<HTMLElement>;
    guesses.forEach((guess) => {
      this.render.removeClass(guess, 'invisible');
      this.render.addClass(guess, 'visible');
    });
  }
}
