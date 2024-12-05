import { defineStorage } from '@aws-amplify/backend'

export const storage = defineStorage({
  name: 'takenote-storage',
  access: (allow) => ({
    'images/*': [allow.authenticated.to(['get', 'write', 'delete'])],
  }),
})
