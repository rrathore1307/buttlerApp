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