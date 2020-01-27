const express = require('express');
const os = require('os');
// const allocatAndReports = require('./process')
const app = express();
var cors = require('cors');
var bodyparser = require('body-parser');

const allocatAndReports = (arr) => {
    // Try edit message
    const arr2 = [
        {
            clientId: 1,
            requestId: 'r1',
            hours: 5,
        },
        {
            clientId: 2,
            requestId: 'r2',
            hours: 1
        },
        {
            clientId: 1,
            requestId: 'r3',
            hours: 2
        },
        {
            clientId: 1,
            requestId: 'r9',
            hours: 2
        },
        {
            clientId: 2,
            requestId: 'r4',
            hours: 4
        },
        {
            clientId: 2,
            requestId: 'r5',
            hours: 5
        },
        {
            clientId: 3,
            requestId: 'r6',
            hours: 4
        },
        {
            clientId: 3,
            requestId: 'r7',
            hours: 5
        },
        {
            clientId: 2,
            requestId: 'r8',
            hours: 3
        }

    ]

    const arr1 = [{
        clientId: 1,
        requestId: 'abc',
        hours: 6
    },
    {
        clientId: 2,
        requestId: 'ghi',
        hours: 1
    },
    {
        clientId: 1,
        requestId: 'def',
        hours: 4
    },
    {
        clientId: 1,
        requestId: 'zzz',
        hours: 2
    }]

    const arr3 = [{
        clientId: 1,
        requestId: 'q',
        hours: 4
    },
    {
        clientId: 2,
        requestId: 's',
        hours: 1
    },
    {
        clientId: 1,
        requestId: 'r',
        hours: 2
    }]

    const arr6 = [
        {
            clientId: 1,
            hours: 6,
            requestId: 'r1'
        },
        {
            clientId: 1,
            hours: 4,
            requestId: 'r2'
        },
        {
            clientId: 1,
            hours: 1,
            requestId: 'r3'
        },
        {
            clientId: 1,
            hours: 1,
            requestId: 'r4'
        },
        {
            clientId: 1,
            hours: 2,
            requestId: 'r5'
        },
        {
            clientId: 2,
            hours: 1,
            requestId: 'r6'
        },
        {
            clientId: 2,
            hours: 2,
            requestId: 'r7'
        },
        {
            clientId: 2,
            hours: 3,
            requestId: 'r8'
        }

    ]

    const arr27 = [{
        clientId: 1,
        requestId: 'r1',
        hours: 5
    },
    {
        clientId: 1,
        requestId: 'r2',
        hours: 2
    },
    {
        clientId: 2,
        requestId: 'r3',
        hours: 4
    },
    {
        clientId: 2,
        requestId: 'r4',
        hours: 4
    },
    {
        clientId: 2,
        requestId: 'r5',
        hours: 1
    },
    {
        clientId: 3,
        requestId: 'r6',
        hours: 8
    }
    ]

    const arr25 = [
        {
            clientId: 1,
            requestId: 'abc',
            hours: 6
        },
        {
            clientId: 2,
            requestId: 'ghi',
            hours: 1
        },
        {
            clientId: 1,
            requestId: 'def',
            hours: 4
        },
        {
            clientId: 1,
            requestId: 'zzz',
            hours: 2
        }
    ]

    let newArr = []

    let groupBy = arr.reduce((r, a) => {
        r[a.clientId] = [...r[a.clientId] || [], a];
        return r;
    }, {});

    let butlerArr = []
    let butlerFinalArr = []
    let remainButlerArr = []
    for (const property in groupBy) {
        let innerArr = groupBy[property].sort((a, b) => {
            return b.hours - a.hours;
        })

        let outcome_hours = 0;

        let localArr = []
        let complete = false;
        let tempArr = [];
        innerArr.map((item) => {

            butlerArr.length > 0 && butlerArr.map((butler) => {
                if (!butler.complete && butler.total_hours) {

                    outcome_hours = butler.total_hours + item.hours;
                    if (outcome_hours <= 8) {
                        if (butler.requeset.indexOf(item.requestId) < 0) {
                            butler.total_hours = butler.total_hours + item.hours
                            if (butler.total_hours == 8) {
                                butler.complete = true;
                            }
                            butler.requeset.push(item.requestId)
                            item.isComplete = true;
                        }
                    }
                }
            })

            outcome_hours = outcome_hours + item.hours;

            if (!item.isComplete) {
                if (outcome_hours <= 8) {
                    localArr.push(item.requestId);
                    tempArr.push(item);
                } if (outcome_hours > 8) {
                    if (remainButlerArr.findIndex(element => element.requestId == item.requestId) < 0) {
                        remainButlerArr.push(item)
                    }
                    outcome_hours -= item.hours;
                }
            }

        })

        //
        if (localArr.length > 0) {
            let sum = 0;
            tempArr.forEach((ele, ind) => {
                sum = sum + ele.hours
            })

            if (sum == 8) {
                complete = true
            }
            butlerArr.push({ requeset: localArr, complete: complete, total_hours: sum });
        }

        outcome_hours = 0;
        remainButlerArr.map((remainBtlItem, index1) => {
            outcome_hours = 0;
            let butlerIndex = butlerArr.findIndex(element => element.complete == false)
            if (butlerArr[butlerIndex]) {
                outcome_hours = butlerArr[butlerIndex].total_hours + remainBtlItem.hours;

                if (outcome_hours <= 8) {
                    if (butlerArr[butlerIndex].requeset.indexOf(remainBtlItem.requestId) < 0) {
                        butlerArr[butlerIndex].total_hours = butlerArr[butlerIndex].total_hours + remainBtlItem.hours
                        if (butlerArr[butlerIndex].total_hours == 8) {
                            butlerArr[butlerIndex].complete = true;
                        }
                        butlerArr[butlerIndex].requeset.push(remainBtlItem.requestId);
                        outcome_hours = 0;
                    }
                    tempArr.push(remainBtlItem);
                    remainButlerArr.splice(index1, 1)
                } else if (outcome_hours > 8) {
                    if (remainButlerArr.findIndex(element => element.requestId == remainBtlItem.requestId) < 0) {
                        remainButlerArr.push(remainBtlItem)
                    }
                    outcome_hours -= remainBtlItem.hours;
                }
            }
        })


    }
    let remainSum = 0;
    let remainLocal = []
    let remainTemp = []
    function remainButlerfunc() {
        remainSum = 0;
        remainLocal = [];
        remainTemp = [];
        remainSumPre = 0
        if (!remainButlerArr.length) {
            return true;
        } else {
            remainButlerArr.map((remainButlerItemR, index) => {

                remainSumPre = remainSum;
                butlerArr.length > 0 && butlerArr.map((butler, bIndex) => {

                    if (!butler.complete && butler.total_hours && !remainButlerItemR.isComplete) {
                        remainSumPre = butler.total_hours + remainButlerItemR.hours;

                        if (remainSumPre <= 8) {
                            if (butler.requeset.indexOf(remainButlerItemR.requestId) < 0) {
                                butler.total_hours = butler.total_hours + remainButlerItemR.hours
                                if (butler.total_hours == 8) {
                                    butler.complete = true;
                                }
                                butler.requeset.push(remainButlerItemR.requestId)
                                remainButlerItemR.isComplete = true;
                            }
                            remainButlerArr.splice(index, 1)
                        } else {
                            remainSum = 0;
                        }
                    }
                })
                remainSum = remainSum + remainButlerItemR.hours;
                if (!remainButlerItemR.isComplete) {
                    if (remainSum <= 8) {
                        remainLocal.push(remainButlerItemR.requestId)
                        remainTemp.push(remainButlerItemR);
                        remainButlerArr.splice(index, 1)

                    } else {
                        remainButlerArr.push(remainButlerItemR)
                    }
                }

            })
            if (remainLocal.length > 0) {
                let sum = 0;
                let complete = false;
                remainTemp.forEach((ele, ind) => {
                    sum = sum + ele.hours
                })

                if (sum == 8) {
                    complete = true
                }
                butlerArr.push({ requeset: remainLocal, complete: complete, total_hours: sum });
            }
            return remainButlerfunc();
        }


    }
    remainButlerfunc();
    if (remainLocal.length > 0) {
        let sum = 0;
        let complete = false;
        sum = remainTemp.reduce((a,b)=>{
            return a.hours + b.hours
        })
        remainTemp.forEach((ele, ind) => {
            sum = sum + ele.hours
        })

        if (sum == 8) {
            complete = true
        }
        butlerArr.push({ requeset: remainLocal, complete: complete, total_hours: sum });
    }

    butlerFinalArr = butlerArr.map(element=>{
        return {requests: element.requeset}
    })
    return butlerFinalArr;
}

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.post('/api/client-request', function(req, res) {
    let data = req.body

    let finalResponse = allocatAndReports(data.data)

	if (finalResponse) {

		res.status(200).json({
			message: 'success response',
			data: finalResponse,
		});
	} else {
		res.status(200).json({
			message: 'Data Not found.',
		});     
	}
});
app.get('/butler-response',function(req,res){
    let data= req.data
    if (data) {
		res.status(200).json({
			message: 'success response',
			data: data,
		});
	} else {
		res.status(200).json({
			message: 'Data Not found.',
		});     
	}

}) ;

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
