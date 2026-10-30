import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Task board | NgRx Interview Lab',
    loadComponent: () => import('./features/tasks/tasks-page').then((module) => module.TasksPage),
  },
  {
    path: 'interview-guide',
    title: 'Interview guide | NgRx Interview Lab',
    loadComponent: () =>
      import('./features/interview-guide/interview-guide-page').then(
        (module) => module.InterviewGuidePage,
      ),
  },
  {
      path: 'signal-store',
      title: 'SignalStore | NgRx Interview Lab',
      loadComponent: () =>
        import('./features/signal-store/signal-store-page').then(
          (module) => module.SignalStorePage,
        ),
  },
  { path: '**', redirectTo: '' },
];
