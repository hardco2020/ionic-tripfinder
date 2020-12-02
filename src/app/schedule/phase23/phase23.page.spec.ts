import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Phase23Page } from './phase23.page';

describe('Phase23Page', () => {
  let component: Phase23Page;
  let fixture: ComponentFixture<Phase23Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase23Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Phase23Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
