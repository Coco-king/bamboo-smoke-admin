import request from '@/utils/request'

export function get() {
  return request({
    url: 'api/fdfs-storage/config',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: 'api/fdfs-storage/config',
    data,
    method: 'put'
  })
}

export function download(id) {
  return request({
    url: 'api/fdfs-storage/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: 'api/fdfs-storage/synchronize',
    method: 'post'
  })
}

export function del(ids) {
  return request({
    url: 'api/fdfs-storage',
    method: 'delete',
    data: ids
  })
}

export default { del, download, sync }
