import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundPropertyComponent } from './found-property.component';

describe('FoundPropertyComponent', () => {
  let component: FoundPropertyComponent;
  let fixture: ComponentFixture<FoundPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
