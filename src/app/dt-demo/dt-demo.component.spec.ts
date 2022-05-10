import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDemoComponent } from './dt-demo.component';

describe('DtDemoComponent', () => {
  let component: DtDemoComponent;
  let fixture: ComponentFixture<DtDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
