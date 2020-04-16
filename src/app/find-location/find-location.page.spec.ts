import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindLocationPage } from './find-location.page';

describe('FindLocationPage', () => {
  let component: FindLocationPage;
  let fixture: ComponentFixture<FindLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
