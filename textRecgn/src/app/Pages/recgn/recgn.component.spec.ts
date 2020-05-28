import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecgnComponent } from './recgn.component';

describe('RecgnComponent', () => {
  let component: RecgnComponent;
  let fixture: ComponentFixture<RecgnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecgnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecgnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
