// const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from 'apollo-server'
import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js'

// The GraphQL schema
const typeDefs = gql`
  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Query {
    # fetchBoards: BoardReturn => 객체 1개를 의미
    fetchBoards: [BoardReturn] # => 배열 안에 객체 1개 이상
  }

  type Mutation {
    createBoard(createBoardInput: CreateBoardInput!): String
    createTokenOfPhone(myphone: String!): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: (_, args) => {
      // 데이터베이스에서 데이터를 꺼내오는 로직

      return [
        { number: 1, writer: "철수", title: "제목입니다", contents: "내용입니다~~" },
        { number: 2, writer: "영희", title: "좋은 날씨~", contents: "내용입니다~~" },
        { number: 3, writer: "훈이", title: "점심 맛있어요!", contents: "내용입니다~~" },
        { number: 4, writer: "맹구", title: "안녕하세요~", contents: "내용입니다~~" }
      ]
    }
  },

  Mutation: {
    createBoard: (_, args) => {
      // 데이터베이스에 데이터를 저장하는 로직

      console.log(args)

      return "등록에 성공하였습니다!!!"
    },

    createTokenOfPhone: (_, args) => {
      const myphone = args.myphone

      // 1. 휴대폰번호 자릿수 맞는지 확인하기
      const isValid = checkValidationPhone(myphone)
      if(isValid){
        // 2. 핸드폰 토큰 6자리 만들기
        const mytoken = getToken(4)

        // 3. 핸드폰번호에 토큰 전송하기
        sendTokenToSMS(myphone, mytoken)
      }

      return "인증완료!!!"
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(3000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});