const process = require('process')
const app = require('express')()

app.use((req, res, next) => {
  console.log(process.env.PASSWORD)
  next()
})

app.get("/", (req, res, next) => {
  res.send("Hello World!")
})

app.get("/api/:n", (req, res, next) => {
  let n = parseInt(req.params.n)
  let count = 0
  
  if (n > 5000000000) n = 5000000000
  
  for (let i = 0; i <= n; i++) {
    count += i
  }
  
  console.log(`Worker ${process.pid}: ${count}`)
  res.send(`Final count is ${count}`)
})

const run = () => {
  app.listen(3000, () => {
    console.log(`App listening on port ${3000}, worker thread ${process.pid}`);
  })
}

module.exports = run