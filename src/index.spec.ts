import sinon from 'sinon';

import { createReducerObject, Action, ReducerMap } from '.';

describe('createReducerObject', () => {
  const ACTION1 = 'ACTION1';
  const ACTION2 = 'ACTION2';
  const ACTION3 = 'ACTION3';

  type State = Partial<{
    counter: number;
    foo: string | null;
    title: string;
  }>;

  const reducer1 = (state: State): Partial<State> => ({
    counter: (state.counter ?? 0) + 1,
  });

  const reducer2 = (_: State, { foo }: Action): State => ({
    counter: 0,
    foo,
  });

  const reducerMap: ReducerMap<State> = {
    [ACTION1]: reducer1,
    [ACTION2]: reducer2,
  };

  const reducer = createReducerObject<State>(reducerMap, {});

  it('should handle an action with a specified reducer', () => {
    const initialState = {
      title: 'Working',
      counter: 3,
    };

    const action = { type: ACTION1 };

    const firstResult = reducer(initialState, action);

    expect(firstResult).toHaveProperty('counter', 4);
    expect(firstResult).toHaveProperty('title', 'Working');

    const secondResult = reducer(firstResult, action);

    expect(secondResult).toHaveProperty('counter', 5);
    expect(secondResult).toHaveProperty('title', 'Working');
  });

  it('should handle an action with a property', () => {
    const initialState = {
      title: 'Keep this',
      counter: 3,
      foo: null,
    };

    const action = { type: ACTION2, foo: 'bar' };

    const result = reducer(initialState, action);

    expect(result).toHaveProperty('counter', 0);
    expect(result).toHaveProperty('title', 'Keep this');
    expect(result).toHaveProperty('foo', 'bar');
  });

  it('should not throw an error if the action is not handled', () => {
    const initialState = {
      title: 'Keep this',
      counter: 3,
    };

    const action = { type: ACTION3 };

    expect(() => reducer(initialState, action)).not.toThrow();

    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should not throw an error if the action is malformed', () => {
    expect(() => reducer({}, null)).not.toThrow();
    expect(() => reducer({}, {})).not.toThrow();
    expect(() => reducer({})).not.toThrow();
  });

  it('should return a shallowly equal state if all of the properties are shallowly equal', () => {
    const initialState = {
      title: 'Keep this',
      foo: 'some foo',
      counter: 0,
    };

    const action = { type: ACTION2, foo: 'some foo' };

    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
    expect(reducer(result)).toBe(initialState);
  });

  it('should accept state types which are not objects', () => {
    const clock = sinon.useFakeTimers(new Date('2020-04-20T04:20:00Z'));

    type AltState = Date[];

    const initialState: AltState = [];

    const onPush = (state: AltState): AltState => [...state, new Date()];

    const initiatedReducer = createReducerObject<AltState>(
      {
        [ACTION1]: onPush,
      },
      initialState,
    );

    const action = { type: ACTION1 };

    const result = initiatedReducer(undefined, action);

    expect(result).toStrictEqual([new Date('2020-04-20T04:20:00Z')]);

    clock.restore();
  });
});
