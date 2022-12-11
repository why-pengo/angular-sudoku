import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CellDetailComponent } from './cell-detail.component';
import { CellComponent } from '../cell/cell.component';

describe('CellDetailComponent', () => {
  let component: CellDetailComponent;
  let fixture: ComponentFixture<CellDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CellDetailComponent, CellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CellDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
