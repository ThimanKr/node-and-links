import {createAction, createReducer} from 'redux-act';

/**
 * Actions
 */
export const showLoader = createAction('LOADER/SHOW');
export const hideLoader = createAction('LOADER/HIDE');

/* Initial State */
const initialState = {
    loading: false,
    msg:""
};

/* Reducer */
export const loaderReducer = createReducer(
    {
        [showLoader]: (state,payload) => {
            return {...state,
                loading:true,
                msg:payload
            };
        },
        [hideLoader]: (state) => {
            return {...state, loading:false};
        },
    },
  initialState,
);
