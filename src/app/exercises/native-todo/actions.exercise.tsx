'use server'

import {AddTodo, Todo} from '@/lib/type'
import {revalidatePath} from 'next/cache'
// import {createPool} from '@vercel/postgres' for versel postgres db
import {Pool} from 'pg'

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})
export const addTodo = async (todo: AddTodo) => {
  try {
    await addTodoDao(todo)
  } catch (error) {
    console.error('Failed to add todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/native-todo')
  }
}

export const updateTodo = async (todo: Todo) => {
  try {
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/native-todo')
  }
}

export async function addTodoDao(todo: AddTodo): Promise<void> {
  await pool.query<AddTodo>(
    `INSERT INTO Todo (title, isCompleted, createdAt, updatedAt) VALUES ('${todo.title}', false, NOW(), NOW())`
  )
}

export async function updateTodoDao(todo: Todo): Promise<void> {
  await pool.query<AddTodo>(`UPDATE Todo 
    SET
      title = 'Todo updated',
      isCompleted = true,
      updatedAt = NOW()
    WHERE id = ${todo.id}`)
}

export async function getTodos(): Promise<Todo[]> {
  const {rows} = await pool.query<Todo[]>(`SELECT 
    id,
    title,
    iscompleted AS "isCompleted",
    createdat AS "createdAt",
    updatedat AS "updatedAt" from TODO order by createdAt asc limit 100`)
  return rows.flat()
}
