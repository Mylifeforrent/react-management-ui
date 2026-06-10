const BAIDU_MAP_AK = 'ZTwXYu6PMq9rXBa6GpEPdEdZifgGXdCg'

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`地图脚本加载失败：${src}`))
    document.body.append(script)
  })

export const loadBMap = async () => {
  if (!window.BMapGL) {
    await loadScript(`https://api.map.baidu.com/api?type=webgl&v=1.0&ak=${BAIDU_MAP_AK}`)
  }

  await loadScript('https://mapopen.bj.bcebos.com/github/BMapGLLib/TrackAnimation/src/TrackAnimation.min.js')
  await loadScript('/TextIconOverlayGL_min.js')
  await loadScript('/MarkerClustererGL_min.js')
}
