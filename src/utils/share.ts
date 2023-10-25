/**
 * 分享好友/朋友圈
 * @param title 
 * @param params 
 * @returns 
 */
export function useShare(path: string = '', title: string = '', params: Record<string, any> = {}) {
  const strParams = (p: Record<string, any>) => Object.entries(p).map(([k, v]) => `${k}=${v}`).join('&')
  const share = reactive({ path, title, params })
  onShareAppMessage(() => ({ title: share.title, path: `${share.path}?${strParams(share.params)}` }))
  onShareTimeline(() => ({ title: share.title, query: strParams(share.params) }))
  return { share, onShareAppMessage, onShareTimeline }
}

/**
 * 分享文件
 * @param url 
 * @param name 
 */
export function shareFile(url: string, name: string) {
  const fileName = `${name}.${url.split('.').at(-1)}`
  uni.downloadFile({
    url, // 下载url
    success(res) {
      console.log(res)
      // 下载完成后转发
      uni.shareFileMessage({
        fileName,
        filePath: res.tempFilePath,
        success: console.log,
        fail: console.error,
      })
    },
    fail: console.error,
  })
}
// 保存图片到相册
export function saveToAlbum(url: string) {
  return new Promise((resolve, reject) => {
    uni.downloadFile({
      url,
      success(res) {
        uni.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(val) {
            resolve(val);
          },
          fail(err) {
            reject(err);
          },
        });
      },
      fail(err) {
        reject(err);
      },
    });
  });

}