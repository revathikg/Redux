import { TestBed } from '@angular/core/testing';
import { CounterStore } from './counter.store';

describe('CounterStore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [CounterStore] });
  });

  it('updates state and recalculates computed values', () => {
    const store = TestBed.inject(CounterStore);

    store.increment();
    expect(store.count()).toBe(1);
    expect(store.doubled()).toBe(2);

    store.decrement();
    expect(store.count()).toBe(0);
    expect(store.doubled()).toBe(0);
  });

  it('resets the counter', () => {
    const store = TestBed.inject(CounterStore);
    store.increment();
    store.reset();

    expect(store.count()).toBe(0);
  });
});
