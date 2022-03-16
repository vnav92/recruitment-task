import { useEffect, useReducer } from 'react';
import axios from 'axios';

import { ApiRoute } from '../models';

type State<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

enum ActionType {
  LOADING = 'loading',
  FETCHED = 'fetched',
  ERROR = 'error',
}

type Action<T> =
  | { type: ActionType.LOADING }
  | { type: ActionType.FETCHED; payload: T }
  | { type: ActionType.ERROR; payload: Error };

export const useFetch = <T = unknown>(endpoint: ApiRoute): State<T> => {
  const initialState: State<T> = {
    error: null,
    data: null,
    isLoading: false,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case ActionType.LOADING:
        return { ...initialState, isLoading: true };
      case ActionType.FETCHED:
        return { ...initialState, data: action.payload, isLoading: false };
      case ActionType.ERROR:
        return { ...initialState, error: action.payload, isLoading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ActionType.LOADING });

      axios(`${process.env.REACT_APP_API_BASE_URL}/${endpoint}`)
        .then(({ data }) => dispatch({ type: ActionType.FETCHED, payload: data }))
        .catch((e) => dispatch({ type: ActionType.ERROR, payload: e as Error }));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return state;
};
