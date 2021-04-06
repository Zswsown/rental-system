function getVerificationCode (){
  let fourRandomNum = [];
  let codeList = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnoqrstuvwxyz'
  for (let index = 0; index < 4; index++) {
    let random = Math.floor(Math.random()*codeList.length)
    fourRandomNum.push(codeList[random])
  }
  console.log("随机验证码为：",fourRandomNum)
  return fourRandomNum.join('')
}

export { getVerificationCode }