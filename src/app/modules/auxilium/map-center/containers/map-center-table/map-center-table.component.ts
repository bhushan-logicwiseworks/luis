import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ActivatedRoute } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AsyncPipe } from '@angular/common';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ColDef } from 'ag-grid-community';
import {} from 'googlemaps';
import { AuxAgGridComponent } from '../../../../../shared/components/auxilium/aux-ag-grid/aux-ag-grid.component';
import { LoadingOverlayComponent } from '../../../../../shared/components/loading-overlay/loading-overlay.component';
import { MapCenterTableActions } from '../../actions/map-center-table.actions';
import { MapListTableSelectors } from '../../reducers';
import { SearchService } from '../../services/search.service';
declare const google: any;

interface TableColumn {
    label: string;
    field: string;
    position: number;
}

@UntilDestroy()
@Component({
    selector: 'aux-map-center-table',
    templateUrl: './map-center-table.component.html',
    styleUrls: ['./map-center-table.component.scss'],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
            },
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatTabGroup, MatTab, AuxAgGridComponent, LoadingOverlayComponent, AsyncPipe],
})
export class MapListTableComponent implements OnInit, AfterViewInit {
    map: google.maps.Map;
    markers: google.maps.Marker[] = [];
    title = 'PatientScatterMap';
    @ViewChild('map') mapElement: any;
    lat = 31.51073;
    lng = -96.4247;
    filter: string;

    columnDefs: ColDef[] = [
        { headerName: 'ID', field: 'id', filter: 'agMultiColumnFilter', minWidth: 235 },
        { headerName: 'FIRST NAME', field: 'firstName', filter: 'agMultiColumnFilter', minWidth: 235 },
        { headerName: 'LAST NAME', field: 'lastName', filter: 'agMultiColumnFilter', minWidth: 235 },
        { headerName: 'CITY', field: 'city', filter: 'agMultiColumnFilter', minWidth: 235 },
        { headerName: 'STATE', field: 'state', filter: 'agMultiColumnFilter', minWidth: 235 },
        { headerName: 'ZIP', field: 'zip', filter: 'agMultiColumnFilter', minWidth: 235 },
    ];

    rowData = [];

    data$ = this.route.paramMap.pipe(
        switchMap(paramMap => {
            return this.store.select(MapListTableSelectors.selectMapList);
        })
    );

    paginatorOptions = {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20, 50],
    };

    loading$ = this.store.select(MapListTableSelectors.selectLoading);
    refresh = new Subject();
    refresh$ = this.refresh.asObservable();

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private actions$: Actions,
        private searchService: SearchService
    ) {}

    visibleColumns = ['id', 'firstName', 'lastName', 'city', 'state', 'zip'];

    ngOnInit() {
        combineLatest([this.route.paramMap])
            .pipe(untilDestroyed(this))
            .subscribe(([paramMap]) => {
                const filterSlug = paramMap.get('filterSlug');
                this.filter = filterSlug;
                this.store.dispatch(MapCenterTableActions.LoadAMapList({ filter: filterSlug }));
            });

        this.data$.pipe(untilDestroyed(this)).subscribe(maplist => {
            this.rowData = maplist;
            // Clear markers on map
            this.deleteMarkers();

            // Populate map with new data
            for (let location of maplist) {
                const pt = { lat: location.latitude, lng: location.longitude };
                this.addMarker(pt);
            }
        });

        this.actions$
            .pipe(ofType(MapCenterTableActions.LoadAMapList), untilDestroyed(this))
            .subscribe(result => this.refresh.next(result));
    }

    deleteRow(params) {}

    ngAfterViewInit() {
        /* Map */
        const mapProperties = {
            center: new google.maps.LatLng(this.lat, this.lng),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
    }

    // Adds a marker to the map and push to the array.
    addMarker(position: google.maps.LatLng | google.maps.LatLngLiteral) {
        const marker = new google.maps.Marker({
            position,
            map: this.map,
        });
        this.markers.push(marker);
    }

    // Sets the map on all markers in the array.
    setMapOnAll(map: google.maps.Map | null) {
        for (let i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    hideMarkers(): void {
        this.setMapOnAll(null);
    }

    // Shows any markers currently in the array.
    showMarkers(): void {
        this.setMapOnAll(this.map);
    }

    // Deletes all markers in the array by removing references to them.
    deleteMarkers(): void {
        this.hideMarkers();
        this.markers = [];
    }
}
