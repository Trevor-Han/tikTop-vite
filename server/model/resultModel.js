class BaseModel {
  constructor({ code, msg, data }) {
    this.code = code
    this.msg = msg
    this.data = data
  }
}
class SuccessModel extends BaseModel {
  constructor({ code, msg, data }) {
    super({ code, msg, data })
    this.code = 200
  }
}
class ErrorModel extends BaseModel {
  constructor({ code, msg, data }) {
    super({ code, msg, data })
    this.code = -1
  }
}
module.exports = {
  SuccessModel,
  ErrorModel
}
