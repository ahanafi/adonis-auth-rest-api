'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class AuthController {
  async register ({ request, auth, response }) {
    const validation = await validate(request.all(), {
      username: 'required|unique:users,username|min:6',
      fullname: 'required|string',
      email: 'required|unique:users,email',
      password: 'required|min:8'
    })

    if(validation.fails()) {
      return response.json({
        error: true,
        message: validation.messages()
      })
    }

    const user = new User()
    user.fullname = request.input('fullname')
    user.username = request.input('username')
    user.email = request.input('email')
    user.password = request.input('password')
    await user.save()

    const accessToken = await auth.generate(user)
    return response.json({
      error: false,
      data: {
        user: user,
        access_token: accessToken
      }
    })
  }
}

module.exports = AuthController
