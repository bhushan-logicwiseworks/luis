import { createReducer, on } from '@ngrx/store';
import { LoadingState } from 'app/shared/interfaces/auxilium/loading-center/loading-state.interface';
import { CompanyDisplay } from '../../../../shared/interfaces/auxilium/company-center/company.interface';
import { CompanyCenterTableActions } from '../actions/company-center-table.actions';

export const featureKey = 'company-center-table';

export interface State extends LoadingState {
    company: CompanyDisplay[];
    taxonomy: CompanyDisplay[];
    companyData: CompanyDisplay;
}

const initialState: State = {
    loading: false,
    error: null,
    company: [],
    taxonomy: [],
    companyData: null,
};

export const reducer = createReducer(
    initialState,

    on(CompanyCenterTableActions.ResetState, () => {
        return initialState;
    }),

    // Load company list
    on(CompanyCenterTableActions.LoadCompany, state => ({ ...initialState, loading: true })),
    on(CompanyCenterTableActions.LoadCompanySuccess, (state, { company }) => ({
        ...state,
        loading: false,
        company,
    })),
    on(CompanyCenterTableActions.LoadCompanyFailure, (state, { error }) => ({ ...state, loading: false, error })),

    // Load company by ID
    on(CompanyCenterTableActions.LoadCompanyById, state => ({ ...state, loading: true })),
    on(CompanyCenterTableActions.LoadCompanyByIdSuccess, (state, { companyData }) => ({
        ...state,
        loading: false,
        companyData,
    })),
    on(CompanyCenterTableActions.LoadCompanyByIdFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error,
    })),

    on(CompanyCenterTableActions.LoadTaxonomy, state => ({ ...state, loading: true })),
    on(CompanyCenterTableActions.LoadTaxonomySuccess, (state, { taxonomy }) => ({
        ...state,
        loading: false,
        taxonomy,
    })),
    on(CompanyCenterTableActions.LoadTaxonomyFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export const selectLoading = (state: State) => state.loading;
export const selectError = (state: State) => state.error;
export const selectCompany = (state: State) => state.company;
export const selectTaxonomy = (state: State) => state.taxonomy;
export const selectCompanyById = (state: State) => state.companyData;
