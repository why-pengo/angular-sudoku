import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Input() cellId?: string;
  @Input() cellValue?: string;

  constructor(private utilsSrv: UtilsService, private render: Renderer2) {}

  onShowCellId(event: Event): void {
    this.utilsSrv.onShowCellId(event, this.render);
  }

  ngOnInit(): void {}
}
