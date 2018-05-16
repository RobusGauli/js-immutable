<p align="center">
  <img src="https://github.com/RobusGauli/js-immutable/blob/master/assets/logo.jpg" />
</p>


<a href="https://travis-ci.org/RobusGauli/js-immutable">
    <img src="https://travis-ci.org/RobusGauli/js-immutable.svg?branch=master" hspace="10px" align="right" vspace="2px">
</a>

## Motivation 🐬🐬
Consider the scenario where you have to set a new value to <b>"temporary"</b> field without mutating original state.
```javascript
const state = {
  detail: {
    age: 30,
    friends: ['Roshan'],
    personal: {
      address: {
        permanent: 'Kathmandu',
        temporary; 'Pokhara'
      },
      spouse: 'Nancy'
    }
  }
}          
```
Javascript way of setting a new value without modifying original state would be something like this: 

```javascript
// For my brain, this is too much to wrap around just to change a single field.
// There must be some better way. 
const newState = {
  ...state,
  detail: {
    ...state.detail,
    personal: {
      ...state.detail.personal,
      address: {
        ...state.detail.personal.address,
        temporary: 'New Random Location' // here is the actual change
      }
    }
  }
} 

Look at all the repetition! This is not only annoying, but also provides a large surface area for bugs.
```

### Problems with the above code:
:pushpin: <span>Need to <b>keep track</b> of whole state tree just to perform such small modification.</span>
 
 :pushpin: <span>Need to make sure that state tree is not <b>mutated</b> while returning new state.</span>
 
 :pushpin: Need to make sure <b>structure</b> of state tree is not changed while returning new state. Specially it becomes nightmare in real world application where you don't know which action modified the entire redux state.

:pushpin: If structure of original state tree is modified, then every action reducer must be re-written. i.e Your reducer has an <b>dependency</b> on structure of redux state.

### JS Immutable in Action 
```unix
// Add as a dependency
npm install js-immutable --save
```
```javascript
import reduce from 'js-immutable';
```
```javascript
// create a address reducer by passing a selector

const addressReducer = reduce({
  detail: {
    personal: {
      address: {
        temporary: '#',
      }
    }
  }
})
```

```javascript
// No mutation fear
// State Structure is maintained
// No dependency to the state structure while returning new state

const newState = addressReducer(state)
  .set('New Random Location')
  .apply();
```
A more complex scenario where we need to append new friend to the friends list and set new value to permanent address.

```javascript

const complexReducer = reduce({
  detail: {
    friends: '#friends', // selector
    personal: {
      address: {
        permanent: '#permanent' // selector 
      }
    }
  }
});

// Clean and elegant 
const newState = complexReducer(state)
  .of('#friends') // using friends selector and appending
  .append('John')
  .of('#permanent') // using permanent selector and setting
  .set('New Value')
  .apply();

// or you can simply pipe it through predicate

const newState = complexReducer(state)
	.of('#friends')
	.pipe(friends => friends.concat('John'))
	.of('#permanent')
	.pipe(value => value.toUpperCase())
	.apply();
 ```
### Note
 ###### '#' is the default selector. You don't need to use "of("some selector")' when you use '#' as a selector.
                
 
 ### Benefits
 :pushpin: Structural Sharing out of Box. Performant!
 :pushpin: Your code is independent of the state tree and it's structure.
 
 :pushpin: You don't have to worry about mutation. Js-Immutable handles it for you.
 
 :pushpin: You only have to make changes to selector if structure of redux state tree is modified. Your reducer will never be touched in the case of state tree modification.

:pushpin: It looks functional, clean, simple and easy to follow. It just makes life of your co-worker easier.

 
## More on JS-Immutable

#### Selector

Selector are plain object that helps to select the fields on the state tree. Default selector value is '#'. The selector value must start with '#'. If your selector has multiple fields to select, Make sure they start with '#' and are unique.

```javascript
// Example of Selector

const selector = {
  person: {
    friends: '#' // default
  }
}
// Example of using the above selector

const friendsReducer = reduce(selector);

const newState = friendsReducer(state)
  .append('My new friend') // no need of "of('#')" since it is the default one.
  .apply();
```
```javascript
// Example of multiple selector

const nextSelector = {
  name: '#name', // named selector (unique)
  detail: {
    address: '#address' // named selector (unique)
  }
}

// Example of using the above selector

const multipleReducer = reduce(nextSelector);

const newState = multipleReducer(state)
	.of('#name')
	.set('New Name')
	.of('#address')
	.merge({temporary: 'Pokhara'})
	.apply();
```

#### Available Methods
<h4> 💧  set(value: any)</h4>Sets the new value to the target field.
<h4> 💧  append(value: any)</h4>Appends new value on the target array.
<h4> 💧  merge({key: value})</h4> Merge object on the target object.
<h4> 💧  extend([]: any)</h4> Concatenate array on the target array
<h4> 💧  delete(key: any)</h4> Delete a key on the target object or target array.
<h4> 💧  pipe(predicate: function)</h4> Applies a function/predicate to the target value.

### Utility Method
<h4> 💧 Of(selectorName: any)</h4>

Helps to select the specific target so that it apply transformation to that target in the object.

```javascript
// if we have a multiple targets in a single selector
const selector = {
  task: {
    done: '#done',
    taskDetail: '#taskDetail'
  }
}
const taskReducer = reduce(selector)

const newState = taskReducer
	.of('#done')
	.set(true)
	.of('#taskDetail')
	.set('some new Detail')
	.apply();
```

#### Note:
If you think I have missed methods that is crucially important, then please send a Pull Request.

### License

Copyright © 2015-2016 Robus, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt]
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.


---
Made with ♥ by Robus Gauli ([@robusgauli]
