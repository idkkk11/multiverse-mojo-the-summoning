const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Attack } = require('./index')
const { db } = require('../db/config')

let attack

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true })
    attack = await Attack.create({
        title: "Punch",
        mojoCost: 4,
        staminaCost: 2
    })
})

// clear db after tests
afterAll(async () => await db.close())

describe('Attack', () => {
    it('has an id', async () => {
        expect(attack).toHaveProperty('id')
    })

    it('stores the correct mojo cost', async () => {
        expect(attack.mojoCost).toBe(4)
    })
})
