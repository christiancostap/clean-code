const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body || !this.authUseCase || !this.authUseCase.auth) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!password) {
      return HttpResponse.badRequest('password')
    }
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    this.authUseCase.auth(email, password)
    return HttpResponse.unauthorized() // código conflitante, pois n faz validação, apenas retorna.
  }
}
