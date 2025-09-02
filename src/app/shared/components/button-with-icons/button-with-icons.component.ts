import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'ac-actions-rederer',
    template: `
        @if (params.field === 'fileCount') {
            <button class="relative" mat-icon-button matTooltip="Attachments" matTooltipPosition="below" type="button">
                <mat-icon [class.text-yellow-500]="params.data.fileCount > 0" svgIcon="folder"></mat-icon>
                @if (params.data.fileCount > 0) {
                    <div
                        class="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold leading-none text-white"
                    >
                        {{ params.data.fileCount }}
                    </div>
                }
            </button>
        }
        @if (params.field === 'completed') {
            <button class="relative" mat-icon-button matTooltip="Completed" matTooltipPosition="below" type="button">
                <mat-icon
                    [class.text-green-500]="params.data.isCompleted"
                    svgIcon="mat_outline:playlist_add_check"
                ></mat-icon>
            </button>
        }
        @if (params.field === 'deleted') {
            <button class="relative" mat-icon-button matTooltip="Deleted" matTooltipPosition="below" type="button">
                <mat-icon [class.text-red-500]="params.data.isDeleted" svgIcon="mat_outline:delete_sweep"></mat-icon>
            </button>
        }
        @if (params.field === 'status') {
            @if (params.data.status == 'ELIGIBLE') {
                <button
                    class="relative"
                    mat-icon-button
                    matTooltip="Insurance Verified"
                    matTooltipPosition="before"
                    type="button"
                >
                    <div class="flex items-center justify-center">
                        <mat-icon class="text-green-500" svgIcon="check_circle"> </mat-icon>
                    </div>
                </button>
            }
            @if (params.data.status == 'NOT ELIGIBLE') {
                <button
                    class="relative"
                    mat-icon-button
                    matTooltip="Needs Research"
                    matTooltipPosition="before"
                    type="button"
                >
                    <div class="items-center justify-center">
                        <mat-icon class="text-red-500" svgIcon="highlight_off"> </mat-icon>
                    </div>
                </button>
            }
        }
        @if (params.field === 'isEligible') {
            @if (params.data.isEligible == true) {
                <button
                    class="relative"
                    mat-icon-button
                    matTooltip="Eligible"
                    matTooltipPosition="before"
                    type="button"
                >
                    <div class="flex items-center justify-center">
                        <mat-icon class="text-green-500" svgIcon="check_circle"> </mat-icon>
                    </div>
                </button>
            }
            @if (params.data.isEligible == false) {
                <button
                    class="relative"
                    mat-icon-button
                    matTooltip="Not Eligible"
                    matTooltipPosition="before"
                    type="button"
                >
                    <div class="items-center justify-center">
                        <mat-icon class="text-red-500" svgIcon="highlight_off"> </mat-icon>
                    </div>
                </button>
            }
        }
        @if (params.field === 'isactive') {
            <button class="relative" mat-icon-button matTooltipPosition="below" type="button">
                @if (params.data.isactive) {
                    <mat-icon class="text-green-500" svgIcon="mat_outline:check"></mat-icon>
                }
                @if (!params.data.isactive) {
                    <mat-icon class="text-red-500" svgIcon="mat_outline:clear"></mat-icon>
                }
            </button>
        }
        @if (params.field === 'emailVerified') {
            @if (params.data.emailVerified == true) {
                <button
                    class="relative"
                    mat-icon-button
                    matTooltip="Email Verified"
                    matTooltipPosition="before"
                    type="button"
                >
                    <mat-icon class="text-green-400" svgIcon="check_circle" size="24px"></mat-icon>
                </button>
            }
            @if (params.data.emailVerified == false) {
                <button
                    class="relative"
                    mat-icon-button
                    matTooltip="Not Verified"
                    matTooltipPosition="before"
                    type="button"
                >
                    <mat-icon class="text-red-400" svgIcon="remove_circle" size="24px"></mat-icon>
                </button>
            }
        }
        @if (params.field === 'active') {
            <button class="relative" mat-icon-button matTooltipPosition="below" type="button">
                @if (params.data.isActive) {
                    <mat-icon class="text-green-500" svgIcon="lock_open"></mat-icon>
                }
                @if (!params.data.isActive) {
                    <mat-icon class="text-red-500" svgIcon="lock"></mat-icon>
                }
            </button>
        }
        @if (params.field === 'isDeleted') {
            <button class="relative" mat-icon-button matTooltipPosition="below" type="button">
                <mat-icon [ngClass]="{ 'text-red-500': params.data.isDeleted }" svgIcon="mat_outline:delete"></mat-icon>
            </button>
        }
        @if (params.field === 'isEmailConfirmed') {
            <button class="relative" mat-icon-button matTooltipPosition="below" type="button">
                @if (params.data.isEmailConfirmed) {
                    <mat-icon class="text-green-500" svgIcon="mat_outline:check"></mat-icon>
                }
                @if (!params.data.isEmailConfirmed) {
                    <mat-icon class="text-red-500" svgIcon="mat_outline:clear"></mat-icon>
                }
            </button>
        }
        @if (params.field === 'isElectronicConsent') {
            <button class="relative" mat-icon-button matTooltipPosition="below" type="button">
                @if (params.data.isElectronicConsent) {
                    <mat-icon class="text-green-500" svgIcon="mat_outline:check"></mat-icon>
                }
                @if (!params.data.isElectronicConsent) {
                    <mat-icon class="text-red-500" svgIcon="mat_outline:clear"></mat-icon>
                }
            </button>
        }
        @if (params.field === 'iscomplete') {
            <button class="relative" mat-icon-button matTooltipPosition="below" type="button">
                @if (params.data.iscomplete) {
                    <mat-icon class="text-green-500" svgIcon="mat_outline:check"></mat-icon>
                }
                @if (!params.data.iscomplete) {
                    <mat-icon class="text-red-500" svgIcon="mat_outline:clear"></mat-icon>
                }
            </button>
        }
        @if (params.field === 'fileattached') {
            <button class="relative" mat-icon-button matTooltipPosition="below" type="button">
                @if (params.data.fileattached) {
                    <mat-icon class="text-green-500" svgIcon="mat_outline:check"></mat-icon>
                }
                @if (!params.data.fileattached) {
                    <mat-icon class="text-red-500" svgIcon="mat_outline:clear"></mat-icon>
                }
            </button>
        }
        @if (params.field === 'isLicenseRequired') {
            <button class="relative" mat-icon-button matTooltipPosition="below" type="button">
                @if (params.data.isLicenseRequired) {
                    <mat-icon class="text-green-500" svgIcon="mat_outline:check"></mat-icon>
                }
                @if (!params.data.isLicenseRequired) {
                    <mat-icon class="text-red-500" svgIcon="mat_outline:clear"></mat-icon>
                }
            </button>
        }
        @if (params.field === 'patientid') {
            <div class="actions-cell">
                {{ params.data.patientid }}
                @if (params.data.patientid) {
                    <mat-icon svgIcon="heroicons_mini:arrow-small-up" class="text-gray-300"></mat-icon>
                }
            </div>
        }
        @if (params.field === 'patientId') {
            <div class="actions-cell">
                {{ params.data.patientId }}
                @if (params.data.patientId) {
                    <mat-icon svgIcon="heroicons_mini:arrow-small-up" class="text-gray-300"></mat-icon>
                }
            </div>
        }
        @if (params.field === 'PatientWithId') {
            <div class="actions-cell">
                {{ params.data[params.patientIdField] }}
                @if (params.data[params.patientIdField]) {
                    <mat-icon svgIcon="heroicons_mini:arrow-small-up" class="text-gray-300"></mat-icon>
                }
            </div>
        }
        @if (params.field === 'trackingnumber') {
            <div class="actions-cell">
                {{ params.data.trackingnumber }}
                @if (params.data.trackingnumber) {
                    <mat-icon svgIcon="heroicons_mini:arrow-small-up" class="text-gray-300"></mat-icon>
                }
            </div>
        }
        @if (params.field === 'contactNotes') {
            <button
                class="relative"
                mat-icon-button
                matTooltip="Contact Notes"
                matTooltipPosition="below"
                type="button"
                (click)="params.onCellClicked(params)"
            >
                <mat-icon svgIcon="heroicons_outline:annotation"></mat-icon>
            </button>
        }
        @if (params.field === 'viewEOB') {
            <button
                class="relative"
                mat-icon-button
                matTooltip="View EOB"
                matTooltipPosition="below"
                type="button"
                (click)="params.onCellClicked(params)"
            >
                <mat-icon svgIcon="heroicons_outline:document-text"></mat-icon>
            </button>
        }
    `,
    styles: [
        `
            .actions-cell {
                display: flex;
                align-items: center;
                justify-content: flex-start;
            }
        `,
    ],
    imports: [MatIconButton, MatTooltip, MatIcon, NgClass],
})
export class ButtonWithIconsComponents implements OnInit {
    params: any;

    agInit(params: any): void {
        this.params = params;
    }

    constructor() {}

    ngOnInit(): void {}
}
