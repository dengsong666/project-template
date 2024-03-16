export const phone = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
export const password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/;
export const email =
  /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
export const card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
export const url =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
