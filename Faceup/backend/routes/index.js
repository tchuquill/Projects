var express = require('express');
var router = express.Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const uniqid = require('uniqid');

router.post('/upload', async (req, res) => {
    const photoPath = `./tmp/${uniqid()}.jpg`;
    const resultMove = await req.files.photoFromFront.mv(photoPath);
 //si la réponse est undefined donc bien envoyé
 if (!resultMove) {
    //on envoi le fichier sur cloudinary
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);
    
    
    //et envoi le résultat avec l'uri
   res.json({ result: true, url: resultCloudinary.secure_url });      
 } else {
    //sinon retour erreur
   res.json({ result: false, error: resultMove });
 }
 //on supprime le fichier temporaire si bien envoyé
 fs.unlinkSync(photoPath);
});



module.exports = router;
