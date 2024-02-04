import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCompanionPageComponent } from './find-companion-page.component';

describe('FindCompanionPageComponent', () => {
  let component: FindCompanionPageComponent;
  let fixture: ComponentFixture<FindCompanionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FindCompanionPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindCompanionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
