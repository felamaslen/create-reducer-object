type Action = {
  [extraProps: string]: any;
};

type Reducer<S> = (state: S, action: Action) => S;

interface ReducerMap<S> {
  [actionType: string]: Reducer<S>;
}

export declare function createReducerObject<S = object>(
  reducerMap: ReducerMap<S>,
  initialState: S,
): Reducer<S>;
