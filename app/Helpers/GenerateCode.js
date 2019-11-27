'use strict'

const Database = use('Database')

const generateCode = async (type, strCode) => {
  const kode = await Database.from(type).max('kode AS kode').first()

  if (kode.kode !== null) {
    var currentCode = kode.kode
    var index = currentCode.replace(strCode + '-', '')
    index = parseInt(index) + 1
    index = index.toString()
    var newCode = ""
    if (index.length == 1) {
      newCode = "000" + index
    } else if (index.length == 2) {
      newCode = "00" + index
    } else if (index.length == 3) {
      newCode = "0" + index
    } else {
      newCode = index;
    }

    newCode = strCode + '-' + newCode
    return newCode
  } else {
    return strCode + '-0001'
  }
}

module.exports = {
  generateCode
}
