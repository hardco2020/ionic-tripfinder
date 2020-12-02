import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Phase22Page } from './phase22.page';

describe('Phase22Page', () => {
  let component: Phase22Page;
  let fixture: ComponentFixture<Phase22Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Phase22Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(Phase22Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
