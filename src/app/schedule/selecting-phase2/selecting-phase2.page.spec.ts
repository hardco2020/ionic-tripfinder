import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectingPhase2Page } from './selecting-phase2.page';

describe('SelectingPhase2Page', () => {
  let component: SelectingPhase2Page;
  let fixture: ComponentFixture<SelectingPhase2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectingPhase2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectingPhase2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
