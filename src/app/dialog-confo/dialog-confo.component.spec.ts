import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfoComponent } from './dialog-confo.component';

describe('DialogConfoComponent', () => {
  let component: DialogConfoComponent;
  let fixture: ComponentFixture<DialogConfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogConfoComponent]
    });
    fixture = TestBed.createComponent(DialogConfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
