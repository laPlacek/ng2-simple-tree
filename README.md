# ng2-simple-tree
Simple markup-driven tree for Angular2


## Why?
Because of need for very simple markup-driven tree basing on **directives** applicable to any HTML element.




## Setup
### Package installation
```javascript
npm install @laplacek/ng2-simple-tree –-save
```


### Importing TranslationsModule
```javascript
@NgModule({
  imports: [SimpleTree /*, … */]
})
export class SharedModule { }
```



## Building tree

### Defining tree
Tree can be aplied on any markup element. Just use *simple-tree* directive for a tree root and *simple-tree-item* defining tree nodes.
Every *simple-tree-item* inside other *simple-tree-item* will become it's child.

```html
<ul simple-tree>
  <li simple-tree-item [(isActiveItem)]="doYouLikeFruits">
    <span>Fruits</span>
    <ul>
      <li simple-tree-item>Banana</li>
      <li simple-tree-item>
        <span>Apple</span>
        <ul>
          <li simple-tree-item>Yellow</li>
          <li simple-tree-item>Red</li>
        </ul>
      </li>
      <li simple-tree-item>Orange</li>
    </ul>
  </li>
  <li simple-tree-item [isActiveItem]="true">
    <span>Vegetables</span>
    <ul>
      <li simple-tree-item>Tomato</li>
      <li simple-tree-item>Carrot</li>
    </ul>
  </li>
  <li simple-tree-item>No children item</li>
</ul>
```



### Defining one tree inside another
One simple tree can contain the other.

```html
<ul simple-tree>
  <li simple-tree-item>
    <span>Cars</span>
    <ul>
      <li simple-tree-item>Trucks</li>
      <li simple-tree-item>
        <span>Roadsters</span>
        <ul simple-tree>
          <li simple-tree-item>BMW Z4</li>
          <li simple-tree-item>Mazda MX5</li>
        </ul>
      </li>
      <li simple-tree-item>Orange</li>
    </ul>
  </li>
  <li simple-tree-item>Boats</li>
</ul>
```

## Using tree
### Every currently active **item** gets (the one fully representing the path) has *active-tree-item* class set.
### Every currently active **node** (item having any descendad active) has *active-tree-node* class set.

## Accessing tree

### From component inside the tree
Every *simple-tree* directive provides a *SimpleTreeNavigator* service. That means, that navigator for current tree is accessible via Angular2 Dependency Injection mechanism in every child component of our tree.
```javascript
@Component({
  // ...
})
export class SomeComponentUsingTree {
    currentPath: Observable<string> = this._simpleTreeNavigator.treePath;  //observable with current path
    
    constructor(private _simpleTreeNavigator: SimpleTreeNavigator){ }
    
    goBack() {
        this._simpleTreeNavigator.goUp(); //go up in three
    }
}
```

### From every other place in code
Every tree can also be accessed from any other place in code. 
To do that however, the tree must be defined with a name:
```html
<div simple-tree="CarsTree">
  <div>Cars</div>
  <div simple-tree-item>BMW</div>
  <div simple-tree-item>Mazda</div>
  <div simple-tree-item>
      <span>Toyota</span>
        <div simple-tree-item>Corolla</div>
        <div simple-tree-item>RAV 4</div>
  </div>    
</div>
```


Accessing inside the service:
```javascript
@Injectable()
export class SomeServiceUsingTree {
    constructor(private _simpleTreeNavigatorsProvider: SimpleTreeNavigatorsProvider){ }
    
    goToToyotaCorolla() {
        let navigator = this._simpleTreeNavigatorsProvider.get('CarsTree');
        navigator.goToPath('/3/1');
    }
}
```