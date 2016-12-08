import { Attribute, Directive, OnInit, OnDestroy } from '@angular/core';
import { SimpleTreeNavigator } from './simple-tree-navigator.service';
import { SimpleTreeNavigatorsProvider } from './simple-tree-navigator-provider.service';

@Directive({
  selector: '[simple-tree]',
  providers: [SimpleTreeNavigator]
})
export class SimpleTreeDirective implements OnInit, OnDestroy {
  constructor(private _treeNavigator: SimpleTreeNavigator,
              private _treeNavigatorsProvider: SimpleTreeNavigatorsProvider,
              @Attribute('simple-tree') private _treeName: string) { }

  ngOnInit(): void {
    this._treeNavigator.registerNode(this);
    this._treeNavigatorsProvider.register(this._treeNavigator, this._treeName);
  }

  ngOnDestroy(): void {
    this._treeNavigatorsProvider.unregister(this._treeNavigator);
  }
}
