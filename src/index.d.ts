export type Action = {
  [extraProps: string]: any;
};

export type Reducer<S> = (state?: S, action?: Action | null) => S;
export type PartialReducer<S> = (state: S, action: Action) => Partial<S>;

export interface ReducerMap<S> {
  [actionType: string]: PartialReducer<S>;
}

export declare function createReducerObject<S = object>(
  reducerMap: ReducerMap<S>,
  initialState: S,
): Reducer<S>;
