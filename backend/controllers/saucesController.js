const Sauce = require('../models/Sauce');
const fs = require('fs');

/**
 * @description  route getAll pour les sauces
 * */
exports.displaySauces = (req, res) => {
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error =>
            res.status(500).json({
                error
            })
        )
}

/**
 * @description route getOne pour les sauces
 */
exports.displaySauce = (req, res) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            if (!sauce) {
                return res.status(404).json({
                    error: "sauce non trouvée"
                })
            }
            return res.status(200).json(sauce)
        })
        .catch(error => res.status(500).json({
            error
        }));
}

/**
 * @description route POST pour les sauces
 */
exports.newSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(201).json({
            message: 'Sauce ajoutée'
        }))
        .catch(error => res.status(500).json({
            error
        }));
}

/**
 * @description route PUT pour les sauces
 */
exports.updateSauce = (req, res) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body
    }
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            if (req.file) {
                const toDelete = sauce.imageUrl.split('/images/')[1];
                try {
                    fs.unlinkSync(`images/${toDelete}`)
                } catch (error) {
                    console.error(error)
                }
            }
            Sauce.updateOne({
                    _id: req.params.id
                }, {
                    ...sauceObject,
                    _id: req.params.id
                })
                .then(() => res.status(200).json({
                    message: 'Sauce mise à jour'
                }))
                .catch(error => res.status(400).json({
                    error
                }));
        })
}

/**
 * @description route DELETE pour les sauces
 */
exports.deleteSauce = (req, res) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            const toDelete = sauce.imageUrl.split('/images/')[1];
            Sauce.deleteOne({
                    _id: req.params.id
                })
                .then(() => {
                    console.log(toDelete)
                    fs.unlinkSync(`images/${toDelete}`)
                    return res.status(200).json({
                        message: 'Sauce enlevée'
                    })
                })
                .catch(error => res.status(400).json({
                    error
                }));
        })
}

/**
 * @description route PUT pour les likes des sauces
 */
exports.likeSauce = (req, res) => {
    const isLiked = req.body.like;
    switch (isLiked) {
        case 1:
            Sauce.updateOne({
                    _id: req.params.id
                }, {
                    $inc: {
                        likes: 1
                    },
                    $push: {
                        usersLiked: req.body.userId
                    }
                })
                .then((() => res.status(200).json({
                    message: "liked"
                })))
                .catch(error => res.status(400).json({
                    error
                }));
            break;
        case 0:
            Sauce.findOne({
                    _id: req.params.id
                })
                .then(sauce => {
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauce.updateOne({
                                _id: req.params.id
                            }, {
                                $inc: {
                                    likes: -1
                                },
                                $pull: {
                                    usersLiked: req.body.userId
                                }
                            })
                            .then((() => res.status(200).json({
                                message: "like enlevé"
                            })))
                            .catch(error => res.status(400).json({
                                error
                            }));
                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauce.updateOne({
                                _id: req.params.id
                            }, {
                                $inc: {
                                    dislikes: -1
                                },
                                $pull: {
                                    usersDisliked: req.body.userId
                                }
                            })
                            .then((() => res.status(200).json({
                                message: "dislike enlevé"
                            })))
                            .catch(error => res.status(400).json({
                                error
                            }));
                    }
                })
                .catch(error => res.status(400).json({
                    error
                }));
            break;
        case -1:
            Sauce.updateOne({
                    _id: req.params.id
                }, {
                    $inc: {
                        dislikes: 1
                    },
                    $push: {
                        usersDisliked: req.body.userId
                    }
                })
                .then(() => res.status(200).json({
                    message: "disliked"
                }))
            break;
    }
}