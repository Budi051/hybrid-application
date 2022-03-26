import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddmovieComponent } from './addmovie.component';

describe('AddmovieComponent', () => {
  let component: AddmovieComponent;
  let fixture: ComponentFixture<AddmovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmovieComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
