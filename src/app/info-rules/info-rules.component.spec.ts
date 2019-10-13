import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRulesComponent } from './info-rules.component';

describe('InfoRulesComponent', () => {
  let component: InfoRulesComponent;
  let fixture: ComponentFixture<InfoRulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
