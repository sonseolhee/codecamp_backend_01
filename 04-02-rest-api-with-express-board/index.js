import express from 'express'
const app = express()
app.use(express.json())

app.get('/boards', function (req, res) {
  // 데이터를 조회하는 로직 => DB에서 꺼내옴

  // res.send('조회에 성공하였습니다.')
  res.send([
    { number: 1, writer: '철수', title: "제목입니다.", contents: "내용입니다~" },
    { number: 2, writer: '영희', title: "영희 제목이에요~", contents: "좋은 날씨입니다!" },
    { number: 3, writer: '훈이', title: "훈이 제목이에요!", contents: "안녕하세요?" }
  ])
})

app.post('/boards', function (req, res) {
  // 데이터를 등록하는 로직 => DB에다 저장함

  // console.log(req)
  console.log(req.body)

  res.send('등록에 성공하였습니다.')
})

app.listen(3001)