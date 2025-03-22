import { Component, inject } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { PostsStore } from '../store/posts.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  imports: [MatListModule, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent {

  store = inject(PostsStore);

}
