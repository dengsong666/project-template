<script lang='ts' setup>
import axios from "axios";
const fileRef = ref()
const imgUrl = ref("")
// 获取上传签名


// 使用 OSS 上传图片
const uploadFile = async () => {
  const { data: { data: oss } } = await axios.get('http://127.0.0.1:4040/oss/signature', { headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6MSwiaWF0IjoxNzEwNDIzMDU1LCJleHAiOjE3MTA0NTE4NTV9.Dw3w8Pli0CyRdL40mRk4gYVeFlsZXJkWrkwiKbcDdHc" } })
  const file = fileRef.value.files[0]
  const key = Date.now() + file.name.slice(file.name.lastIndexOf('.'));
  const formdata = new FormData()
  console.log(oss);

  // 注意参数的顺序，key 必须是第一位，表示OSS存储文件的路径
  formdata.append('key', key)
  formdata.append('OSSAccessKeyId', oss.accessId)
  formdata.append('policy', oss.policy)
  formdata.append('signature', oss.signature)
  // 文件上传成功默认返回 204 状态码，可根据需要修改为 200
  formdata.append('success_action_status', '200')
  // file 必须放在最后一位
  formdata.append('file', file)
  console.log(oss.host, formdata);

  const res = await axios.post(oss.host, formdata);
  if (res.status === 200) {
    alert('文件上传成功')
    imgUrl.value = oss.host + '/' + key
  }
}


</script>

<template>
  <input type="file" ref="fileRef" />
    <br />
    <button @click="uploadFile">上传图片</button>
    <br />
    <img :src="imgUrl" v-if="imgUrl" style="width: 300px" />
</template>

<style scoped lang='scss'></style>