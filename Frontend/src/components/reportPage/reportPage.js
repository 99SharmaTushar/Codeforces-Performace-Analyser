import React, { Component } from "react";
import "./report.css";
import Spinner from "../spinner";
import ProblemChart from "./charts/problemChart";
import NumberChart from "./charts/howManySolvedChart";
import Footer from "./../footer";

class reportPage extends Component {
  state = {
    error: "",
  };

  componentDidMount() {
    window.onbeforeunload = function () {
      return true;
    };
  }

  componentWillUnmount() {
    window.onbeforeunload = null;
  }

  render() {
    const { report = "", selectedContest, user, contests } = this.props;
    if (typeof user[0] === "undefined") {
      this.props.history.push("/");
      return (
        <div>
          <p>
            You are requested to visit the website again & Please contact the
            developer if you are reading this !
          </p>
          <p>Life is hard man ! </p>
        </div>
      );
    } else {
      return (
        <div>
          {typeof report.ifProblemSolve === "undefined" ? (
            <Spinner />
          ) : (
            <div id="paper">
              <div id="pattern">
                <div id="content">
                  <span style={{ fontSize: "1.5em" }}>
                    <b>
                      <u>PERFORMANCE REPORT</u>
                    </b>
                  </span>
                  <br />
                  <br />
                  <span style={{ float: "left", marginLeft: "7%" }}>
                    {selectedContest.contestName}
                  </span>
                  <br />
                  <span style={{ float: "left", marginLeft: "7%" }}>
                    ContestId = #{selectedContest.contestId}
                  </span>
                  <br />
                  <span
                    style={{
                      float: "left",
                      display: "block",
                      width: "92%",
                      marginLeft: "7%",
                      marginTop: "7px",
                      borderTop: "3px dashed #bbb",
                    }}
                  />
                  <span
                    style={{
                      float: "left",
                      display: "block",
                      width: "92%",
                      marginLeft: "7%",
                      marginTop: "7px",
                      borderTop: "3px dashed #bbb",
                      visibility: "hidden",
                    }}
                  />
                  <br />
                  <div>
                    <div
                      className="imageDiv"
                      style={{ float: "right", width: "30%", margin: "auto" }}
                    >
                      <img
                        style={{
                          height: "auto",
                          maxWidth: "150px",
                          borderRadius: "10%",
                          border: "3px solid #ddd",
                          marginRight: "5%",
                        }}
                        src={user[0].titlePhoto}
                        alt=""
                      />
                      <p>{user[0].rank + " " + user[0].handle}</p>
                    </div>
                    <div
                      className="belowImageDiv"
                      style={{
                        float: "left",
                        width: "60%",
                        margin: "auto",
                        textAlign: "left",
                        marginLeft: "10%",
                      }}
                    >
                      <span style={{ marginLeft: "-5%" }}>
                        Max Rating = {user[0].maxRating}
                      </span>
                      <br />
                      <span style={{ marginLeft: "-5%" }}>
                        Max Rank = {user[0].maxRank}
                      </span>
                      <br />
                      <br />
                      <u style={{ marginLeft: "-5%" }}>
                        <b>Some Stats:</b>
                      </u>
                      <br />
                      Rank = {selectedContest.rank}
                      <br />
                      Rating Change ={" "}
                      {selectedContest.newRating - selectedContest.oldRating > 0
                        ? "+"
                        : ""}
                      {selectedContest.newRating - selectedContest.oldRating}{" "}
                      <br />
                      Rating before Contest = {selectedContest.oldRating}
                      <br />
                      Rating after Contest&ensp; = {selectedContest.newRating}
                      <br />
                      You are in the top{" "}
                      {Math.round(report.percentile * 1000) / 1000}%<br />
                      Total Participants = {report.totalParticipants}
                      <br />
                      You Solved ({report.youSolved}/{report.totalProblems})
                      Problems <br />
                      <br />
                      <b>#</b> On Comparing your rating relatively with the
                      peers, You should have been ranked{" "}
                      {Math.round(report.averageRank)}, and your real rank is{" "}
                      {selectedContest.rank} :- {report.avgRankComment}
                      <br />
                      <b>#</b> The Rank you got belongs to a person with{" "}
                      {Math.round(report.averageRating)} rating, and your rating
                      was {selectedContest.oldRating} :-{" "}
                      {report.avgRatingComment}
                      <br />
                      <br />
                      "You have given {contests.contests.length} contests so
                      far, and have gained an increase in rating in{" "}
                      {contests.pos} of them.{" "}
                      {selectedContest.oldRating > selectedContest.newRating
                        ? "But,"
                        : "And,"}{" "}
                      this contest is{" "}
                      {selectedContest.oldRating > selectedContest.newRating
                        ? "not"
                        : ""}{" "}
                      one of them"
                    </div>
                  </div>
                  <br />
                  <div style={{ color: "white" }}>
                    Fill up space Fill up spaceFill up spaceFill up spaceFill up
                    spaceFill up spaceFill up spaceFill up spaceFill up
                    spaceFill up spaceFill up spaceFill up spaceFill up
                    spaceFill up spaceFill up spaceFill up spaceFill up
                    spaceFill up spaceFill up spaceFill up spaceFill up
                    spaceFill up spaceFill up spaceFill up spaceFill up
                    spaceFill up spaceFill up spaceFill up spaceFill up
                    spaceFill up spaceFill up spaceFill up spaceFill up
                    spaceFill up spaceFill up spaceFill up
                  </div>
                </div>
              </div>
              <div>
                <br />
                <em>
                  <i>
                    <b>Hover over the Charts for more Info</b>
                  </i>
                </em>
                <div className="flex-container">
                  <ProblemChart
                    problems={report.problems}
                    solvedBy={report.problemSolvedBy}
                    youSolved={report.whichSolved}
                    yourProblems={report.yourProblems}
                  />
                  <NumberChart
                    numOfSolved={report.numOfProblemsSolved}
                    youSolved={report.youSolved}
                  />
                </div>
                <br />
                <br />
                <br />
                <br />
              </div>
              <div id="pattern">
                <div
                  id="content"
                  style={{ marginLeft: "10%", textAlign: "left" }}
                >
                  <u style={{ marginLeft: "-3%" }}>
                    <b>Problem wise Analysis:</b>
                  </u>
                  <br />
                  <br />

                  {report.youSolved !== 0 ? (
                    <div>
                      "There were{" "}
                      {report.numOfProblemsSolved[report.youSolved - 1] - 1}{" "}
                      contestants out of {report.totalParticipants - 1} who
                      solved the same number of problems as you!"...(You solved{" "}
                      {report.youSolved} problem
                      {report.youSolved === 1 ? "" : "s"})<br />
                      <br />
                      <br />
                    </div>
                  ) : (
                    <span></span>
                  )}

                  {report.commentsForProblems.problemInfo && (
                    <div>
                      <b>
                        <i>
                          #{report.commentsForProblems.problemInfo.index + " "}
                          {report.commentsForProblems.problemInfo.name}:
                        </i>
                      </b>
                      <br />
                      <br />*{report.commentsForProblems.problemComment}
                      <br />
                      ->{report.commentsForProblems.attemptComment1}
                      <br />
                      ->{report.commentsForProblems.attemptComment2}
                      <br />
                      <br />
                      {report.commentsForProblems.tagsComment}
                      <ul style={{ marginTop: "0px" }}>
                        {report.commentsForProblems.tags &&
                          report.commentsForProblems.tags.map((tag, index) => {
                            return (
                              <div>
                                <li key={index + tag}>{tag}</li>
                              </div>
                            );
                          })}
                        <span
                          style={{
                            float: "left",
                            display: "block",
                            width: "92%",
                            marginLeft: "7%",
                            marginBottom: "2.3%",
                            borderTop: "3px dashed #bbb",
                            visibility: "hidden",
                          }}
                        />
                      </ul>
                    </div>
                  )}

                  <u>"{report.ifProblemSolve}"</u>
                  <br />
                  <br />
                  <br />

                  <u style={{ marginLeft: "-3%" }}>
                    <b>Some Random Facts:</b>
                  </u>
                  <br />
                  <br />
                  <ul style={{ marginTop: "0px", marginLeft: "-4%" }}>
                    {report.someFacts &&
                      report.someFacts.map((fact) => {
                        return <li key={fact}>{fact}</li>;
                      })}
                  </ul>
                  <br />

                  <span
                    style={{
                      float: "left",
                      display: "block",
                      width: "92%",
                      marginLeft: "7%",
                      marginBottom: "2.9%",
                      borderTop: "3px dashed #bbb",
                      visibility: "hidden",
                    }}
                  />
                  <span style={{ fontSize: "1.5em", float: "left" }}>
                    JUST KEEP ENJOYING THE CONTESTS !!
                  </span>
                  <span style={{ fontSize: "1.5em", float: "right" }}>
                    All the best for Everything :-)
                  </span>
                  <span
                    style={{
                      display: "block",
                      width: "92%",
                      marginLeft: "7%",
                      marginBottom: "2%",
                      borderTop: "3px dashed #bbb",
                      visibility: "hidden",
                    }}
                  />
                  <br />
                  <br />
                  <br />
                </div>
                <br />
              </div>
            </div>
          )}
          <br />
          <Footer />
          <br />
        </div>
      );
    }
  }
}

export default reportPage;
