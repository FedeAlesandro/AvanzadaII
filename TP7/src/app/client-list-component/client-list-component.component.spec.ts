import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListComponentComponent } from './client-list-component.component';

describe('ClientListComponentComponent', () => {
  let component: ClientListComponentComponent;
  let fixture: ComponentFixture<ClientListComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientListComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
