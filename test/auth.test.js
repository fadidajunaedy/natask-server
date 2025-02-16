const supertest = require('supertest')
const web = require("../src/application/web.js")
const User = require('../src/model/user-model.js')

require("./util/test-util.js")


describe('Register User', () => {
    test("creating new user when request body is provided", async () => {  
        const response = await supertest.agent(web).post('/api/auth/register').send({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678'
        })
        expect(response.statusCode).toBe(200)
    })
    
    test("creating new user when request body is not", async () => {  
        const response = await supertest.agent(web).post('/api/auth/register').send()
        expect(response.statusCode).toBe(500)  
    })
})

// describe('Login User', () => {
//     test("creating new user when request body is provided", async () => {  
//         const response = await supertest.agent(web).post('/api/auth/register').send({
//             name: 'John Doe',
//             email: 'johndoe@example.com',
//             password: '12345678'
//         })
//         expect(response.statusCode).toBe(200)
//     })
    
//     test("creating new user when request body is not", async () => {  
//         const response = await supertest.agent(web).post('/api/auth/register').send()
//         expect(response.statusCode).toBe(500)  
//     })
// })