import type { Schema } from '../../amplify/data/resource'
import { generateClient } from 'aws-amplify/data'
import { uploadImage, deleteImage } from './utils.image'

const client = generateClient<Schema>()

export async function getTodos(): Promise<Array<Schema['Todo']['type']>> {
  try {
    // TODO: get sorted data
    const data = await client.models.Todo.list()
    return data.data
  } catch (error) {
    console.error('Error getting todos:', error)
    throw error
  }
}

export async function deleteTodo(todo: Schema['Todo']['type']): Promise<void> {
  try {
    const imageUrl = todo.image
    if (imageUrl) {
      await deleteImage(imageUrl)
    }
    await client.models.Todo.delete({ id: todo.id })
  } catch (error) {
    console.error('Error deleting todo:', error)
    throw error
  }
}

export async function createTodo({
  title,
  content,
  imageFile,
}: {
  title: string
  content: string
  imageFile?: File
}): Promise<void> {
  try {
    let imageUrl: string | undefined
    if (imageFile) {
      imageUrl = await uploadImage(imageFile)
    }

    await client.models.Todo.create({
      content: content,
      title: title,
      image: imageUrl,
    })
  } catch (error) {
    console.error('Error creating todo:', error)
    throw error
  }
}

export async function updateTodo({
  id,
  title,
  content,
}: {
  id: string
  title: string
  content: string
}): Promise<void> {
  try {
    await client.models.Todo.update({ id, title, content })
  } catch (error) {
    console.error('Error updating todo:', error)
    throw error
  }
}
