import { Injectable } from '@angular/core';
import { SimpleTreeNavigator } from './simple-tree-navigator.service';
import { findKey } from 'lodash';

@Injectable()
export class SimpleTreeNavigatorsProvider {
  private _treeNavigators: { [treeName: string]: SimpleTreeNavigator } = {};
  private _counter = 0;

  register(treeNavigator: SimpleTreeNavigator, treeName?: string) {
    treeName = treeName || (++this._counter).toString();

    if (this._treeNavigators[treeName])
      throw 'Tree named ' + treeName + ' already exists';

    this._treeNavigators[treeName] = treeNavigator;
  }

  unregister(treeNavigator: SimpleTreeNavigator) {
    let treeName = findKey(this._treeNavigators, tn => tn === treeNavigator);
    delete (this._treeNavigators[treeName]);
  }

  get(treeName: string): SimpleTreeNavigator {
    if (this._treeNavigators[treeName])
      throw 'Tree named ' + treeName + ' does not exist';

    return this._treeNavigators[treeName];
  }
}
