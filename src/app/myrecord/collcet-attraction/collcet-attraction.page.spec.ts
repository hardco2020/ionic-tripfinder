import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CollcetAttractionPage } from './collcet-attraction.page';

describe('CollcetAttractionPage', () => {
  let component: CollcetAttractionPage;
  let fixture: ComponentFixture<CollcetAttractionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollcetAttractionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CollcetAttractionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
