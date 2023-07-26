const crypto = require('crypto')
const calculateHash = (argv) => {
        const node = argv
        for( i=1; i<=1e5 ;i++)
        {
            node.nonce =i
            const s = JSON.stringify(node)
            const hash = crypto.createHash('sha256').update(s).digest('hex');
            if(hash.substr(0,2) === "00")
            {
                 node.hash = hash
                 return node
            }
        }
    }

module.exports = calculateHash