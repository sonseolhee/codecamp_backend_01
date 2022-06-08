import axios from 'axios'

function fetchPost(){
    const result = axios.get('https://koreanjson.com/posts/1')
    console.log(result) // Promise { <pending> }
}

async function fetchPost2(){
    const result = await axios.get('https://koreanjson.com/posts/1')
    console.log(result.data) // 실제데이터
}

fetchPost2()