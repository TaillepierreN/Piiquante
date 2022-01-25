exports.displaySauces = (req, res) => {
    res.status(200).json({
        message: 'route get sauces ok'
    })
}

exports.displaySauce = (req, res) =>{
    res.status(200).json({
        message: 'route get sauce ok'
    })
}

exports.postSauce =(req, res) => {
    res.status(200).json({
        message: 'route post sauce ok'
    })
}

exports.updateSauce = (req, res) => {
    res.status(200).json({
        message: 'route update sauce ok'
    })
}

exports.deleteSauce =(req, res) => {
    res.status(200).json({
        message: 'route delete sauce ok'
    })
}

exports.likeSauce = (req, res) => {
    res.status(200).json({
        message: 'route like sauce ok'
    })
}