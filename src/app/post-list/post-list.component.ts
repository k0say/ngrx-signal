import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { PostsStore } from '../store/posts.store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-post-list',
  imports: [MatListModule, CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent {
  store = inject(PostsStore);

  deletePost(e: number)  {
    this.store.deletePost(e);
  }
}
