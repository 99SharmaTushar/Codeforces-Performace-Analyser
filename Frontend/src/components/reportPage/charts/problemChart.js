import {Component} from 'react';
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,Legend} from "recharts";

export default class ProblemChart extends Component {

  render(){
        
    const {problems,solvedBy,youSolved,yourProblems} = this.props;
    var data = new Array(problems.length);
    problems.forEach((problem,pos) => {
        var color="red";
      if(youSolved[pos]===1)
        color="green";
      data[pos]={
        name: problem.index,
        "solvedBy": solvedBy[pos],
        fill: color
      }
    });
var points=0,count=0;
  const getIntroOfPage = (label) => {
    // y d fk loop isn't working
  if(label==="A") {points=yourProblems[0].points;count=yourProblems[0].rejectedAttemptCount;return problems[0].name};
  if(label==="B") {points=yourProblems[1].points;count=yourProblems[1].rejectedAttemptCount;return problems[1].name};
  if(label==="C") {points=yourProblems[2].points;count=yourProblems[2].rejectedAttemptCount;return problems[2].name};
  if(label==="D") {points=yourProblems[3].points;count=yourProblems[3].rejectedAttemptCount;return problems[3].name};
  if(label==="E") {points=yourProblems[4].points;count=yourProblems[4].rejectedAttemptCount;return problems[4].name};
  if(label==="F") {points=yourProblems[5].points;count=yourProblems[5].rejectedAttemptCount;return problems[5].name};
  if(label==="G") {points=yourProblems[6].points;count=yourProblems[6].rejectedAttemptCount;return problems[6].name};
  if(label==="H") {points=yourProblems[7].points;count=yourProblems[7].rejectedAttemptCount;return problems[7].name};
  if(label==="I") {points=yourProblems[8].points;count=yourProblems[8].rejectedAttemptCount;return problems[8].name};
  if(label==="J") {points=yourProblems[9].points;count=yourProblems[9].rejectedAttemptCount;return problems[9].name};
  if(label==="K") {points=yourProblems[10].points;count=yourProblems[10].rejectedAttemptCount;return problems[10].name};
  if(label==="L") {points=yourProblems[11].points;count=yourProblems[11].rejectedAttemptCount;return problems[11].name};
  if(label==="M") {points=yourProblems[12].points;count=yourProblems[12].rejectedAttemptCount;return problems[12].name};
  if(label==="N") {points=yourProblems[13].points;count=yourProblems[13].rejectedAttemptCount;return problems[13].name};
  if(label==="O") {points=yourProblems[14].points;count=yourProblems[14].rejectedAttemptCount;return problems[14].name};
  if(label==="P") {points=yourProblems[15].points;count=yourProblems[15].rejectedAttemptCount;return problems[15].name};
  if(label==="Q") {points=yourProblems[16].points;count=yourProblems[16].rejectedAttemptCount;return problems[16].name};
  if(label==="R") {points=yourProblems[17].points;count=yourProblems[17].rejectedAttemptCount;return problems[17].name};
  if(label==="S") {points=yourProblems[18].points;count=yourProblems[18].rejectedAttemptCount;return problems[18].name};
  if(label==="T") {points=yourProblems[19].points;count=yourProblems[19].rejectedAttemptCount;return problems[19].name};
  if(label==="U") {points=yourProblems[20].points;count=yourProblems[20].rejectedAttemptCount;return problems[20].name};
  if(label==="V") {points=yourProblems[21].points;count=yourProblems[21].rejectedAttemptCount;return problems[21].name};
  if(label==="W") {points=yourProblems[22].points;count=yourProblems[22].rejectedAttemptCount;return problems[22].name};
  if(label==="X") {points=yourProblems[23].points;count=yourProblems[23].rejectedAttemptCount;return problems[23].name};
  if(label==="Y") {points=yourProblems[24].points;count=yourProblems[24].rejectedAttemptCount;return problems[24].name};
  if(label==="Z") {points=yourProblems[25].points;count=yourProblems[25].rejectedAttemptCount;return problems[25].name};
  return "";
  // life is a loop... (shit gets real when r not able to use loop)
};


    const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    
    const str = getIntroOfPage(label);
    return (
      <div className="custom-tooltip">
        <p className="label">{`Solved By : ${payload[0].value}`}</p>
        <p className="intro">{`${label} : ${str}`}</p>
        <p className="intro">{`Your Points : ${points} , Attempt Count: ${count} `}</p>
        <p className="desc">Just keep Enjoying the Contests :-)</p>
      </div>
    );
  }

  return null;
};

    return (
      <div style={{flex:"1" ,align:"center",margin:"auto",width:"100%"}}>
    <BarChart width={500} height={300} data={data} >
    {/* margin={{top: 5,right: 30,left: -20,bottom: 5}} */}
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      
      <Bar dataKey="You solved it" barSize={0} fill="Green" />
      <Bar dataKey="solvedBy" minPointSize={3} barSize={40} fill="white"  />
      <Bar dataKey="You didn't solved it" barSize={0} fill="Red" />
    </BarChart>
    </div>
  );
  }
}
