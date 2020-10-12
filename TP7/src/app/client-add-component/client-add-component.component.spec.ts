import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddComponentComponent } from './client-add-component.component';

describe('ClientAddComponentComponent', () => {
  let component: ClientAddComponentComponent;
  let fixture: ComponentFixture<ClientAddComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAddComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAddComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
