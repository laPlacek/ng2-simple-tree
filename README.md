# ng2-simple-tree
Simple markup-driven tree for Angular2


## Why?
Because of need for very simple markup-driven tree basing on **directives** applicable to any HTML element.




## Setup
### Package installation
```javascript
npm install @laplacek/ng2-simple-tree –-save
```


### Importing module
```javascript
@NgModule({
  imports: [SimpleTreeModule /*, … */]
})
export class SharedModule { }
```



## Building tree

### Defining tree
Tree can be aplied on any markup element. Just use *simple-tree* directive for a tree root and *simple-tree-node* defining tree nodes.
Every *simple-tree-node* inside other *simple-tree-node* becomes it’s child.

```html
<ul simple-tree>
  <li simple-tree-node [(isCurrentNode)]="doYouLikeFruits">
    <span>Fruits</span>
    <ul>
      <li simple-tree-node>Banana</li>
      <li simple-tree-node>
        <span>Apple</span>
        <ul>
          <li simple-tree-node>Yellow</li>
          <li simple-tree-node>Red</li>
        </ul>
      </li>
      <li simple-tree-node>Orange</li>
    </ul>
  </li>
  <li simple-tree-node [isCurrentNode]="true">
    <span>Vegetables</span>
    <ul>
      <li simple-tree-node>Tomato</li>
      <li simple-tree-node>Carrot</li>
    </ul>
  </li>
  <li simple-tree-node>No children item</li>
</ul>
```



### Defining one tree inside another
One simple tree can contain the other. The trees are then **independent**, so selecting/deselecting node in one, will not affect the nodes in another.

```html
<ul simple-tree>
  <li simple-tree-node>
    <span>Cars</span>
    <ul>
      <li simple-tree-node>Trucks</li>
      <li simple-tree-node>
        <span>Roadsters</span>
        <ul simple-tree> <!--Another, independent tree is defined-->
          <li simple-tree-node>BMW Z4</li>
          <li simple-tree-node>Mazda MX5</li>
        </ul>
      </li>
      <li simple-tree-node>Orange</li>
    </ul>
  </li>
  <li simple-tree-node>Boats</li>
</ul>
```

## Using tree
**Current** node element has *current-node* class set.  
Tree node element **beeing current or having any current descendant** has *active-node* class set.

## Accessing tree

### From component inside the tree
Every *simple-tree* directive provides a *SimpleTreeNavigator* service. That means, that navigator for current tree is accessible via Angular2 Dependency Injection mechanism in every child component of our tree.
```javascript
@Component({
  // ...
})
export class TreeAwareComponent {
    currentPath: Observable<string> = this._simpleTreeNavigator.treePath;  //observable with current path
    
    constructor(private _simpleTreeNavigator: SimpleTreeNavigator){ }
    
    goBack() {
        this._simpleTreeNavigator.goUp(); //go up in three
    }
}
```

### From every other place in code
Every tree can also be accessed from any other place in code.  
To do that the tree must be defined with a name:
```html
<div simple-tree="CarsTree">
  <div>Cars</div>
  <div simple-tree-node>BMW</div>
  <div simple-tree-node>Mazda</div>
  <div simple-tree-node>
      <span>Toyota</span>
        <div simple-tree-node>Corolla</div>
        <div simple-tree-node>RAV 4</div>
  </div>    
</div>
```


It's *SimpleTreeNavigator* can than be accessed via *SimpleTreeNavigatorsProvider*:
```javascript
@Injectable()
export class TreeAwareService {
    constructor(private _simpleTreeNavigatorsProvider: SimpleTreeNavigatorsProvider){ }
    
    goUp() {
        let navigator = this._simpleTreeNavigatorsProvider.get('CarsTree');
        navigator.goUp();
    }
}
```