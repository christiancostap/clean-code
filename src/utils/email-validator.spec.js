const EmailValidator = require('./email-validator')
const validator = require('validator')

const makeSut = () => {
  return new EmailValidator()
}

describe('Email Validator', () => {
  test('Should return true if validator returns true.', async () => {
    const sut = makeSut() // sut (system under test)
    const isEmailValid = sut.isValid('valid_email@mail.com')
    expect(isEmailValid).toBe(true)
  })

  test('Should return false if validator returns false.', async () => {
    validator.isEmailValid = false
    const sut = makeSut() // sut (system under test)
    const isEmailValid = sut.isValid('invalid_email@mail.com')
    expect(isEmailValid).toBe(false)
  })

  test('Should call validator with correct email', async () => {
    const sut = makeSut() // sut (system under test)
    sut.isValid('any_email@mail.com')
    expect(validator.email).toBe('any_email@mail.com')
  })
})
