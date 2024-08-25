const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
    version: '1.0.0',
  },
  host: 'localhost:3000',
}

const outputFile = './swagger.json'
const endpointsFiles = ['./src/routers/routes.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
