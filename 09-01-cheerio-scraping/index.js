import axios from 'axios'
import cheerio from 'cheerio'

async function getOpenGraph(){
    const html = await axios.get("https://naver.com")
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

getOpenGraph()