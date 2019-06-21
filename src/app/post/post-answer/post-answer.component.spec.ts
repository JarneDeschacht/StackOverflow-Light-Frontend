import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAnswerComponent } from './post-answer.component';

describe('PostAnswerComponent', () => {
  let component: PostAnswerComponent;
  let fixture: ComponentFixture<PostAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
