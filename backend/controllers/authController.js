const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * @description Fonction pour crée un compte utilisateur
 * */
exports.signup = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: hash
        });
        await user.save()
        return res.status(201).json({
            message: 'utilisateur crée'
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

/**
 * @description fonction pour se connecter avec un compte utilisateur existant
 */

exports.login = async (req, res) => {
    try {
        const bodyEmail= req.body.email;
        const user = await User.findOne({
            email: bodyEmail
        }
        )
        if (!user) {
            return res.status(404).json(
                "Utilisateur non trouvé"
            );
        }
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) {
            return res.status(400).json(
                "Mot de passe incorrect"
            );
        }
        res.status(200).json({
            userId: user._id,
            token: jwt.sign({
                userId: user._id
            },
                process.env.TOKEN_SECRET, {
                expiresIn: '24h'
            }
            )
        });
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}