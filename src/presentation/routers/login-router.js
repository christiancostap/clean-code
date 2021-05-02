const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!password) {
        return HttpResponse.badRequest('password')
      }
      if (!email) {
        return HttpResponse.badRequest('email')
      }
      const accessToken = this.authUseCase.auth(email, password)
      if (!accessToken) {
        return HttpResponse.unauthorized()
      }
      return HttpResponse.ok(accessToken)
    } catch (error) {
      // console.log(error)  // Somente necessário em produtivo (por exemplo enviar um email sempre que um erro de server for encontrado)
      return HttpResponse.serverError()
    }
  }
}
