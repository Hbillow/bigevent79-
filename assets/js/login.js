$(function () {
  // 去注册账号
  $("#gotoRegi").click(function () {
    // 显示注册
    $(".regiBox").show();
    // 隐藏登录
    $(".loginBox").hide();
  });

  $("#gotoLogin").click(function () {
    // 隐藏注册
    $(".regiBox").hide();
    // 显示登录
    $(".loginBox").show();
  });
  let form = layui.form;
  form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    // pass就是我们自定义的校验规则（密码）
    pass: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

    // 要求对确认密码框内容和密码框的内容保持一致
    repass: function (value, item) {
      // console.log(value, item);
      let pwd = $(".regiBox [name=password]").val();
      if (value !== pwd) {
        return "两次密码不一致";
      }
    },
  });
  $(".regiBox form").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    // axios
    axios.post("/api/reguser", data).then((res) => {
      console.log(res);
      // 实现弹窗
      if (res.data.status !== 0) {
        return layer.mag(res.data.message);
      }
      layer.msg("注册成功,请登录");
      $("#gotoLogin").click();
    });
  });
  $(".loginBox form").on("submit", function (e) {
    e.preventDefault();
    let data = $(this).serialize();
    axios.post("/api/login", data).then((res) => {
      console.log(res);
      if (res.data.status !== 0) {
        return layer.msg(res.data.massage);
      }
      localStorage.setItem("token", res.data.token);
      layer.msg("登录成功，即将跳转首页", function () {
        location.href = "=/home/index.html";
      });
    });
  });
});
