const Sauce = require('../models/Sauce');
const fs = require('fs');

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
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({
            error
        }));

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
        .then(() => res.status(201).json({
            message: 'Sauce ajoutée'
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

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
            const toDelete = sauce.imageUrl.split('/images/')[1];
            if (req.file) {
                fs.unlink(`images/${toDelete}`, () => {
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
            } else {
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
            }
        })

}

exports.deleteSauce = (req, res) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => {
            const toDelete = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${toDelete}`, () => {
                Sauce.deleteOne({
                        _id: req.params.id
                    })
                    .then(() =>
                        res.status(200).json({
                            message: 'Sauce enlevée'
                        }))
                    .catch(error => res.status(400).json({
                        error
                    }));
            })
        })
}

exports.likeSauce = (req, res) => {
    // function removelike(){
    //     return likesauce.userLiked.filter(req.userId)
    // };
    // function removedislike(){
    //     return likesauce.userDisliked.filter(req.userId)
    // };
    // Sauce.updateOne({
    //     _id: req.params.id
    // })
    // .then(likesauce =>{
        // if(likesauce.usersLiked.includes(req.userId) && req.like === 0){
        //         removelike();
        //         likesauce.likes --
        // } else if (likesauce.usersDisliked.includes(req.userId) && req.like === 0){
        //         removedislike();
        //         likesauce.dislikes ++
        // } else if(!likesauce.usersLiked.includes(req.userId) && req.like === 1){
        //     likesauce.userLiked.push(req.userId);
        //     likesauce.likes ++
        // } else if(!likesauce.usersDisliked.includes(req.userId) && req.like === -1){
        //     likesauce.userDisliked.push(req.userId);
        //     likesauce.dislikes ++
        // }
    // })
}