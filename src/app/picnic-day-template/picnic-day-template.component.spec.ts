import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicnicDayTemplateComponent } from './picnic-day-template.component';

describe('PicnicDayTemplateComponent', () => {
  let component: PicnicDayTemplateComponent;
  let fixture: ComponentFixture<PicnicDayTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicnicDayTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicnicDayTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
