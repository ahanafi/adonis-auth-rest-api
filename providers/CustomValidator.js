'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class CustomValidator extends ServiceProvider {
  register() {

  }

  boot() {
    const Validator = use('Validator')
    const Database = use('Database')
    Validator.extend("exists", async (data, field, message, args, get) => {
      const value = get(data, field)
      if(!value) {
        throw "Can't find " + column + " in " + table
      }

      const [table, column] = args;
      const row = await Database.table(table).where(column, value).first()

      if(!row) {
        throw "Can't find " + column + " in " + table
      }
    })
  }
}

module.exports = CustomValidator

