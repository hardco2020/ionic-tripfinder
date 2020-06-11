import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OutcomeFoodPage } from './outcome-food.page';

describe('OutcomeFoodPage', () => {
  let component: OutcomeFoodPage;
  let fixture: ComponentFixture<OutcomeFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutcomeFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OutcomeFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
