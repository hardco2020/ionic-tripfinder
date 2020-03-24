import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectingPhase1Page } from './selecting-phase1.page';

describe('SelectingPhase1Page', () => {
  let component: SelectingPhase1Page;
  let fixture: ComponentFixture<SelectingPhase1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectingPhase1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectingPhase1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
