import {
  HostListener, Input, Output, Directive, HostBinding, ContentChildren, OnDestroy, QueryList,
  EventEmitter
} from '@angular/core';
import { SimpleTreeNavigator, SimpleTreeNode } from './simple-tree-navigator.service';

@Directive({
  selector: '[simple-tree-item]'
})
export class SimpleTreeItemDirective implements OnDestroy, SimpleTreeNode {
  @HostBinding('class.active-tree-node') private _isActiveNode: boolean;
  @HostBinding('class.active-tree-item') private _isActiveItem: boolean;

  @ContentChildren(SimpleTreeItemDirective) private _treeItems: QueryList<SimpleTreeItemDirective>;

  @Output() isActiveItemChange = new EventEmitter<boolean>();
  @Output() isActiveNodeChange = new EventEmitter<boolean>();

  @Input() set isActiveItem(v: boolean){ this._updateTreePath(v); }

  path: string;

  private _treePathSubscription = this._treeNavigator.treePath.subscribe(this._updateListeners.bind(this));

  constructor(private _treeNavigator: SimpleTreeNavigator) {}

  ngOnDestroy(): void {
    this._treePathSubscription.unsubscribe();
  }

  getChildren(): SimpleTreeNode[] {
    return this._treeItems.filter((ti, i) => !!i);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (event['_treeClickHandled'])
      return;

    event['_treeClickHandled'] = true;
    this._updateTreePath(true);
  }

  private _updateListeners(): void {
    let isActiveItem = this._treeNavigator.isCurrentPath(this.path);
    let isActiveNode = this._treeNavigator.isSubpath(this.path);

    if (isActiveItem !== this._isActiveItem) this.isActiveItemChange.emit(isActiveItem);
    if (isActiveNode !== this._isActiveNode) this.isActiveNodeChange.emit(isActiveNode);

    this._isActiveItem = isActiveItem;
    this._isActiveNode = isActiveNode;
  }

  private _updateTreePath(isActive: boolean): void {
    if (!this.path) {
      this._treeNavigator
        .onInit
        .subscribe(() => {
          this._updateTreePath(isActive);
        });

      return;
    }

    if (!this._treeNavigator.isCurrentPath(this.path) && !isActive)
      return;

    if (!isActive)
      this._treeNavigator.goUp();

    this._treeNavigator.goToPath(this.path);
  }
}
