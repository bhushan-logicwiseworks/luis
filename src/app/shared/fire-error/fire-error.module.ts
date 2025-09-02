import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FireErrorComponent } from './fire-error.component';

@NgModule({
    imports: [CommonModule, MatInputModule, FireErrorComponent],
    exports: [FireErrorComponent],
})
export class FireErrorModule {}
