/* eslint-disable no-unused-vars */
const mongodb = require('mongodb')

const { ObjectId } = mongodb

const initialUsers = [
  {
    _id: new ObjectId('000000000000000000000000'),
    email: 'admin@baseapinode.com',
    password: '$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO', // Password1
    firstName: 'Admin',
    lastName: 'BaseApi',
    role: new ObjectId('000000000000000000000000'), // Admin
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
  {
    _id: new ObjectId('000000000000000000000001'),
    email: 'glarriera@baseapinode.com',
    password: '$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO', // Password1
    firstName: 'Gaston',
    lastName: 'Larriera',
    role: new ObjectId('000000000000000000000003'), // paciente
    phone: '(+54) 9 1176806956',
    governmentId: {
      type: 'cuil',
      number: '30-23135253-1',
    },
    bornDate: new Date(1990, 4, 29),
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
  {
    _id: new ObjectId('000000000000000000000002'),
    email: 'clopez@baseapinode.com',
    password: '$2a$10$J3Qa3YiZTxXBX7NsSXMWmeVfrnsK7GXyCQM8sQ0VpSgvULxA/DOgO', // Password1
    firstName: 'Carlos',
    lastName: 'Lopez',
    phone: '(+598) 2204 5199',
    governmentId: {
      type: 'dni',
      number: '5023877',
    },
    bornDate: new Date(2000, 0, 15),
    role: new ObjectId('000000000000000000000002'), // medico
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0,
  },
]

module.exports = {
  async up(db, client) {
    await db.collection('users').insertMany(initialUsers)
  },

  async down(db, client) {
    await db.collection('users').deleteMany({
      _id: {
        $in: initialUsers.map((user) => user._id),
      },
    })
  },
}
