const { response } = require("express");
const router = require('express').Router();
const https = require('https');
const urlx = require('url'); 

router.route('/ratingChange/:id/:userHandle').get((req,res)=>{
    const contestId = req.params.id;
    const userHandle = req.params.userHandle;

    const url = "https://codeforces.com/api/contest.ratingChanges?contestId="+contestId;

    https.get(url,(response)=>{
        let ratingChange = '';
        response.on('data',(chunk)=>{
            ratingChange += chunk;
        });
        response.on('end',()=>{
            ratingChange = JSON.parse(ratingChange);
            ratingChange = ratingChange.result;
            var totalParticipants = ratingChange.length;
            
            var index=-1, numOfInc=0, numOfDec=0, noChange=0;
            ratingChange.forEach((item,pos)=>{
                if(item.newRating-item.oldRating>0) numOfInc++;
                else if(item.newRating-item.oldRating<0) numOfDec++;
                else noChange++;
                let str = item.handle;
                let str2 = userHandle;
                if(index==-1){
                    if(str.toUpperCase() === str2.toUpperCase()) index=pos;
                }
            });

            var percentile = ratingChange[index].rank * 100 / totalParticipants;
            var yourRank = ratingChange[index].rank;

            // Calculating Average Rating
            var averageRating = 0, start=index-200, end=index+200;
            if(start<0){
                start=0;
                end=index*2;
            } else if( end > totalParticipants){
                end = totalParticipants-1;
                start = end - 400;
            }
            for(var i = start; i<= end;i++){
                averageRating+=ratingChange[i].oldRating;
            }
            averageRating/=(end-start+1);
            
            //Calculating Average Rank
            var averageRank =0, count=0, start=index-200, end=index+200, newRating=ratingChange[index].newRating;
            oldRating=ratingChange[index].oldRating;
            if(start<0){
                start=0;
                end=index*2;
            } else if( end > totalParticipants){
                end = totalParticipants-1;
                start = end - 400;
            }
            for(var i = start; i<= end;i++){
                if(Math.abs(ratingChange[i].oldRating-oldRating)<=100){
                    averageRank+=ratingChange[i].rank;
                    count++;
                }
            }
            if(count!=0) averageRank/=count;

            var avgRankComment = "";
            if(Math.abs(averageRank-yourRank)<=5){
                avgRankComment="So, your performace was decent, as far as your rank in concerned.";
            }else if(averageRank-yourRank>-5){
                avgRankComment="So, you performed better than the expectations, as far as your rank in concerned.";
            }else {
                avgRankComment="So, your performance didn't matched with the expectations, as far as your rank in concerned.";
            }

            var avgRatingComment = "";
            if(Math.abs(averageRating-oldRating)<=20){
                avgRatingComment="So, your rank resonates with your rating.";
            }else if(averageRating-oldRating>20){
                avgRatingComment="So, you definitely performed better than peers of same rating as yours.";
            }else{
                avgRatingComment="So, you could have performed a bit better as compared to the peers having same rating as yours.";
            }


            res.redirect(urlx.format({
                pathname:"/contest/standings/",
                query: {
                    "contestId": contestId,
                    "totalParticipants" : totalParticipants,
                    "userHandle" : userHandle,
                    "percentile" : percentile,
                    "averageRating" : averageRating, //rating expected at your got rank.. so u underperformed or overperformed as compared to your peers
                    "averageRank" : averageRank, //ki yeh rank aani chahiye thi tumhari.. aur aai kya exactly... compare then...
                    "yourRank" : yourRank,
                    "oldRating" : oldRating,
                    "newRating" : newRating,
                    "overallRatingChange" : [numOfInc,numOfDec,noChange],
                    "avgRankComment" : avgRankComment,
                    "avgRatingComment" : avgRatingComment
                 }
              }));
        });
        
    });

});

router.route('/standings/').get((req,res)=>{
    const contestId = req.query.contestId;
    const userHandle = req.query.userHandle;
    const rank = req.query.yourRank;
    oldRating=req.query.oldRating;

    const url = "https://codeforces.com/api/contest.standings?contestId="+contestId;

    https.get(url,(response)=>{
        let standings = '';
        response.on('data',(chunk)=>{
            standings += chunk;
        });
        response.on('end',()=>{
            standings = JSON.parse(standings);
            standings = standings.result;

            var totalProblems = standings.problems.length;
            var index = -1;
            var problemSolvedBy = new Array(totalProblems);
            var numberOfProblemsSolved = new Array(totalProblems);
            var whichSolved = new Array(totalProblems);
            var someFacts = new Array();
            
            var problems = standings.problems;
            for(var i=0;i<totalProblems;i++){
                problemSolvedBy[i]=0;
                numberOfProblemsSolved[i]=0;
                whichSolved[i]=0;
            }
            standings.rows.forEach((element,pos) => {
                let str = element.party.members[0].handle;
                let str2 = userHandle;
                if(str.toUpperCase() == str2.toUpperCase()) index = pos;
                var count = 0;
                element.problemResults.forEach((item,index) => {
                    if(item.points !== 0) {
                        problemSolvedBy[index]++;
                        count++;
                    }
                });
                if(count)numberOfProblemsSolved[--count]++;

            });

            someFacts.push("There were "+numberOfProblemsSolved[totalProblems-1]+" contestants who were able to solve all the problems !!");

            var youSolved=0;
            standings.rows[index].problemResults.forEach((item,ind)=>{
                if(item.points !=0) {
                    youSolved++;
                    whichSolved[ind] = 1;
                }
            });

            var commentsForProblems = new Map();
            var flag=0;
            var yourProblems = standings.rows[index].problemResults;
            whichSolved.forEach((item,pos) => {
                if(flag==0&&item==0){
                    flag=1;
                    var diff = oldRating - problems[pos].rating;
                    var attemptCount = standings.rows[index].problemResults[pos].rejectedAttemptCount;
                    commentsForProblems['problemInfo'] = { "index" : problems[pos].index, "name" : problems[pos].name};
                    if(diff>=50){
                        commentsForProblems['problemComment'] = "You should have definitely solved this problem...(based on your Ratings)";
                    }else if(diff<=-50){
                        commentsForProblems['problemComment'] = "Although, this problem was a bit hard relative to your rating";
                    }else{
                        commentsForProblems['problemComment'] = "This problem falls close to your skills... (based on your Ratings)";
                    }
                    if(attemptCount == 0)
                    {
                        commentsForProblems['attemptComment1'] = "Hey !! You should have atleast given this problem a try";
                        commentsForProblems['attemptComment2'] = "Was it that you ran out of time ?? Or were you not able to figure out the solution... or something else?? Time to give it a Thought !!";
                    }else {
                        commentsForProblems['attemptComment1'] = `It's a good thing that you tried attempting it ${attemptCount} time${(attemptCount==1)?"":"s"} ... `;
                        commentsForProblems['attemptComment2'] = "These unsuccessful attempts are path to your success !!! "
                    }
                    commentsForProblems['tagsComment'] = "You are strongly advised to solve problems of the following tags:";
                    commentsForProblems['tags'] = problems[pos].tags;
                    var sum=0,factSum=0;
                    numberOfProblemsSolved.forEach((item,place)=>{
                        if(place>=pos){
                            sum+=numberOfProblemsSolved[place];
                        }
                        factSum+=numberOfProblemsSolved[place];
                    });
                    var zeroSum = req.query.totalParticipants-factSum;
                    someFacts.push("There were "+ zeroSum +" contestants who weren't able to solve a single problem !!");
                    ifProblemSolve="If you would have just solved this problem, no matter how much time you would have taken... You would have atleast been ranked "+ (++sum);
                    if(sum>rank){
                        ifProblemSolve+=" (:-? We Can't understand how come you are ranked what you are ranked... Consider yourself Lucky!!)"
                    }
                    
                }
            });

            if(Object.keys(commentsForProblems).length == 0){
                commentsForProblems['problemComment'] = "You did a great job by solving all the problems";
                commentsForProblems['attemptComment1'] = "You should just focus on 3 things: Consistency, Accuracy, & Speed !!";
                commentsForProblems['attemptComment2'] = "A piece of advise: You should try your hands on solving real world problems , as this world needs great problem solvers like you !!";
                ifProblemSolve="You are Awesome !!! This Performance Analyser would crash if it tries analysing your Performance !!";
            }

            someFacts.push("There were "+req.query.overallRatingChange[1]+" contestants who got a negative rating change :-( & "+req.query.overallRatingChange[0]+" contestants who got an increase in rating :-)");
            someFacts.push("There were "+req.query.overallRatingChange[2] + " contestants whose rating remained the same after the contest!");

            res.json({
                ...req.query,
                "totalProblems" : totalProblems,
                "problemSolvedBy": problemSolvedBy,
                "numOfProblemsSolved" : numberOfProblemsSolved,
                "youSolved": youSolved,
                "whichSolved": whichSolved,
                "problems" : problems,
                "yourProblems": yourProblems,
                "commentsForProblems": commentsForProblems,
                "ifProblemSolve" : ifProblemSolve,
                "someFacts" : someFacts
            });
        });

    });

});

module.exports = router;