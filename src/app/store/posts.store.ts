import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withState,
  withMethods,
  withComputed,
  withHooks,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  addEntity,
  removeAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { DataService } from '../service/data.service';
import { pipe, switchMap, tap } from 'rxjs';

interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

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
    async loadAdd() {
      patchState(store, { isLoading: true });
      const posts = await postService.getAll();
      patchState(store, { posts, isLoading: false });
    },
    updateFilter(filter: any) {
      patchState(store, { filter });
    },
    savePost: rxMethod<Post[]>(
      pipe(
        tap((x) => {
          console.log("DAJE ", x);
          patchState(store, { posts: [...store.posts(), ...x] });
        })
      )
    ),
  })),
  withComputed((store) => ({
    filteredTodos: computed(() => {
      const posts = store.posts();

      const comparedValue = store.filter() ? store.filter() : '';
      if (store.filter()) return posts.filter((x) => x.id == comparedValue);

      // return posts;
      return posts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    }),
  })),
  withHooks({
    onInit(store) {
      store.savePost(store.entities);
      console.log('DALL ', store.posts());
    },
  })
);
