const express = require('express')
var app = express()


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/views/index.html')
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('listening on port ' + port);
    
})