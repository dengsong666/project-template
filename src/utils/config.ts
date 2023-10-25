const mode = uni.getAccountInfoSync().miniProgram.envVersion
export const baseApi = {
  develop: 'https://api2.fishyoumusic.top/api',
  trial: 'https://api2.fishyoumusic.top/api',
  release: 'https://api.fishyoumusic.top/api'
}[mode]