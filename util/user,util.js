module.exports = {
    userNormalizator: (userNormalize = {}) => {
        const fieldToRemove = ['password'];

        fieldToRemove.forEach((field) => {
            delete userNormalize[field]
        })
        return userNormalize
    }
}
