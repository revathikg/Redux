import { Component, inject } from '@angular/core';
import { CounterStore } from './counter.store';

@Component({
  selector: 'app-signal-store-page',
  templateUrl: './signal-store-page.html',
  styleUrl: './signal-store-page.css',
  providers: [CounterStore],
})
export class SignalStorePage {
  readonly counter = inject(CounterStore);
}
