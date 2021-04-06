const { response } = require("express");
const https = require("https");
const router = require('express').Router();


router.route('/:handle').get((req,res)=>{
    const handle = req.params.handle;
    const url = "https://codeforces.com/api/user.info?handles="+handle;

    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const userInfo = JSON.parse(data);
            res.send(userInfo);
        });
    });

});

router.route('/ratingChange/:handle').get((req,res)=>{
    const handle = req.params.handle;
    const url = "https://codeforces.com/api/user.rating?handle="+handle;

    https.get(url,(response)=>{
        let ratingChanges = "";

        response.on('data',(chunk)=>{
            ratingChanges += chunk;
        });

        response.on('end',()=>{
            ratingChanges = JSON.parse(ratingChanges);
            res.json({"contests": ratingChanges.result});
        });
    });
    
});

module.exports = router;