import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindBusPage } from './find-bus.page';

describe('FindBusPage', () => {
  let component: FindBusPage;
  let fixture: ComponentFixture<FindBusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindBusPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindBusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
