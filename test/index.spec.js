import { expect } from 'chai';
import { createReducerObject } from '../src';

describe('createReducerObject', () => {
    const ACTION1 = 'ACTION1';
    const ACTION2 = 'ACTION2';
    const ACTION3 = 'ACTION3';

    const reducer1 = state => ({
        ...state,
        counter: state.counter + 1
    });

    const reducer2 = (state, { foo }) => ({
        counter: 0,
        foo
    });

    const reducerMap = {
        [ACTION1]: reducer1,
        [ACTION2]: reducer2
    };

    const reducer = createReducerObject(reducerMap);

    it('should handle an action with a specified reducer', () => {
        const initialState = {
            title: 'Working',
            counter: 3
        };

        const action = { type: ACTION1 };

        const firstResult = reducer(initialState, action);

        expect(firstResult).to.have.property('counter', 4);
        expect(firstResult).to.have.property('title', 'Working');

        const secondResult = reducer(firstResult, action);

        expect(secondResult).to.have.property('counter', 5);
        expect(secondResult).to.have.property('title', 'Working');
    });

    it('should handle an action with a property', () => {
        const initialState = {
            title: 'Keep this',
            counter: 3,
            foo: null
        };

        const action = { type: ACTION2, foo: 'bar' };

        const result = reducer(initialState, action);

        expect(result).to.have.property('counter', 0);
        expect(result).to.have.property('title', 'Keep this');
        expect(result).to.have.property('foo', 'bar');
    });

    it('should not throw an error if the action is not handled', () => {
        const initialState = {
            title: 'Keep this',
            counter: 3
        };

        const action = { type: ACTION3 };

        expect(() => reducer(initialState, action)).not.to.throw();

        const result = reducer(initialState, action);

        expect(result).to.equal(initialState);
    });

    it('should not throw an error if the action is malformed', () => {
        expect(() => reducer({}, null)).not.to.throw();
        expect(() => reducer({}, {})).not.to.throw();
        expect(() => reducer({})).not.to.throw();
    });

    it('should accept initial state', () => {
        const initialState = [];

        const onPush = state => ([...state, 1]);

        const initiatedReducer = createReducerObject({
            [ACTION1]: onPush
        }, initialState);

        const action = { type: ACTION1 };

        // eslint-disable-next-line no-undefined
        const result = initiatedReducer(undefined, action);

        expect(result).to.deep.equal([1]);
    });
});

