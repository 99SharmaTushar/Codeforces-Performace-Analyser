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
            
            // var index = ratingChange.findIndex(obj => {
            //     let str = obj.handle;
            //     let str2 = userHandle;
            //     return str.toUpperCase() === str2.toUpperCase();
            // });
            
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

            res.redirect(urlx.format({
                pathname:"/contest/standings/",
                query: {
                    "contestId": contestId,
                    "totalParticipants" : totalParticipants,
                    "userHandle" : userHandle,
                    "percentile" : percentile,
                    "averageRating" : averageRating, //rating expected at your got rank.. so u underperformed or overperformed as compared to your peers
                    //write a comment in UI that average rating works best when u r ranked in middle i.e 2.5% to 97.5% range or so
                    //give reason for the same in UI as because several low ranked accounts win, etc.. and high ranked leave (if)..etc
                    //also remember that everyone isn't intrested in reason... so plan out a way or don't show reason at all
                    "averageRank" : averageRank, //ki yeh rank aani chahiye thi tumhari.. aur aai kya exactly... compare then...
                    "yourRank" : yourRank,
                    "oldRating" : oldRating, //Show that this was ur rating before this this contest
                    "newRating" : newRating, // You gained/lost this much rating... 
                    "overallRatingChange" : [numOfInc,numOfDec,noChange]
                 }
              }));
        });
        
    });

});

router.route('/standings/').get((req,res)=>{
    const contestId = req.query.contestId;
    const userHandle = req.query.userHandle;
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
                        commentsForProblems['problemComment'] = "You should have definitely solved this problem... ";
                    }else if(diff<=-50){
                        commentsForProblems['problemComment'] = "Although, this problem was a bit hard relative to your rating";
                    }else{
                        commentsForProblems['problemComment'] = "This problem falls close to your rating skills";
                    }
                    if(attemptCount == 0)
                    {
                        commentsForProblems['attemptComment1'] = "Man !! You should have atleast given this problem a try";
                        commentsForProblems['attemptComment2'] = "Was it that you ran out of time ?? Or were you not able to figure out the solution... or something else?? Time to give it a Thought !!";
                    }else {
                        commentsForProblems['attemptComment1'] = `It's a good thing that you tried attempting it ${attemptCount} time${(attemptCount==1)?"":"s"} ... `;
                        commentsForProblems['attemptComment2'] = "These unsuccessful attempts are path to your success destination !!! "
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
                    ifProblemSolve="If you would have just solved this problem, no matter how much time you would have taken... You would have atleast been ranked "+ sum;
                    //Write a comment in UI after rendering ifProblemSolve element that see for yourself... that how much difference a single problem could make
                    //Write a same comment related to timing also...
                    //Read all the comments.. pls.. lol :=}
                }
            });

            if(Object.keys(commentsForProblems).length == 0){
                commentsForProblems['problemComment'] = "You did a great job by solving all the problems";
                commentsForProblems['attemptComment1'] = "You should just focus on 3 things: Consistency, Accuracy, & Speed !!";
                commentsForProblems['attemptComment2'] = "A piece of advise: You should try your hands on solving real world problems , as this world needs great problem solvers like you !!";
                ifProblemSolve="You are Awesome !!! This Performance Analyser would crash if it tries analysing your Performance !!";
            }

            someFacts.push("There were "+req.query.overallRatingChange[0]+" contestants who got an increase in rating & "+req.query.overallRatingChange[1]+" contestants who got a negative rating change");
            someFacts.push("There were "+req.query.overallRatingChange[2] + " contestants whose rating remained the same after the contest !!!");

            res.json({
                ...req.query,
                //Write in UI that this site also provides a Relative comparision of your performacnce .. etc
                "totalProblems" : totalProblems,
                "problemSolvedBy": problemSolvedBy,//Represent it by google chart or something... it shows how many solved problem A, how many solved problem B,etc
                "numOfProblemsSolved" : numberOfProblemsSolved,//Represent it also by google chart... it shows how many were able to solve only one problem, how many were able to solve two problems, etc...
                "youSolved": youSolved, // Tells how many problems were solved by you
                "whichSolved": whichSolved, // Tells what problems have you solved
                // IF you would have just solved this problem...even till the last minute... then you would have ranked or gained rating this this... (it shows never give up till last)
                "problems" : problems,//Use this in representing all the problems in form of google charts and tell how many solved.. whether you solved it or not .. etc
                "yourProblems": yourProblems, //Use these to make a chart type..or something else... depicting problem wise.. that these many were able to solve this problem,, were you able to solve it? yes then in green candle... no then red candle... and show the number of attempts on the top of your green / red candle....
                "commentsForProblems": commentsForProblems,
                "ifProblemSolve" : ifProblemSolve,
                "someFacts" : someFacts
                //Write it in the UI or your blog post that :
                // It is very difficult to generalise the algorithm to analyse performace, but we have given my best efforts to do so... (blah blah ki agar kuch feedback, features, help, etc ...)
            });
        });

    });

});

module.exports = router;