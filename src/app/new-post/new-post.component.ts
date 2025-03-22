import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PostsStore } from '../store/posts.store';
import { MatButtonModule } from '@angular/material/button';

interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}


@Component({
  selector: 'app-new-post',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.scss',
})
export class NewPostComponent implements OnInit {
  private fb = inject(FormBuilder);

  formGroup!: FormGroup;

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      userId: [''],
      id: [''],
      title: [''],
      body: [''],
    });
  }
  store = inject(PostsStore);

  submitNewPost() {
    console.log(this.formGroup?.value);
    this.store.addPost(this.formGroup?.value);
  }
}
