import { animate, style, transition, trigger } from '@angular/animations';

export function growWidthInAnimation(duration: number) {
    return trigger('growIn', [
        transition(':enter', [
            style({
                width: 0,
                overflow: 'hidden',
            }),
            animate(
                `${duration}ms cubic-bezier(0.35, 0, 0.25, 1)`,
                style({
                    width: '*',
                })
            ),
        ]),
    ]);
}

export const growIn400ms = growWidthInAnimation(400);
