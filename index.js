const express=require('express')
const path = require('path')
const fs = require('fs')
const blockRouter = require('./router/block')
const fileData = 'db/data.json'
const calculateHash = require('./crypto/hash')


const app=express();
const port= 3000

app.use(express.json())
app.use(blockRouter)

// const node = new Object()
// node.number = 0
// node.data = "abcd"
// node.prevHash = "0000000000000000000000000000000000000000000000000000000000000000"
// const block = calculateHash(node)
// console.log(block)
// const saveData = (block) => {
//     const dataJson = JSON.stringify(block)
//     fs.writeFileSync('db/data.json',dataJson)
// }
// saveData(block)


app.listen(port,(error,value)=>{
    if(error)
    {
        throw new Error('Can not connect to the server')
    }
    console.log('Server is up on port: '+ port)
})