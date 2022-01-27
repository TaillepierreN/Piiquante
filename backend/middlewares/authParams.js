const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

module.exports = (req, res, next) => {
    if (emailRegex.test(req.body.email)) {
        if (!req.body.password) {
            res.status(401).json({
                message: 'mot de passe manquant'
            })
        } else {
            next()
        }
    } else {
        res.status(401).json({
            message: 'email non valide'
        })
    }
}