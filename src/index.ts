export type Action = {
  [extraProps: string]: any;
};

export type Reducer<S> = (state?: S, action?: Action | null) => S;
export type PartialReducer<S> = (state: S, action: Action) => Partial<S>;

export interface ReducerMap<S> {
  [actionType: string]: PartialReducer<S>;
}

export function createReducerObject<S = {}>(
  reducerMap: ReducerMap<S>,
  initialState: S,
): Reducer<S> {
  const stateIsObject = typeof initialState === 'object' && !Array.isArray(initialState);

  return (state: S = initialState, action: Action | null = null): S => {
    if (action && action.type && action.type in reducerMap) {
      if (!stateIsObject) {
        return reducerMap[action.type](state, action) as S;
      }

      const result = {
        ...state,
        ...reducerMap[action.type](state, action),
      };

      if ((Object.keys(result) as (keyof S)[]).every((key) => result[key] === state[key])) {
        return state;
      }

      return result;
    }

    return state;
  };
}
