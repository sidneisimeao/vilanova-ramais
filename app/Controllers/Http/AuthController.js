'use strict'
const User = use('App/Models/User')
class AuthController {
  loginView({ view, auth, response }) {
    if (auth.user) {
      return response.route('index.schedule')
    }
    return view.render('auth.login')
  }

  registrationView({ view }) {
    return view.render('auth.register')
  }

  async postLogin({ request, auth, response }) {
    await auth.attempt(request.input('email'), request.input('password'))
    return response.route('index.schedule')
  }

  /*
  async postRegister({ request, session, response }) {
    const user = await User.create({
      username: request.input('name'),
      email: request.input('email'),
      password: request.input('password')
    })
    session.flash({ successmessage: 'User have been created successfully' })
    return response.route('login.create')
  }*/

  async logout({ auth, response }) {
    await auth.logout()
    return response.route('/admin')
  }
}
module.exports = AuthController
