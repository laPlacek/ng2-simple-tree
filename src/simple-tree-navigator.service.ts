import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface NodeObservables {
  isCurrentNode: Observable<boolean>;
  isActiveNode: Observable<boolean>;
}

@Injectable()
export class SimpleTreeNavigator {
  private _parentsMap = new Map<any, any>();
  private _currentNode = new BehaviorSubject<any>(undefined);

  goToNode = (node: any) => this._currentNode.next(node);

  registerNode(node: any, parentNode?: any): NodeObservables {
    this._parentsMap.set(node, parentNode);

    return {
      isCurrentNode: this._createIsCurrentNodeObservable(node),
      isActiveNode: this._createIsActiveNodeObservable(node)
    }
  }

  unregisterNode(node: any): void {
    this._parentsMap.delete(node);
  }

  _createIsCurrentNodeObservable(node: any): Observable<boolean> {
    return this._currentNode.map(cn => cn === node);
  }

  _createIsActiveNodeObservable(node: any): Observable<boolean> {
    return this._currentNode.map(cn => this._isAncestor(node, cn));
  }

  _isAncestor(node: any, node2?: any): boolean {
    if (!node2) return false;
    return node === node2 || this._isAncestor(node, this._parentsMap.get(node2));
  }

  goUp(): void {
    let parentNode = this._parentsMap.get(this._currentNode.value);
    if(parentNode)
      this._currentNode.next(parentNode);
  }
}
