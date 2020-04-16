type Action = {
  [extraProps: string]: any;
};

type Reducer<S> = (state?: S, action?: Action | null) => S;
type PartialReducer<S> = (state: S, action: Action) => Partial<S>;

interface ReducerMap<S> {
  [actionType: string]: PartialReducer<S>;
}

export declare function createReducerObject<S = object>(
  reducerMap: ReducerMap<S>,
  initialState: S,
): Reducer<S>;
