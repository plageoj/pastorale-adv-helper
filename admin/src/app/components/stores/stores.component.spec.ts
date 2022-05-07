import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCheckboxHarness } from '@angular/material/checkbox/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSlideToggleHarness } from '@angular/material/slide-toggle/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { of } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { RouterLinkStubDirective } from 'src/app/testing/router-link-stub';
import { waitUntil } from 'src/app/testing/utils/wait-until';
import { StoresComponent } from './stores.component';

describe('StoresComponent', () => {
  let component: StoresComponent;
  let fixture: ComponentFixture<StoresComponent>;
  let loader: HarnessLoader;

  const member = {
    uid: 'assigned-uid',
    name: 'Assigned member',
    comment: '',
    currentAddress: '',
    homeAddress: '',
    isAdmin: false,
    isHomeInHiroshima: false,
    job: '',
    stores: [],
    studentNumber: 0,
    commute: {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoresComponent, RouterLinkStubDirective],
      imports: [
        FirebaseTestingModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatTableModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(StoresComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    const storeService = TestBed.inject(StoreService);
    await storeService.update({
      id: 'store-id',
      name: 'Store',
      address: 'Address',
      tel: 'Tel',
      altTel: 'AltTel',
      visible: true,
      status: '担当者なし',
      amount: 0,
      comment: '',
      draft: '',
      notes: '',
      needAttention: false,
      assigned: member,
    });
    await storeService.update({
      id: 'invisible-store-id',
      name: 'Invisible Store',
      address: 'Invisible Address',
      tel: 'Invisible Tel',
      altTel: 'Invisible AltTel',
      visible: false,
      status: '担当者なし',
      amount: 0,
      comment: '',
      draft: '',
      notes: '',
      needAttention: false,
      assigned: member,
    });
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
    await waitUntil(() => component.stores.data.length !== 0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a table', () => {
    const table = fixture.nativeElement.querySelector(
      'table'
    ) as HTMLTableElement;
    expect(table.tagName).toBe('TABLE');
  });

  it('should filter data', () => {
    const filter = fixture.nativeElement.querySelector('input');
    filter.value = 'Store';
    filter.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.stores.filter).toBe('Store');
  });

  it('updates attention', async () => {
    const checkboxes = await loader.getAllHarnesses(MatCheckboxHarness);
    await checkboxes[0].check();
    fixture.detectChanges();
    expect(component.stores.data[0].needAttention).toBeTrue();

    const links = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );
    const routerLinks = links.map((link) =>
      link.injector.get(RouterLinkStubDirective)
    );

    expect(routerLinks.every((link) => !link.navigatedTo)).toBeTrue();
  });

  it('shows invisible stores', async () => {
    const toggles = await loader.getAllHarnesses(MatSlideToggleHarness);
    expect(toggles.length).toBe(1);
    expect(component.stores.data.length).toBe(1);
    await toggles[0].check();
    await waitUntil(() => component.stores.data.length === 2);
    fixture.detectChanges();
    expect(component.stores.data.length).toBe(2);
  });

  it('should open edit dialog and update stores', () => {
    const dialog = (
      spyOn(TestBed.inject(MatDialog), 'open') as jasmine.Spy
    ).and.returnValue({
      afterClosed: () => of(undefined),
    });
    const snack = (
      spyOn(TestBed.inject(MatSnackBar), 'open') as jasmine.Spy
    ).and.callThrough();
    const editButton = fixture.debugElement.query(
      By.css('table button[title="編集"]')
    );
    editButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(dialog).toHaveBeenCalled();

    dialog.and.returnValue({
      afterClosed: () => of({ name: 'updated' }),
    });
    editButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(snack).toHaveBeenCalledWith('保存できませんでした！');
  });

  it('should add store', () => {
    const update = spyOn(
      TestBed.inject(StoreService),
      'update'
    ).and.returnValue(Promise.resolve());
    const dialog = (
      spyOn(TestBed.inject(MatDialog), 'open') as jasmine.Spy
    ).and.callFake((data) => ({
      afterClosed: () => cold('--d|', { d: data }),
    }));

    const addButton = fixture.nativeElement.querySelector(
      'button[title="広告先を追加"]'
    );
    addButton.click();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(dialog).toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
  });
});
