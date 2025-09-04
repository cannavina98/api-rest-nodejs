const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Rest Nodejs',
            version: '1.0.0',
            description: 'API CRUD simples para portfolio'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                Projetos: {
                    type: 'object',
                    required: ['name', 'description', 'url'],
                    properties:{
                        name: {
                            type: 'string',
                            description: 'Nome do projeto'
                        },
                        description: {
                            type: 'string',
                            description: 'Descricao do projeto'
                        },
                        url: {
                            type: 'string',
                            description: 'Url do projeto'
                        },
                        message:{
                            type: 'string',
                            example: 'Success'
                        }
                    }
                }
            },
            responses: {
                400: {
                    description: 'Missing API Key: Error 400',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Missing API Key'
                                    }
                                }
                            }
                        }
                    }
                },
                401: {
                    description: 'Unauthorized: Error 401',
                    content: { 
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties:{
                                    message: {
                                        type: 'string',
                                        example: 'Unauthorized access'
                                    },
                                },
                            },
                        },
                    },
                },
                404: {
                    description: 'Not Found: Error 404',
                    content: { 
                        'application/json':{
                            schema:{
                                type: 'object',
                                properties:{
                                    message:{
                                        type: 'string',
                                        example: 'Not Found'
                                    },                                    
                                },
                            },
                        },
                    },
                }
            }
        },
    },        
    apis: ['./src/routes/projetos.js']
}

export default options