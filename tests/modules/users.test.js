const { createUser } = require('../../modules/users')

describe('CREATE_USER', () => {
    it('should add a uuid in id param to the new user', async() => {
        const user = {}
        const response = createUser(user)
        
        expect(response.id).toBeDefined()
        expect(response.id.length).toBe(36)
    })
})