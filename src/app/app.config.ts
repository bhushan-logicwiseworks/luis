import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, inject, isDevMode, provideAppInitializer } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { REGION } from '@angular/fire/compat/functions';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { FormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, provideNativeDateAdapter } from '@angular/material/core';
import {
    MAT_FORM_FIELD_DEFAULT_OPTIONS,
    MatFormFieldDefaultOptions,
    MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { auxAppConfig } from '@aux/config/auxilium.app.config';
import { provideFuse } from '@fuse';
import { FUSE_CONFIG } from '@fuse/services/config/config.constants';
import { TranslocoService, provideTransloco } from '@ngneat/transloco';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { mockApiServices } from 'app/mock-api';
import { PatientCenterDiagnosiscodesEffects } from 'app/modules/auxilium/patient-center/effects/patient-center-diagnosiscode.effects';
import { PatientCenterPhysiciansEffects } from 'app/modules/auxilium/patient-center/effects/patient-center-physicians.effects';
import { WorkCenterIndividualEffects } from 'app/modules/auxilium/work-order-center/effects/work-order-center-individualeffects';
import { WorkCenterTableEffects } from 'app/modules/auxilium/work-order-center/effects/work-order-center-table.effects';
import { environment } from 'environments/environment';
import { provideNgxMask } from 'ngx-mask';
import { firstValueFrom } from 'rxjs';
import { appRoutes } from './app.routes';
import { provideAuth as provideAuthConfig } from './core/auth/auth.provider';
import { provideIcons } from './core/icons/icons.provider';
import { TranslocoHttpLoader } from './core/transloco/transloco.http-loader';
import { LoadDashboardDetialsGuard } from './modules/admin/dashboards/combined/actions/guards/load-dashboard-details.guard';
import { LoadPatientDetialsGuard } from './modules/auxilium/patient-center/actions/guards/load-patient-details.guard';
import * as fromPatientCenter from './modules/auxilium/patient-center/reducers';
import { LoadPayorDetialsGuard } from './modules/auxilium/payor-center/actions/guards/load-payor-details.guard';
import { ReferralCenterTableEffects } from './modules/auxilium/referral-center/effects/referral-center-table.effects';
import * as fromReferralCenter from './modules/auxilium/referral-center/reducers';
import * as fromWorkOrderCenter from './modules/auxilium/work-order-center/reducers';
import { ROOT_REDUCERS, metaReducers } from './reducers';
import { AuthEffects } from './reducers/auth.effects';
import { RouterEffects } from './reducers/router.effects';
import './shared/components/auxilium/aux-ag-grid/aux-ag-grid-setup';
import { NextDosEffects } from './shared/components/auxilium/next-dos/effects/next-dos.effects';
import { nextDosReducer } from './shared/components/auxilium/next-dos/reducers/next-dos.reducer';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(
            // Angular Built-in Modules Start
            CommonModule,
            BrowserModule,
            // SharedModule,
            // Custom Modules Start
            // CoreModule,
            // AuthModule,
            // MaterialModule,
            FormsModule,
            // LoadingOverlayModule,
            // Custom Modules End

            // NGRX Root Modules Start
            StoreModule.forRoot(),
            EffectsModule.forRoot(),
            // NGRX Root Modules End

            // Firebase Providers Start
            MatFormFieldModule,
            MatInputModule
            // LayoutModule
        ),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFunctions(() => getFunctions()),
        provideDatabase(() => getDatabase()),

        provideAnimations(),
        provideHttpClient(),
        provideRouter(
            appRoutes,
            withPreloading(PreloadAllModules),
            withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })
            // withDebugTracing()
        ),
        provideStore(ROOT_REDUCERS, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: false,
                strictActionImmutability: false,
            },
        }),
        provideEffects([
            RouterEffects,
            AuthEffects,
            NextDosEffects,
            ReferralCenterTableEffects,
            WorkCenterTableEffects,
            WorkCenterIndividualEffects,
            PatientCenterDiagnosiscodesEffects,
            PatientCenterPhysiciansEffects,
        ]),
        // Material Date Adapter
        provideNativeDateAdapter(),
        // {
        //     provide: DateAdapter,
        //     useClass: LuxonDateAdapter,
        // },
        {
            provide: MAT_DATE_FORMATS,
            useValue: {
                parse: {
                    dateInput: 'D',
                },
                display: {
                    dateInput: 'DDD',
                    monthYearLabel: 'LLL yyyy',
                    dateA11yLabel: 'DD',
                    monthYearA11yLabel: 'LLLL yyyy',
                },
            },
        },
        provideNgxMask(),
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill',
            } as MatFormFieldDefaultOptions,
        },
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: AuthInterceptor,
        //     multi: true,
        // },
        {
            provide: REGION,
            useValue: 'us-central1',
        },
        LoadPatientDetialsGuard,
        LoadPayorDetialsGuard,
        LoadDashboardDetialsGuard,
        // Transloco Config
        provideTransloco({
            config: {
                availableLangs: [
                    {
                        id: 'en',
                        label: 'English',
                    },
                    {
                        id: 'tr',
                        label: 'Turkish',
                    },
                ],
                defaultLang: 'en',
                fallbackLang: 'en',
                reRenderOnLangChange: true,
                prodMode: true,
            },
            loader: TranslocoHttpLoader,
        }),
        provideAppInitializer(() => {
            const translocoService = inject(TranslocoService);
            const defaultLang = translocoService.getDefaultLang();
            translocoService.setActiveLang(defaultLang);

            return firstValueFrom(translocoService.load(defaultLang));
        }),

        // Fuse
        provideAuthConfig(),
        provideIcons(),
        provideFuse({
            mockApi: {
                delay: 0,
                service: mockApiServices,
            },
            fuse: {
                layout: 'classy',
                scheme: 'light',
                screens: {
                    sm: '600px',
                    md: '960px',
                    lg: '1280px',
                    xl: '1440px',
                },
                theme: 'theme-default',
                themes: [
                    {
                        id: 'theme-default',
                        name: 'Default',
                    },
                    {
                        id: 'theme-brand',
                        name: 'Brand',
                    },
                    {
                        id: 'theme-teal',
                        name: 'Teal',
                    },
                    {
                        id: 'theme-rose',
                        name: 'Rose',
                    },
                    {
                        id: 'theme-purple',
                        name: 'Purple',
                    },
                    {
                        id: 'theme-amber',
                        name: 'Amber',
                    },
                    {
                        id: 'theme-acentusRose',
                        name: 'Acentus Rose',
                    },
                    {
                        id: 'theme-acentusGreen',
                        name: 'Acentus Green',
                    },
                    {
                        id: 'theme-acentusPurple',
                        name: 'Acentus Purple ',
                    },
                ],
            },
        }),

        // { provide: 'Auth', useFactory: () => Auth },
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        {
            provide: FUSE_CONFIG,
            useValue: auxAppConfig,
        },
        // Store Devtools (added directly to the providers array)
        provideStoreDevtools({
            maxAge: 25,
            logOnly: !isDevMode(),
        }),

        provideState({ name: 'nextDos', reducer: nextDosReducer }),

        provideState({
            name: fromReferralCenter.featureKey,
            reducer: fromReferralCenter.reducers,
        }),
        provideState({
            name: fromWorkOrderCenter.featureKey,
            reducer: fromWorkOrderCenter.reducers,
        }),
        provideState({
            name: fromPatientCenter.featureKey,
            reducer: fromPatientCenter.reducers,
        }),
    ],
};
