import BareTest from 'baretest'
import { strictEqual } from 'assert'
import uuid4 from 'uuid4'
import { createPool, sql } from 'slonik'

const test = BareTest('Slonik UUID')
let db

test.before(async () => {
  db = await createPool('postgres://postgres:admin@localhost:5666/postgres', {
    maximumPoolSize: 1,
    minimumPoolSize: 1,
    idleTimeout: 1
  })
})

test('Create & get a record', async () => {
  const id = uuid4()
  const title = 'Test Item 1'
  const r = await db.query(sql`INSERT INTO slonik (id, title) VALUES (${id}, ${title})`)
  strictEqual(r.rowCount, 1)
  const r2 = await db.one(sql`SELECT * FROM slonik WHERE id=${id}`)
  strictEqual(r2.id, id)
})

test.run()
