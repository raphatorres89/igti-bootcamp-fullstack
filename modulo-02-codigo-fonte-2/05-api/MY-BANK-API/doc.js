export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Api desenvolvida no curso do IGTI',
    version: '1.0.0',
    title: 'My-Bank-API',
  },
  host: 'petstorelocalhost:3000',
  tags: [
    {
      name: 'account',
      description: 'Account management',
    },
  ],
  paths: {
    '/account': {
      post: {
        tags: ['account'],
        summary: 'Add a new account to the store',
        description: '',
        operationId: 'addAccount',
        consumes: ['application/json'],
        produces: ['application/json'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account object that needs to be added to the store',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          '405': {
            description: 'Invalid input',
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: 'object',
      required: ['name', 'balance'],
      properties: {
        id: {
          type: 'integer',
          format: 'int64',
        },
        name: {
          type: 'string',
          example: 'Raphael Torres',
        },
        balance: {
          type: 'integer',
          description: 'Account balance in the store',
        },
      },
    },
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io',
  },
};
