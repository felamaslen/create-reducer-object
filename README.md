# create-reducer-object

This is a very simple helper library. Traditionally, according to the Redux documentation, reducers are written like this:

```javascript
function myFirstReducer(state, action) {
  switch (action.type) {
    case 'TODO_ADDED':
      return todoAdded(state, action);
  }

  return state;
}
```

This results in long, unwieldy switch statements when you have many different actions.

You can write the equivalent of the above, using this library, as follows:

```javascript
import { createReducerObject } from 'create-reducer-object';

const initialState = {
  todos: [],
};

const myFirstReducer = createReducerObject({
  TODO_ADDED: todoAdded
}, initialState);
```

## Typescript compatibility

The module is written in and fully compatible with Typescript. You can define your state like so:

```typescript
import { createReducerObject } from 'create-reducer-object';

type State = {
  todos: Todo[];
};

const initialState: State = {
  todos: [],
};

const myFirstReducer = createReducerObject<State>({
  TODO_ADDED: todoAdded,
}, initialState);
```
