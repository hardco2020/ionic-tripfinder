import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectingFood1Page } from './selecting-food1.page';

describe('SelectingFood1Page', () => {
  let component: SelectingFood1Page;
  let fixture: ComponentFixture<SelectingFood1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectingFood1Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectingFood1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
