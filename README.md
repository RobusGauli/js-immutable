<p align="center">
  <img src="https://github.com/RobusGauli/js-immutable/blob/master/assets/logo.jpg" />
</p>


<a href="https://travis-ci.org/RobusGauli/react-state-reducer">
    <img src="https://travis-ci.org/RobusGauli/react-state-reducer.svg?branch=master" hspace="10px" align="right" vspace="2px">
</a>

## Motivation 🐬🐬
Consider the scenario where you have to set a new value to <b>"temporary"</b> field without mutating original state.
```javascript
const state = {
  name: 'Safal',
  age: 45,
  friends: [],
  detail: {
   	personal: {
    	address: {
				permanent: 'Kathmandu'
      }
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
 ```
### Note
 ###### '#' is the default selector. You don't need to use "of("some selector")' when you use '#' as a selector.
                
 
 ### Benefits
 
 :pushpin: Your code is independent of the state tree and it's structure.
 
 :pushpin: You don't have to worry about mutation. Js-Immutable handles it for you.
 
 :pushpin: You only have to make changes to selector if structure of redux state tree is modified. Your reducer will never be touched in the case of state tree modification.

:pushpin: It looks functional, clean, simple and easy to follow. It just makes life of your co-worker easier.

 
## Usage



```javascript
import reduce from 'js-immutable';
```

```javascript
// Sample State
const originalState = {
	detail: {
		address: {
			permanent: 'Kathmandu',
		},
		friends: ['robus', 'rahul', 'ishan'],
		age: 24,
		isOnline: false,
		education: {
			primary: 'blah',
			secondary: 'blah blah'
		}
		
	}
}
```
```javascript
// create a selector for address object
const addressSelector = { 
	detail: {
		address: '#'
	}
}
```
```javascript
// React State Reducer in action.
const addressReducer = reduce(addressSelector);

const newState = addressReducer(addressSelector)
	.merge({temporary: 'Pokhara'})
	.apply();
	
```

<img src="https://raw.githubusercontent.com/robb/Cartography/master/images/pirates1.png" align="right" height="200px"  hspace="30px" vspace="30px">

## Result

```javascript
	console.log(newState);
	// => {
	detail: {
		address: {
			permanent: 'Kathmandu',
			temporary: 'Pokhara' // merged //
		},
		friends: ['robus', 'rahul', 'ishan'],
		age: 24,
		isOnline: false,
		education: {
			primary: 'blah',
			secondary: 'blah blah'
		}
		
	}
}
```


### License

Copyright © 2015-2016 Robus, LLC. This source code is licensed under the MIT license found in
the [LICENSE.txt]
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.


---
Made with ♥ by Robus Gauli ([@robusgauli]
