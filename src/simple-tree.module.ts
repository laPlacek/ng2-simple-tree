import { NgModule } from '@angular/core';
import { SimpleTreeNodeDirective } from './simple-tree-node.directive';
import { SimpleTreeDirective } from './simple-tree.directive';
import { SimpleTreeNavigatorsProvider } from './simple-tree-navigator-provider.service';

@NgModule({
  declarations: [SimpleTreeDirective, SimpleTreeNodeDirective],
  exports: [SimpleTreeDirective, SimpleTreeNodeDirective],
  providers: [SimpleTreeNavigatorsProvider]
})
export class SimpleTreeModule { }
