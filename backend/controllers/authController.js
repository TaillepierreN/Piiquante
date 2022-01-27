const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = async (req, res) => {
    // bcrypt.hash(req.body.password, 10)
    // .then(hash => {
    //     const user = new User({
    //         email: req.body.email,
    //         password: hash
    //     });
    //     user.save()
    //     .then(() => res.status(201).json({ message: 'Utilisateur crée !'}))
    //     .catch(error => res.status(400).json({error}));
    // })
    // .catch(error => res.status(500).json({ error }));
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: hash
        });
        await user.save()
        return res.status(201).json({
            message: 'utilisateur crée 2'
        })
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

/**
 * @description fonction pour se log
 */

exports.login = async (req, res) => {
    // User.findOne({
    //         email: req.body.email
    //     })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(404).json({
    //                 error: "Utilisateur non trouvé"
    //             });
    //         }
    //         bcrypt.compare(req.body.password, user.password)
    //             .then(valid => {
    //                 if (!valid) {
    //                     return res.status(400).json({
    //                         error: "Mot de passe incorrect"
    //                     });
    //                 }
    //                 res.status(200).json({
    //                     userId: user._id,
    //                     token: jwt.sign({
    //                             userId: user._id
    //                         },
    //                         process.env.TOKEN_SECRET, {
    //                             expiresIn: '24h'
    //                         }
    //                     )
    //                 });
    //             })
    //             .catch(error => res.status(500).json({
    //                 error
    //             }));
    //     })
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) {
            return res.status(404).json({
                error: "Utilisateur non trouvé"
            });
        }
        const isValid = await bcrypt.compare(req.body.password, user.password)
        if (!isValid) {
            return res.status(400).json({
                error: "Mot de passe incorrect"
            });
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