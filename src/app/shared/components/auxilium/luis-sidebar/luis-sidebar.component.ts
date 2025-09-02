import { Component, ViewEncapsulation } from '@angular/core';
import { FuseNavigationItem } from '@fuse/components/navigation/navigation.types';
import { FuseVerticalNavigationComponent } from '../../../../../@fuse/components/navigation/vertical/vertical.component';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
    selector: 'luis-sidebar',
    templateUrl: './luis-sidebar.component.html',
    styles: [
        `
            demo-sidebar fuse-vertical-navigation .fuse-vertical-navigation-wrapper {
                box-shadow: none !important;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
    imports: [
        FuseVerticalNavigationComponent,
        MatIcon,
        MatProgressBar,
    ],
})
export class LuisSidebarComponent {
    menuData: FuseNavigationItem[];

    /**
     * Constructor
     */
    constructor() {
        this.menuData = [
            {
                title: 'Actions',
                subtitle: 'Task, project & team',
                type: 'group',
                children: [
                    {
                        title: 'Create task',
                        type: 'basic',
                        icon: 'heroicons_outline:plus-circle',
                    },
                    {
                        title: 'Create team',
                        type: 'basic',
                        icon: 'heroicons_outline:user-group',
                    },
                    {
                        title: 'Create project',
                        type: 'basic',
                        icon: 'heroicons_outline:briefcase',
                    },
                    {
                        title: 'Create user',
                        type: 'basic',
                        icon: 'heroicons_outline:user-add',
                    },
                    {
                        title: 'Assign user or team',
                        subtitle: 'Assign to a task or a project',
                        type: 'basic',
                        icon: 'heroicons_outline:badge-check',
                    },
                ],
            },
            {
                title: 'Tasks',
                type: 'group',
                children: [
                    {
                        title: 'All tasks',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-list',
                        badge: {
                            title: '49',
                            classes: 'px-2 bg-primary text-on-primary rounded-full',
                        },
                    },
                    {
                        title: 'Ongoing tasks',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-copy',
                    },
                    {
                        title: 'Completed tasks',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard-check',
                    },
                    {
                        title: 'Abandoned tasks',
                        type: 'basic',
                        icon: 'heroicons_outline:clipboard',
                    },
                    {
                        title: 'Assigned to me',
                        type: 'basic',
                        icon: 'heroicons_outline:user',
                    },
                    {
                        title: 'Assigned to my team',
                        type: 'basic',
                        icon: 'heroicons_outline:users',
                    },
                ],
            },
            {
                title: 'Settings',
                type: 'group',
                children: [
                    {
                        title: 'General',
                        type: 'collapsable',
                        icon: 'heroicons_outline:cog',
                        children: [
                            {
                                title: 'Tasks',
                                type: 'basic',
                            },
                            {
                                title: 'Users',
                                type: 'basic',
                            },
                            {
                                title: 'Teams',
                                type: 'basic',
                            },
                        ],
                    },
                    {
                        title: 'Account',
                        type: 'collapsable',
                        icon: 'heroicons_outline:user-circle',
                        children: [
                            {
                                title: 'Personal',
                                type: 'basic',
                            },
                            {
                                title: 'Payment',
                                type: 'basic',
                            },
                            {
                                title: 'Security',
                                type: 'basic',
                            },
                        ],
                    },
                ],
            },
        ];
    }
}
