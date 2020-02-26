import BareTest from 'baretest'
import assert from 'assert'
import uuid4 from 'uuid4'
import { createPool, sql } from 'slonik'

const test = BareTest('Slonik UUID')


test('Has tests', () => {
  assert.strictEqual(1 + 1, 2)
})

test('Create a record', async () => {
  const id = uuid4()
  const title = 'Test Item 1'
  const r = await db.query(sql`INSERT INTO slonik (id, title) VALUES (${id}, ${title})`)
  assert.strictEqual(r.rowCount, 1)
})

const db = await createPool('postgres://postgres:admin@localhost:5666/postgres', {
    maximumPoolSize: 1,
    minimumPoolSize: 1,
    idleTimeout: 1
  })

test.run()
