'use server'

import {AddTodo, Todo} from '@/lib/type'
import {revalidatePath} from 'next/cache'
// 🐶 Importe `createPool`
// 🤖 import {createPool} from '@vercel/postgres'
import {Pool} from 'pg'
// 🐶 Crée une instance de `pool`
const pool = new Pool({
  connectionString: 'postgres://user:password@host:port/db',
})
export const addTodo = async (todo: AddTodo) => {
  console.log('add todo action', todo)
  try {
    // 🐶 Vas dans `addTodoDao` pour implémenter la fonction
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
    // 🐶 Vas dans `updateTodoDao` pour implémenter la fonction
    await updateTodoDao(todo)
  } catch (error) {
    console.error('Failed to update todo', error)
    throw error
  } finally {
    revalidatePath('/exercises/native-todo')
  }
}

export async function addTodoDao(todo: AddTodo): Promise<void> {
  console.log('addTodoDao', todo)
  // 🐶 Implémente la fonction
  //
  /* La requête SQL
    INSERT INTO Todo (title, isCompleted, createdAt, updatedAt) VALUES ('Un Todo', false, NOW(), NOW())
  */

  // 🐶 Utilise `pool.sql` pour exécuter la requête
  // 🤖 await pool.sql`...`
}

export async function updateTodoDao(todo: Todo): Promise<void> {
  console.log('updateTodoDao', todo)
  // 🐶 Implémente la fonction
  //
  /* La requête SQL
   UPDATE Todo
    SET
      title = 'Todo updated',
      isCompleted = true,
      updatedAt = NOW()
    WHERE id = 10
  */

  // 🐶 Utilise `pool.sql` pour exécuter la requête
  // 🤖 await pool.sql`...`
}

export async function getTodos(): Promise<Todo[]> {
  // ⛏️ Supprime ces fausses données
  return [
    {
      id: 1,
      title: 'Fake',
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]
  // 🐶 Implémente la fonction

  /* La requête SQL
  SELECT id,
  title,
  iscompleted AS "isCompleted",
  createdat AS "createdAt",
  updatedat AS "updatedAt" from TODO order by createdAt asc limit 100`
  */
}
