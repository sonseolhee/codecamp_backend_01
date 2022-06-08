import axios from 'axios'
import cheerio from 'cheerio'

async function getOpenGraph(mydata){

    const myaddress = mydata.contents.split(" ").filter((el) => el.startsWith("http"))

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

}

const mydata = {
    title: "안녕하세요~~",
    contents: "여기 정말 좋은거같아요! 한번 꼭 놀러오세요!! 여기가 어디냐면 https://naver.com 이에요!!!"
}
getOpenGraph(mydata)