import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Todo: a
    .model({
      title: a.string(),
      content: a.string(),
      image: a.string(),
    })
    .authorization((allow) => [allow.owner()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
})
