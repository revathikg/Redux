# NgRx Interview Lab

A runnable Angular 21 + NgRx 21 sample for practicing the Redux pattern and explaining common NgRx concepts in interviews. The task board uses a small in-memory demo API, so no backend is required.

## Run it

```bash
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). The Task board demonstrates actions, feature state, reducers, Entity, Effects, memoized selectors, and `Store.selectSignal()`. The SignalStore page demonstrates signal-first state, computed state, methods, and provider scoping. The Interview guide includes a CLI cheat sheet, an architecture walkthrough, and practice questions.

```bash
npm run build
npm test
```

## NgRx concepts in this sample

| Concept | Where to look |
| --- | --- |
| Store, feature state, runtime checks | `src/app/app.config.ts`, `src/app/features/tasks/data-access/tasks.reducer.ts` |
| Actions | `src/app/features/tasks/data-access/tasks.actions.ts` |
| Reducers and Entity Adapter | `src/app/features/tasks/data-access/tasks.reducer.ts` |
| Effects and async API handling | `src/app/features/tasks/data-access/tasks.effects.ts` |
| Memoized selectors and derived state | `src/app/features/tasks/data-access/tasks.selectors.ts` |
| Router Store | `src/app/app.config.ts` |
| Redux DevTools | `src/app/app.config.ts` |
| SignalStore (`withState`, `withComputed`, `withMethods`) | `src/app/features/signal-store/counter.store.ts` |
| Unit tests | `src/app/features/tasks/data-access/tasks.reducer.spec.ts` |

The demo API is in-memory and adds a small delay to make loading and effect behavior observable. Replace `TasksApiService` with an `HttpClient` implementation when connecting a real backend.

## CLI commands for practice

```bash
# Create a new standalone Angular app with routing
ng new ngrx-interview-lab --routing --style=css --strict

# Install NgRx packages compatible with Angular 21
npm install @ngrx/store@^21 @ngrx/effects@^21 @ngrx/entity@^21 @ngrx/router-store@^21 @ngrx/store-devtools@^21 @ngrx/signals@^21

# Start, build, and test
npm start
npm run build
npm test

# Generate common Angular building blocks
ng generate component features/example
ng generate service features/example/data-access/example-api

# Inspect Angular CLI commands
ng generate --help
ng add --help
```

## Suggested interview walkthrough

1. Follow `taskCreationRequested` from the page component.
2. Explain why the effect owns the asynchronous API call and dispatches a success or failure action.
3. Show how the reducer updates normalized state using Entity Adapter without mutating it.
4. Describe how `selectVisibleTasks` derives filtered data and why derived values are not stored separately.
5. Open Redux DevTools and inspect the action, state diff, and history.
6. Compare `concatMap`, `switchMap`, `mergeMap`, and `exhaustMap` in terms of concurrency and cancellation.

## Development

This workspace was generated with Angular CLI. The development server supports live reload. Use `ng generate component component-name` or `ng generate service service-name` to scaffold additional practice features.
