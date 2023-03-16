// 判断为空
export const isNull = (account: string, pwd: string) => {
    return account === "" || pwd === "" ? true : false;
}
  
// 或许可以用柯里化
export  const check = (userName:string,password:string) => {
    let emailReg =
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    //长度为8~14;字母数字以及标点符号至少包含2种;不允许有空格、中文
    let pwdReg =
      /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/;
    if (emailReg.test(userName) === false) {
      return "邮箱格式错误";
    } else if (!pwdReg.test(password.trim())) {
      return "密码格式错误";
    } else {
      return "格式正确";
    }
};
  
// 可验证邮箱和密码
export const CHECK = (data: string, target: string) => {
  let emailReg =
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
    //长度为8~14;字母数字以及标点符号至少包含2种;不允许有空格、中文
  let pwdReg =
      /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,14}$/;
  if (data === 'email') {
    return emailReg.test(target.trim());
  } else if (data === 'password') {
    return pwdReg.test(target.trim());
  }
}