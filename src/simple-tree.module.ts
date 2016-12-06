import { NgModule } from '@angular/core';
import { SimpleTreeItemDirective } from './simple-tree-item.directive';
import { SimpleTreeDirective } from './simple-tree.directive';
import { SimpleTreeNavigatorsProvider } from './simple-tree-navigator-provider.service';

@NgModule({
  declarations: [SimpleTreeDirective, SimpleTreeItemDirective],
  exports: [SimpleTreeDirective, SimpleTreeItemDirective],
  providers: [SimpleTreeNavigatorsProvider]
})
export class SimpleTreeModule { }
