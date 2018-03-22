import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDtComponent } from './tag-dt.component';

describe('TagDtComponent', () => {
  let component: TagDtComponent;
  let fixture: ComponentFixture<TagDtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagDtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
