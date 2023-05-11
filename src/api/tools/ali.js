import request from '@/utils/request'

export function get() {
  return request({
    url: 'api/ali-storage/config',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/ali-storage/config',
    data,
    method: 'put'
  })
}

export function download(id) {
  return request({
    url: 'api/ali-storage/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: 'api/ali-storage/synchronize',
    method: 'post'
  })
}

export function del(ids) {
  return request({
    url: 'api/ali-storage',
    method: 'delete',
    data: ids
  })
}

export default { del, download, sync }
