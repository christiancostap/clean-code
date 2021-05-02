const HttpResponse = require('../helpers/http-response')

module.exports = class LoginRouter {
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
  }
}
