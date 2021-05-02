const HttpResponse = require('../helpers/http-response')
const MissingParamError = require('../helpers/missing-param-error')

module.exports = class LoginRouter {
  constructor (authUseCase) {
    this.authUseCase = authUseCase
  }

  async route (httpRequest) {
    try {
      const { email, password } = httpRequest.body
      if (!password) {
        return HttpResponse.badRequest(new MissingParamError('password'))
      }
      if (!email) {
        return HttpResponse.badRequest(new MissingParamError('email'))
      }

      const accessToken = await this.authUseCase.auth(email, password)
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
