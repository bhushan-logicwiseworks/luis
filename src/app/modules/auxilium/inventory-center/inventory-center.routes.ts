import { Route } from '@angular/router';
import { LoadInventoryBranchListGuard } from './actions/guards/inventory-branch-list.guard';
import { LoadProductDetialsGuard } from './actions/guards/load-inventory-center-details.guard';
import { InventoryCenterLocationAddComponent } from './components/inventory-center-location-add/inventory-center-location-add.component';
import { InventoryCenterLocationListComponent } from './components/inventory-center-location-list/inventory-center-location-list.component';
import { InventoryCenterProductAddPriceComponent } from './components/inventory-center-product-add-price/inventory-center-product-add-price.component';
import { InventoryCenterProductDetailComponent } from './components/inventory-center-product-detail/inventory-center-product-detail.component';
import { InventoryCenterProductPriceListComponent } from './components/inventory-center-product-price-list/inventory-center-product-price-list.component';
import { InventoryCenterVendorAddComponent } from './components/inventory-center-vendor-add/inventory-center-vendor-add.component';
import { InventoryCenterVendorTableComponent } from './components/inventory-center-vendor-table/inventory-center-vendor-table.component';
import { InventoryCenterComponent } from './containers/inventory-center-component/inventory-center.component';
import { InventoryCenterDetailsComponent } from './containers/inventory-center-details/inventory-center-details.component';
import { InventoryCenterTableComponent } from './containers/inventory-center-table/inventory-center-table.component';
import providers from './inventory-center.providers';

export default [
    {
        path: '',
        canActivate: [LoadProductDetialsGuard, LoadInventoryBranchListGuard],
        component: InventoryCenterComponent,
        providers: providers,
        children: [
            {
                path: '',
                redirectTo: 'active',
                pathMatch: 'full',
            },
            {
                path: ':filterSlug',
                component: InventoryCenterTableComponent,
            },
        ],
    },
    {
        path: ':id',
        canActivate: [LoadProductDetialsGuard, LoadInventoryBranchListGuard],
        component: InventoryCenterDetailsComponent,
        providers: providers,
        children: [
            { path: '', redirectTo: 'details', pathMatch: 'full' },
            { path: 'details', component: InventoryCenterProductDetailComponent },
            { path: 'pricing-list', component: InventoryCenterProductPriceListComponent },
            { path: 'product-price-list/add', component: InventoryCenterProductAddPriceComponent },
            { path: 'product-price-list/add/:id', component: InventoryCenterProductAddPriceComponent },
            { path: 'vendor-list', component: InventoryCenterVendorTableComponent },
            { path: 'vendor-list/add', component: InventoryCenterVendorAddComponent },
            { path: 'vendor-list/edit/:id', component: InventoryCenterVendorAddComponent },
            { path: 'location-list', component: InventoryCenterLocationListComponent },
            { path: 'location-list/add', component: InventoryCenterLocationAddComponent },
            { path: 'location-list/edit/:id', component: InventoryCenterLocationAddComponent },
        ],
    },
] as Route[];
