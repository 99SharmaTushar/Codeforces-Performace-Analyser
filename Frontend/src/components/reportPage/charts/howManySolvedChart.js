import {Component} from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip} from "recharts";

// const data = [
//   { name: "Group A", value: 400 },
//   { name: "Group B", value: 300 },
//   { name: "Group C", value: 300 },
//   { name: "Group D", value: 200 }
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#52D726", "#FFEC00", "#FF7300", "#007ED6", "#7CDDDD"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default class NumberChart extends Component {
  render(){
      const {numOfSolved,youSolved} = this.props;
      var data = new Array(numOfSolved.length);
      numOfSolved.forEach((num,index) => {
        var str = " problem";
          if(index>=1)
            str+="s";
          data[index] = {
              name: "Solved "+ ++index + str + " in total",
              value: num
          }
      });

      return (    
        <div style={{ width: "100%", height: 400, flex:"1" ,align: "center"}}>
        <ResponsiveContainer>
            <PieChart width="100%" height={400}>
            <Pie
                data={data}
                cx="50%" //change cx and cy to adjust the position of pie chart
                cy="50%"
                labelLine={true}
                // label={renderCustomizedLabel}
                label = "value"
                outerRadius="76%"
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
            >
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={(index+1)===youSolved?"#be3ee6":COLORS[index % COLORS.length]}/>
                ))}

            </Pie>
            <Pie
                data={data}
                cx="50%" //change cx and cy to adjust the position of pie chart
                cy="50%"
                labelLine={true}
                label={renderCustomizedLabel}
                outerRadius="76%"
                fill="#8884d8"
                paddingAngle={3}
                dataKey="value"
            >{data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={(index+1)===youSolved?"#be3ee6":COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            </PieChart>
            
        </ResponsiveContainer>
        <span style={{display:"inline-block",width:"20px",height:"14px",border:"1px dotted purple",backgroundColor:"#be3ee6"}}></span><span style={{color: "purple"}}>&nbsp;You Solved</span><br/>
        <em><i>Number of Contestants <u>VS</u> Total number of Problems Solved</i></em>
        </div>

        );
    }
}
