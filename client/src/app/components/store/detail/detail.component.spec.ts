import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { getAuth, signInAnonymously, deleteUser } from '@angular/fire/auth';
import { GoogleMapsModule, MapGeocoder } from '@angular/google-maps';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { cold, getTestScheduler } from 'jasmine-marbles';
import { Store } from 'src/app/models/store.model';
import { StatusIconPipe } from 'src/app/pipes/status-icon.pipe';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRouteStub } from 'src/app/testing/activated-route-stub';
import { FirebaseTestingModule } from 'src/app/testing/firebase-testing.module';
import { ReportComponent } from '../report/report.component';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let activatedRoute: ActivatedRouteStub;

  beforeEach(async () => {
    activatedRoute = new ActivatedRouteStub();
    const storeService = jasmine.createSpyObj('StoreService', [
      'get',
      'setStatus',
    ]);
    storeService.get.and.returnValue(
      cold('-s|', {
        s: {
          id: 'store-id',
          address: 'store-address',
          tel: 'store-tel',
          name: 'store-name',
          altTel: 'store-altTel',
          status: '担当者なし',
          amount: 0,
          comment: 'store-comment',
          draft: 'store-draft',
          needAttention: false,
          notes: 'store-notes',
          visible: true,
        } as Store,
      })
    );
    storeService.setStatus.and.callThrough();

    const mapGeocoder = jasmine.createSpyObj('MapGeocoder', ['geocode']);
    mapGeocoder.geocode.and.returnValue(
      cold('-g|', {
        g: {
          results: [
            {
              geometry: {
                location: {
                  lat: 35.681298,
                  lng: 139.766084,
                },
              },
              place_id: 2345,
            },
          ],
        },
      })
    );

    activatedRoute.setParamMap({ id: 'store-id' });

    await TestBed.configureTestingModule({
      declarations: [DetailComponent, StatusIconPipe],
      imports: [
        FirebaseTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'stores/:id/report', component: ReportComponent },
        ]),
        HttpClientTestingModule,
        HttpClientJsonpModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        GoogleMapsModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        {
          provide: StoreService,
          useValue: storeService,
        },
        {
          provide: MapGeocoder,
          useValue: mapGeocoder,
        },
      ],
    }).compileComponents();

    await signInAnonymously(getAuth());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getTestScheduler().flush();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can call the store', fakeAsync(() => {
    const call = spyOn(window, 'open').and.returnValue(window);
    component.call();
    expect(call).not.toHaveBeenCalled();
    fixture.detectChanges();

    component.call('store-tel');
    expect(call).toHaveBeenCalledWith(`tel:store-tel`);
  }));

  afterEach(async () => {
    const user = getAuth().currentUser;
    if (user) await deleteUser(user);
  });
});
