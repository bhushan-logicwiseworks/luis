import { createReducer, on } from '@ngrx/store';
import { LoadingState } from '../../../../interfaces/auxilium/loading-center/loading-state.interface';
import { NextDosResponse } from '../../../../interfaces/auxilium/next-dos/next-dos.interface';
import { NextDosActions } from '../actions/next-dos.actions';

export interface NextDosState extends LoadingState, NextDosResponse {}

export const initialState: NextDosState = {
    loading: false,
    error: null,
    lastDos: null,
    nexttDos: null,
    supplyDays: null,
};

export const nextDosReducer = createReducer(
    initialState,

    // Start calculation
    on(NextDosActions.calculateNextDos, state => ({
        ...state,
        loading: true,
        error: null,
        nextDos: null, // Optional: clear old result
    })),

    // Success — payload is a single object of type `NextDosResponse`
    on(NextDosActions.calculateNextDosSuccess, (state, { response }) => ({
        ...state,
        loading: false,
        ...response,
    })),

    // Failure
    on(NextDosActions.calculateNextDosFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    }))
);
