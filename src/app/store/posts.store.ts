import { computed, effect, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withState,
  withMethods,
  withComputed,
  withHooks,
  getState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  addEntities,
  addEntity,
  removeEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { DataService } from '../service/data.service';
import { pipe, tap } from 'rxjs';
import { Post } from '../service/post.interface';

type PostState = {
  posts: Post[];
  isLoading: boolean | null;
  filter: any;
};

const initialState: PostState = {
  posts: [],
  isLoading: false,
  filter: '',
};

export const PostsStore = signalStore(
  withState(initialState),
  withEntities<Post>(),
  withMethods((store, postService = inject(DataService)) => ({
    addPost(post: Post): void {
      patchState(store, addEntity(post));
    },
    deletePost(postId: number): void {
      patchState(store, removeEntity(postId));
    },
    async loadAdd() {
      patchState(store, { isLoading: true });
      const posts = await postService.getAll();
      patchState(store, addEntities(posts), { isLoading: false });
    },
    updateFilter(filter: any) {
      patchState(store, { filter });
    },
    savePost: rxMethod<Post>(
      pipe(
        tap((x) => {
          console.log('[savePost] ', x);
          // patchState(store, { posts: [...store.posts(), ...x] });
        })
      )
    ),
  })),
  withComputed((store) => ({
    filteredTodos: computed(() => {
      const posts = store.entities();

      const comparedValue = store.filter() ? store.filter() : '';
      if (store.filter()) return posts.filter((x) => x.id == comparedValue);

      return posts.sort((a, b) => b.id - a.id);
    }),
  })),
  withHooks({
    onInit(store) {
      effect(() => {
        const state = getState(store);
        console.log('[GET STATE] ', state);
      });
    },
  })
);
