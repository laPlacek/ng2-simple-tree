import { HostListener, Input, Output, Directive, HostBinding, OnDestroy, Optional, SkipSelf, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SimpleTreeNavigator } from './simple-tree-navigator.service';
import { SimpleTreeDirective } from './simple-tree.directive';

@Directive({
  selector: '[simple-tree-node]'
})
export class SimpleTreeNodeDirective implements OnDestroy {
  @HostBinding('class.active-node') private _isActiveNode: boolean;
  @HostBinding('class.current-node') private _isCurrentNode: boolean;

  @Output() isCurrentNodeChange: Observable<boolean>;
  @Output() isActiveNodeChange: Observable<boolean>;

  @Input() set isCurrentNode(v: boolean){ this._setIsCurrentNode(v); }

  private _currentNodeSubscription: Subscription;
  private _activeNodeSubscription: Subscription;
  private _parentNode: any;

  constructor(private _treeNavigator: SimpleTreeNavigator,
              rootNode: SimpleTreeDirective,
              @SkipSelf() @Optional() parentNode: SimpleTreeNodeDirective) {
    this._parentNode = parentNode || rootNode;
  }

  ngOnInit(): void {
    let observables = this._treeNavigator.registerNode(this, this._parentNode);

    this.isCurrentNodeChange = observables.isCurrentNode;
    this.isActiveNodeChange = observables.isActiveNode;

    this._currentNodeSubscription = this.isCurrentNodeChange.subscribe(icn => this._isCurrentNode = icn);
    this._activeNodeSubscription = this.isActiveNodeChange.subscribe(ian => this._isActiveNode = ian);
  }

  ngOnDestroy(): void {
    this._treeNavigator.unregisterNode(this);
    this._currentNodeSubscription.unsubscribe();
    this._activeNodeSubscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (event['_simpleTreeNodeClickHandled'])
      return;

    event['_simpleTreeNodeClickHandled'] = true;
    this._setIsCurrentNode(true);
  }

  private _setIsCurrentNode(isCurrent: boolean): void {
    if (!this._isActiveNode && !isCurrent)
      return;

    if (!isCurrent)
      this._treeNavigator.goUp();

    this._treeNavigator.goToNode(this);
  }
}
