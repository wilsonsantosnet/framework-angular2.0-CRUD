import { Component, Input } from '@angular/core';

@Component({
    selector: 'tree-view',
    template: `
  <ul>
    <li *ngFor="let node of treeData">
      {{node.name}}
      <tree-view [treeData]="node.tree"></tree-view>
    </li>
  </ul>
  `
})
export class TreeViewComponent {

    @Input() treeData: any[];

}