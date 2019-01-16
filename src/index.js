export function createReducerObject(reducerMap, initialState = {}) {
    const stateIsObject = typeof initialState === 'object' && !Array.isArray(initialState);

    return (state = initialState, action) => {
        if (action && action.type && action.type in reducerMap) {
            if (!stateIsObject) {
                return reducerMap[action.type](state, action)
            }

            return {
                ...state,
                ...reducerMap[action.type](state, action)
            };
        }

        return state;
    };
}

