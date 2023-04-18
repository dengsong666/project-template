import http from './http'

export function searchIndex(params: { input: string }) {
  http.get({
    url: '/xxx/xxx',
    params
  })
}
