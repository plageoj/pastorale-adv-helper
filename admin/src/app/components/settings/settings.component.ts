import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ExportComponent } from './export/export.component';
import { InitializeComponent } from './initialize/initialize.component';
import { ModeChangeComponent } from './mode-change/mode-change.component';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: true,
    imports: [
      MatTabsModule,
      InitializeComponent,
      ModeChangeComponent,
      ExportComponent,
    ]
})
export class SettingsComponent {}
