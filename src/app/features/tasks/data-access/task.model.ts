export type TaskStatus = 'pending' | 'in-progress' | 'done';
export type TaskFilter = 'all' | TaskStatus;

export interface LearningTask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface NewLearningTask {
  title: string;
  description: string;
}
