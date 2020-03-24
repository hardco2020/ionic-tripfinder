import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutcomePage } from './outcome.page';

describe('OutcomePage', () => {
  let component: OutcomePage;
  let fixture: ComponentFixture<OutcomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutcomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutcomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
