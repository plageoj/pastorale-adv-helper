import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-unauthorized',
    templateUrl: './unauthorized.component.html',
    styleUrls: ['./unauthorized.component.scss'],
    standalone: true,
    imports: [MatIconModule]
})
export class UnauthorizedComponent {}
