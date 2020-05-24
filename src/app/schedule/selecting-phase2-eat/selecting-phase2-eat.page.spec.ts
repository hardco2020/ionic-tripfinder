import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectingPhase2EatPage } from './selecting-phase2-eat.page';

describe('SelectingPhase2EatPage', () => {
  let component: SelectingPhase2EatPage;
  let fixture: ComponentFixture<SelectingPhase2EatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectingPhase2EatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectingPhase2EatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
