module.exports = (req, res, next) =>{
    if(!req.body.email){
        res.status(401).json({ message: 'email manquant'})
    }else if(!req.body.password){
        res.status(401).json({ message: 'mot de passe manquant'})
    }else{
        next();
    }
}