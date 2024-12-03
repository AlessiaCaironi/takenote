import type { Schema } from '../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()

export function deleteTodo(id: string): void {
  client.models.Todo.delete({ id })
}

interface createTodoInterface {
  title: string
  content: string
}

export function createTodo({ title, content }: createTodoInterface): void {
  client.models.Todo.create({ content: content, title: title })
}
