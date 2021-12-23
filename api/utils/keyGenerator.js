const crypto = require("crypto");

const generateApiKey = () => {
    const crypt1 = crypto.randomBytes(12).toString("hex")
    const crypt2 = crypto.randomBytes(17).toString("hex")
    return `REFEM-${crypt1}-${crypt2}`
}

module.exports = generateApiKey