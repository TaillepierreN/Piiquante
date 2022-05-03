const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// verifie que l'adresse email est conforme et que le mot de passe est présent
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