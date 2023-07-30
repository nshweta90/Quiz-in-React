import React, { Component } from "react";


import { Button, Radio, RadioGroup, MobileStepper, Paper, Typography, Box } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

const qlist = [
    {
        id: 1,
        question: "Who is prime minister of India?",
        options: [{ ans_option: "Narendra Modi", selected: false },
        { ans_option: "Ramnath Kovind", selected: false }],
        answer: "Narendra Modi"

    },

    {
        id: 2,
        question: "Highest mountain pick cliembed so far in World?",
        options: [{ ans_option: "k2", selected: false },
        { ans_option: "Mount Everest", selected: false }],
        answer: "Mount Everest"
    },
    {
        id: 3,
        question: "Who is called father of Java?",
        options: [{ ans_option: "James Gosling", selected: false },
        { ans_option: "Charles babage", selected: false }],
        answer: "James Gosling"
    }
];

class Quiz extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            activeStep: 0,
            itemList: qlist,
            completed: false,
            disableSubmit: true,
            totalScore: 0,
            notAttempted: 0

        }
    }
    render() {   
        return (
            !this.state.completed ?
                <div classsName="question_set">
                    {this.state.itemList.map((item, index) => {
                        //console.log("index is"+index +" and activestep is " +this.state.activeStep);
                        if (this.state.activeStep - index === 0) {
                            return (
                                <div className="qItem" key={index}>
                                    <div className="qQuestion"><h2>{item.question}</h2></div>
                                    <div className="qAnswer">
                                        <RadioGroup>
                                            {item.options.map((opt, optindex) => {
                                                //   console.log(opt.ans_option);
                                                let groupname = (item.id).toString();
                                                return (
                                                    <div key={optindex}>
                                                        <Radio type="radio" 
                                                               value={opt.ans_option} 
                                                               name={groupname} 
                                                               checked={opt.selected} 
                                                               onChange={this.handleRadioButtonSelection} />
                                                        {opt.ans_option}
                                                    </div>);
                                            })}
                                        </RadioGroup>
                                    </div>
                                    <MobileStepper
                                        variant="text"
                                        steps={this.state.itemList.length}
                                        position="static"
                                        activeStep={this.state.activeStep}
                                        backButton={<Button variant="contained" onClick={this.handleBack} disabled={this.state.activeStep === 0}>Back</Button>}
                                        nextButton={this.state.activeStep === this.state.itemList.length - 1 ?
                                            <Button variant="contained" size="small" onClick={this.handleSubmit} color="success" > Submit </Button> :
                                            <Button variant="contained" size="small" onClick={this.handleNext} disabled={this.state.activeStep === this.state.itemList.length - 1}> Next
                                            </Button>} 
                                    />
                                </div>
                            )
                        } else {
                            return null;
                        }
                    })}
                </div>
                :
                <div className="result_card">
                    <Paper elevation={24} sx={{ p: 2 }}>
                        <h2 className="h2-result-heading">Your score is  {this.state.totalScore} out of {this.state.itemList.length}.</h2>
                        <h4> Questions not attempted {this.state.notAttempted}</h4>
                        <Button variant="contained" onClick={() => {
                            this.setState({
                                activeStep: 0,
                                itemList: qlist,
                                completed: false,
                                disableSubmit: true,
                                totalScore: 0,
                                notAttempted: 0
                            })
                        }}><ReplayIcon />Try again</Button>
                    </Paper>
                </div>
        )
    }


    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleBack = () => { 
        this.setState({ activeStep: this.state.activeStep - 1 }) 
    };

    handleRadioButtonSelection = (e) => {
        const newlist = this.state.itemList;
        const updatedList = newlist.map((item) => {
            console.log(item.id.toString() + "    " + e.target.name);
            if (item.id.toString() === e.target.name) {
                return {
                    ...item, options: item.options.map((opt) => {
                                var ifselected = opt.ans_option === e.target.value;
                                return {
                                    ...opt,selected: ifselected
                                }
                            })
                }
            }
            else {
                return item;
            }
        });
        this.setState({ itemList: updatedList });
    };

    handleSubmit = (e) => {
        var score = 0;
        var noattempt = 0;
        this.state.itemList.map((item, index) => {
            let questionAttempted = false;
            item.options.map((opt) => {
                if (opt.selected === true) {
                    questionAttempted = true;
                    if (opt.ans_option === item.answer) { score++ };
                }
                return opt;
            });
            if (!questionAttempted) { noattempt++ }
            return item;
        });

        this.setState({
            totalScore: score, notAttempted: noattempt, completed: true
        });
        console.log("Score : " + score + " NotAttempted : " + noattempt);
    };
}

export default Quiz;