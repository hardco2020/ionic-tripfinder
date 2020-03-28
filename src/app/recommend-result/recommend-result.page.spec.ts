import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommendResultPage } from './recommend-result.page';

describe('RecommendResultPage', () => {
  let component: RecommendResultPage;
  let fixture: ComponentFixture<RecommendResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
