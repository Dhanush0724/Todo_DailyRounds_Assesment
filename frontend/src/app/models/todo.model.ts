export interface Todo {
  _id?: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  tags: string[];
  notes: string[];
  created_by: string;
}
