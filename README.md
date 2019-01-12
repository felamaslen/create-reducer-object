# create-reducer-object

This is a very simple helper library. Traditionally, according to the Redux documentation, reducers are written like this:

```
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

```
import { createReducerObject } from 'create-reducer-object';

const myFirstReducer = createReducerObject({
    TODO_ADDED: todoAdded
});
```
