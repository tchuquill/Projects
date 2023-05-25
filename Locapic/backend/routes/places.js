var express = require('express');
var router = express.Router();
require('../models/connection');
const Place = require('../models/places');
const {checkBody} = require('../modules/checkBody');

//pour ajouter les données dans la database places

router.post('/', (req, res) => { 
if(!checkBody(req.body,['nickname', 'name', 'latitude', 'longitude']))
{
    res.json({result: false, error: "Missing or empty fields"});
    return
}

const { nickname, name, latitude, longitude } = req.body;
const newPlace = new Place({ nickname, name, latitude, longitude });

newPlace.save().then(()=> { res.json({ result: true })})
    });

//{ nickname: 'Max', name: 'Lyon', latitude: 45.758, longitude: 4.835 } rép { result: true }

//pour récupérer les marqueurs en fonction de son surnom (via req.params)
router.get(`/:nickname`, (req, res) => {
    //ajout du regex pour le nickname
    Place.find({ nickname: { $regex: new RegExp(req.params.nickname, 'i') } })
    .then((data) => {
        res.json({ result: true, places: data });
    });
  });

// rep { result: true, places: [{ nickname: 'John', name: 'Lyon', latitude: 45.758, longitude: 4.835 }, ...] }


//pour supprimer une ville
router.delete('/', (req, res) => {
    if(!checkBody(req.body,['nickname', 'name'])){
        res.json({result: false, error: "Missing or empty fields"});
        return
    }
    const { nickname, name } = req.body;

    Place.deleteOne({ nickname: {$regex: new RegExp(req.params.nickname,'i')}, name: req.body.name  })
    .then((deletedDoc) => {
    if (deletedDoc.deletedCount > 0) {
                res.json({result:  true });
                    } else {
                        res.json({result:  false, error: "Place not found"})
                    }
            })});
// requete { nickname: 'Max', name: 'Lyon' } rép  { result: true }


module.exports = router;