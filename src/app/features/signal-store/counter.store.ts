import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

export const CounterStore = signalStore(
  withState({ count: 0 }),
  withComputed(({ count }) => ({
    doubled: computed(() => count() * 2),
  })),
  withMethods((store) => ({
    increment: () => patchState(store, ({ count }) => ({ count: count + 1 })),
    decrement: () => patchState(store, ({ count }) => ({ count: count - 1 })),
    reset: () => patchState(store, { count: 0 }),
  })),
);
