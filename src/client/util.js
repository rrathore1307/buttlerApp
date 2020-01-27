export const dataPrepare = ()=> {
  

    const cdata =  [
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

   const butlers = [
        {
            requests: ['abc', 'zzz']
        },
        {
            requests: ['def','ghi']
        }
    ]

    const headers = ['1', '2']
    let newData ={}
    cdata.map((el,index)=>{
        
        newData[el.requestId] = el
        
    })
    const butlersReq = [...butlers];
    butlersReq.map(item => {
        if(item.requests) {
            item.requests.map(req => {
               const reqData = cdata.filter(option => option.requestId === req);
            if(reqData) {
                item[req] = reqData[0].hours;
            }
            return null;
            });
        }
        return null;
    });
console.log('butlersReq', butlersReq);
    // console.log(newData)
    headers.map(head=>{
        console.log(head)
        butlers.map(bt=>{
            bt.requests.map(req=>{
               const clObj = newData[req]
                if(clObj.clientId==head) {
                    // console.log(clObj.hours)
                }
            })
        })
    })


      return  {headers: headers, butlers: butlers, newData: newData}
}