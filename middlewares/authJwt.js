const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Permission = db.permission;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({message: 'No token provided.'});
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err){
            return res.status(401).send({message: 'Unauthorized.'});
        }

        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }

        Permission.find(
            {
                _id: {$in: user.permissions}
            },
            (err, permissions) => {
                if(err) {
                    res.status(500).send({message: err});
                    return;
                }

                for(let i = 0; i < permissions.length; i++){
                    if(permissions[i].name === 'admin'){
                        next();
                        return;
                    }
                }

                res.status(403).send({message: 'Require Admin Permission!'});
                return;
            }
        );
    });
};

isModerator = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }

        Permission.find(
            {
                _id: {$in: user.permissions}
            },
            (err, permissions) => {
                if(err) {
                    res.status(500).send({message: err});
                    return;
                }

                for(let i = 0; i < permissions.length; i++){
                    if(permissions[i].name === 'moderator'){
                        next();
                        return;
                    }
                }

                res.status(403).send({message: 'Require Moderator Permission!'});
                return;
            }
        );
    });
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator
}

module.exports = authJwt;