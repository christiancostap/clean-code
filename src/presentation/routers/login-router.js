const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return {
        statusCode: 500
      }
    }
    const { email, password } = httpRequest.body
    if (!password) {
      return HttpResponse.badRequest('password')
    }
    if (!email) {
      return HttpResponse.badRequest('email')
    }
    this.authUseCase.auth(email, password)
    return {
      statusCode: 401
    } // código conflitante, pois n faz validação, apenas retorna.
  }
}
