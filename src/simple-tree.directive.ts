import { SimpleTreeItemDirective } from './simple-tree-item.directive';
import { Directive, ElementRef, AfterContentInit, QueryList, ContentChildren, OnInit, OnDestroy } from '@angular/core';
import { SimpleTreeNavigator, SimpleTreeNode } from './simple-tree-navigator.service';
import { SimpleTreeNavigatorsProvider } from './simple-tree-navigator-provider.service';

@Directive({
  selector: '[simple-tree]',
  providers: [SimpleTreeNavigator]
})
export class SimpleTreeDirective implements OnInit, OnDestroy, AfterContentInit, SimpleTreeNode {
  @ContentChildren(SimpleTreeItemDirective)
  private _treeItems: QueryList<SimpleTreeItemDirective>;

  path: string;

  constructor(private _treeNavigator: SimpleTreeNavigator,
              private _treeNavigatorsProvider: SimpleTreeNavigatorsProvider,
              private _elementRef: ElementRef) { }

  ngOnInit(): void {
    let treeName = this._elementRef.nativeElement.attributes['simple-tree'].value;

    this._treeNavigatorsProvider.register(this._treeNavigator, treeName);
  }

  ngOnDestroy(): void {
    this._treeNavigatorsProvider.unregister(this._treeNavigator);
  }

  ngAfterContentInit(): void {
    this._treeNavigator.init(this);
  }

  getChildren(): SimpleTreeNode[] {
    return this._treeItems.toArray();
  }
}
