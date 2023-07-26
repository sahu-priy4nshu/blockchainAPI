const express=require('express')
const router=new express.Router()
const fs = require('fs')
const calculateHash = require('../crypto/hash')
const { type } = require('os')
const fileData = 'db/data.json'

const getData = () => {
    const bufferData = fs.readFileSync(fileData)
    const jsonData = bufferData.toString()
    const data = JSON.parse(jsonData)
    return data 
}

const saveData = (blocks) => {
    const jsonData = JSON.stringify(blocks)
    fs.writeFileSync(fileData,jsonData)
}


router.post('/block',async (req,res)=>{

    const blocks = await getData()
        const l = blocks.length
        const prevHash = blocks[l-1].hash
        const input = req.body.data
        const newNode = {
            number: l,
            data: input,
          prevHash: prevHash
        }

        try {
            const nodeWithHash = await calculateHash(newNode);
            if (!nodeWithHash) {
              throw new Error('Nonce cannot be created');
            }
            blocks.push(nodeWithHash);
            saveData(blocks);
            res.send({message:"Block Added Successfully",nodeWithHash});
          } catch (error) {
            res.status(500).send(error.message);
          }  
      })


router.get('/block/:id',async (req,res)=>{
    try {            
        const blockNo = Number(req.params.id)
        const blocks = await getData()
        const block = await blocks.find((block) => block.number == blockNo)
        if(!block)
        throw new Error('Block not found')
        res.status(200).send(block)
        } catch (error) {
            res.status(400).send(error.message)
        }
})

router.get('/blocks',async (req,res)=>{
    try{
        const allBlocks = await getData()
        const n = allBlocks.length
        res.status(200).send({"Total Length: " :n,"Latest Hash: " :allBlocks[n-1].hash})
    }catch(e){
        res.status(404).send(e)
    }
})

module.exports=router;