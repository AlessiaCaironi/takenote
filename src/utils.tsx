import type { Schema } from '../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'

const client = generateClient<Schema>()

export function deleteTodo(id: string): void {
  client.models.Todo.delete({ id })
}

export function createTodo({
  title,
  content,
}: {
  title: string
  content: string
}): void {
  client.models.Todo.create({ content: content, title: title })
}

export function updateTodo({
  id,
  title,
  content,
}: {
  id: string
  title: string
  content: string
}): void {
  client.models.Todo.update({ id, content, title })
}
