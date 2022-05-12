import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtTableMaterialComponent } from './dt-table-material.component';

describe('DtTableMaterialComponent', () => {
  let component: DtTableMaterialComponent;
  let fixture: ComponentFixture<DtTableMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtTableMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtTableMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
