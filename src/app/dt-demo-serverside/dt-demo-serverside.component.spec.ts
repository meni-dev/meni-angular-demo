import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDemoServersideComponent } from './dt-demo-serverside.component';

describe('DtDemoServersideComponent', () => {
  let component: DtDemoServersideComponent;
  let fixture: ComponentFixture<DtDemoServersideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtDemoServersideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtDemoServersideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
