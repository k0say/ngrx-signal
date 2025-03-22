import { Component, effect, inject, viewChild } from '@angular/core';
import { PostsStore } from './store/posts.store';
import { CommonModule } from '@angular/common';
import { PostListComponent } from './post-list/post-list.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { NewPostComponent } from "./new-post/new-post.component";

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    PostListComponent,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    NewPostComponent
],
  providers: [PostsStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(PostsStore);
  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    effect(() => {
      const filter = this.filter();

      filter.value = this.store.filter();
    })
  }

  ngOnInit(): void {
    this.loadPosts().then(() => console.log('POSTS loaded'));
  }

  async loadPosts() {
    this.store.loadAdd();
  }

  onFilterPosts(e: MatButtonToggleChange)  {
    const filter= e.value;

    this.store.updateFilter(filter);
  }
}
