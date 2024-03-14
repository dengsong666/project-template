import axios from 'axios'
import dayjs from 'dayjs'
import http from './http'

// export function getZTB(params:{date:string}) {
//   http.get({
//     url: '',
//     params
//   })
// }
export async function getZTB(date = '20231102') {
  let start: any = '2023-09-02'
  let arr = []
  while (dayjs(start).isBefore(dayjs())) {
    const date = dayjs(start).add(1, 'day').format('YYYYMMDD')
    const res = await axios.get(`https://push2ex.eastmoney.com/getTopicZTPool?ut=7eea3edcaed734bea9cbfc24409ed989&dpt=wz.ztzt&Pageindex=0&pagesize=20&sort=fbt%3Aasc&date=${date}`)
    const lbs = res.data?.data?.pool?.[0]?.lbc
    lbs && arr.push({ date, lbs })
    start = date
  }
  console.log(arr)

}
