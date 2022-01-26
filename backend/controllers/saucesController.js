const Sauce = require('../models/Sauce');


exports.displaySauces = (req, res) => {
    Sauce.find()
        .then(sauce => res.status(200).json(sauce))
        .catch(error =>
            res.status(404).json({
                error
            })
        )
}

exports.displaySauce = (req, res) => {
    Sauce.findOne({ _id : req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));

}

exports.newSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
    .then (() => res.status(201).json({
        message: 'Sauce ajoutée'
    }))
    .catch(error => res.status(400).json({
        error
    }));
}

exports.updateSauce = (req, res) => {
    res.status(200).json({
        message: 'route update sauce ok'
    })
}

exports.deleteSauce = (req, res) => {
    res.status(200).json({
        message: 'route delete sauce ok'
    })
}

exports.likeSauce = (req, res) => {
    res.status(200).json({
        message: 'route like sauce ok'
    })
}