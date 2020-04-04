'use strict'
const User = use('App/Models/User')
const Logger = use('Logger')

class AuthController {
    async login ({ auth, request }) {
        const { email, password } = request.all()
        try {
            const token = await auth.attempt(email, password)
            return token
        } catch (error) {
            Logger.info(error)
        }
        return 'error'
    }
    async logout ({ auth, request }) {
        try {
            return 'success'
            // return await auth.logout()
        } catch (error) {
            Logger.info(error)
        }
        return 'error'
    }

    async register ({ auth, request }) {
        const { full_name, email, password } = request.all()

        const user = new User()

        user.full_name = full_name
        user.email = email
        user.password = password

        await user.save()

        const token = await auth.attempt(email, password)
        return token
    }

    async user ({ auth, request }) {
        return {
            user: auth.user
        }
    }
}

module.exports = AuthController
