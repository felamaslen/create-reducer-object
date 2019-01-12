export function createReducerObject(reducerMap) {
    return (state, action) => {
        if (action && action.type && action.type in reducerMap) {
            return {
                ...state,
                ...reducerMap[action.type](state, action)
            };
        }

        return state;
    };
}

