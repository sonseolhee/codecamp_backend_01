import express from 'express'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc'
import { sendTokenToSMS, checkValidationPhone, getToken } from './phone.js'
import { sendTemplateToEmail, checkValidationEmail, getWelcomeTemplate } from './email.js'
import { options } from './swagger/config.js'
import { Board } from './models/board.model.js'
import dotenv from 'dotenv'
import { Stock } from './models/stock.model.js';
dotenv.config()

console.log("asdfasdfasdf")

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

app.get('/boards', async function (req, res) {
  // 데이터를 조회하는 로직 => DB에서 꺼내옴

  const result = await Board.find({ writer: "철수" })
  console.log(result)

  // res.send('조회에 성공하였습니다.')
  res.send([
    { number: 1, writer: '철수', title: "제목입니다.", contents: "내용입니다~" },
    { number: 2, writer: '영희', title: "영희 제목이에요~", contents: "좋은 날씨입니다!" },
    { number: 3, writer: '훈이', title: "훈이 제목이에요!", contents: "안녕하세요?" }
  ])
})

app.post('/boards', async function (req, res) {
  // 데이터를 등록하는 로직 => DB에다 저장함

  const myaddress = req.body.mycontents.split(" ").filter((el) => el.includes("http"))

  const html = await axios.get(myaddress[0])
  const $ = cheerio.load(html.data)
  $('meta').each((_, el) => {
      // if($(el).attr('property')){
      //     const key = $(el).attr('property').split(":")[1]
      //     console.log(key)
      // }
      const key = $(el).attr('property')?.split(":")[1]
      if(key){
          const value = $(el).attr('content')
          console.log(key, value)
      }
  })

  // console.log(html)

  // console.log(req
  console.log('안녕하세요!!222222212123123123')

  const board = new Board({ 
    writer: req.body.mywriter,
    title: req.body.mytitle,
    contents: req.body.mycontents,
    // pretitle: 
    // precontents:
    // preimage:
    // preurl:
  })
  await board.save()

  res.send('등록에 성공하였습니다.')
})

app.post('/tokens/phone', function (req, res) {
  const myphone = req.body.myphone

  // 1. 휴대폰번호 자릿수 맞는지 확인하기
  const isValid = checkValidationPhone(myphone)
  if(isValid){
      // 2. 핸드폰 토큰 6자리 만들기
      const mytoken = getToken(4)

      // 3. 핸드폰번호에 토큰 전송하기
      sendTokenToSMS(myphone, mytoken)
      res.send('인증완료!!')
  }
})

app.post("/users", function (req, res) {
  const user = req.body.user

  // 1. email이 정상인지 확인(1-존재여부, 2-@포함여부)
  const isValid = checkValidationEmail(user.email)
  if(isValid){
      // 2. 가입환영 템플릿 만들기
      const mytemplate = getWelcomeTemplate(user)

      // 3. 이메일에 가입환영 템플릿 전송하기
      sendTemplateToEmail(user.email, mytemplate)
  }
})

app.get("/stocks", async function (req, res) {

  const stocks = await Stock.find()

  res.send(stocks)

})

// 몽고DB에 접속
mongoose.connect("mongodb://my_database:27017/codecamp")

// express 서버 오픈(리슨)
app.listen(3001)