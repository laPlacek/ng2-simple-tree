import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { startsWith, each } from 'lodash';

const PATH_SEPARATOR = '/';

export interface SimpleTreeNode {
  path: string;
  getChildren(): SimpleTreeNode[];
}

@Injectable()
export class SimpleTreeNavigator {
  private _treePath = new BehaviorSubject<string>(PATH_SEPARATOR);

  treePath = this._treePath.distinctUntilChanged();
  onInit = new EventEmitter();

  goToPath = (path: string) => this._treePath.next(path);
  isSubpath = (path: string) => startsWith(this._treePath.value, path);
  isCurrentPath = (path: string) => this._treePath.value === path;

  init(rootNode: SimpleTreeNode) {
    this._setPath(PATH_SEPARATOR, rootNode);
    this.onInit.emit();
  }

  goUp(): void {
    let pathArray = this._treePath.value.split(PATH_SEPARATOR);
    pathArray.splice(-2, 2);

    this.goToPath(pathArray.join(PATH_SEPARATOR) + PATH_SEPARATOR);
  }

  private _setPath(path: string, treeNode: SimpleTreeNode) {
    treeNode.path = path;
    each(treeNode.getChildren(), (tn, i) => this._setPath(path + i + PATH_SEPARATOR, tn));
  }
}
