import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TerminalDetailPage } from './terminal-detail.page';

describe('TerminalDetailPage', () => {
  let component: TerminalDetailPage;
  let fixture: ComponentFixture<TerminalDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
