import { Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  onShowCellId(event: Event, render: Renderer2): void {
    let target = event.target as HTMLInputElement;
    let nodes = document.querySelectorAll(
      '.cell_title'
    ) as NodeListOf<HTMLElement>;
    if (target.checked) {
      nodes.forEach((node) => {
        render.removeClass(node, 'invisible');
        render.addClass(node, 'visible');
        console.log('checked');
        console.log(node.classList.value);
      });
    } else {
      nodes.forEach((node) => {
        render.removeClass(node, 'visisble');
        render.addClass(node, 'invisible');
        console.log('unchecked');
        console.log(node.classList.value);
      });
    }
  }
}
