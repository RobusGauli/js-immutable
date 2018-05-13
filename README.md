<p align="center">
  <img src="https://github.com/RobusGauli/js-immutable/blob/master/assets/logo.jpg" />
</p>

<p><h1 align="center">JS Immutable</h1></p>
<a href="https://travis-ci.org/RobusGauli/react-state-reducer">
    <img src="https://travis-ci.org/RobusGauli/react-state-reducer.svg?branch=master" hspace="10px" align="right" vspace="2px">
</a>

## Motivation 🐬🐬
Consider the scenario where you have to set a new value to <b>"temporary"</b> field without mutating original state.
```javacript
const state = {
   name: 'Safal',
   age: 45,
   detail: {
   		personal: {
    		address: {
				permanent: 'Kathmandu',
        		temporary: 'Pokhara'
        	},
            fatherName: 'Kapil'
        }
    }
}              
```
Javascript way of setting a new value without modifying original state would be something like this: 

```javascript
// For my brain, this is too much to wrap around just to change a single field.
// There must be some better way. 
const newState = {
	...state
    detail: {
    	...state.detail
        personal: {
        	...state.detail.personal
            address: {
            	...state.detail.personal.address,
                temporary: 'New Random Location' // here is the actual change
            }
        }
    }
}  
```

### Problems with the above code:
:pushpin: <span >Need to <b>keep track</b> of whole state tree just to perform such small modification.</span>
 
 :pushpin: <span>Need to make sure that state tree is not <b>mutated</b> while returning new state.</span>
 
 :pushpin: Need to make sure <b>structure</b> of state tree is not changed while returning new state. Specially it becomes nightmare in real world application where you don't know which action modified the entire redux state.

:pushpin: If structure of original state tree is modified, then every action reducer must be re-written. i.e Your reducer has an <b>dependency</b> on structure of redux state.
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
