const { response } = require("express");
const router = require('express').Router();
const https = require('https');

router.route('/ratingChange/:id').get((req,res)=>{
    const contestId = req.params.id;
    const url = "https://codeforces.com/api/contest.ratingChanges?contestId="+contestId;
    const url2 = "https://codeforces.com/api/contest.standings?contestId="+contestId;

    https.get(url,(response)=>{
        // console.log(response.statusCode);
        let ratingChange = '';

        response.on('data',(chunk)=>{
            ratingChange += chunk;
            
        });
        
        response.on('end',()=>{
            ratingChange = JSON.parse(ratingChange);
            //dont display total participants in UI as it is not accurate
            res.json({
                "Total Participants" : ratingChange.result.length,
                "Info" : ratingChange.result
            });
        });

    });

});

router.route('/standings/:id').get((req,res)=>{
    const contestId = req.params.id;
    const url = "https://codeforces.com/api/contest.standings?contestId="+contestId;
    
    //url3 is not of much use as of now
    // const url3 = "https://codeforces.com/api/contest.status?contestId="+contestId+"&handle="+handle;

    https.get(url,(response)=>{
        // console.log(response.statusCode);
        let standings = '';

        response.on('data',(chunk)=>{
            standings += chunk;
            
        });
        
        response.on('end',()=>{
            standings = JSON.parse(standings);
            //dont display total participants in UI as it is not accurate
            res.json({
                "Standings" : standings.result
            });
        });

    });

});

module.exports = router;