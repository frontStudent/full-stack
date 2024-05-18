// 获取地址栏参数
export function getUrlParameter(argName:string) {
  var url = window.location.href;
  var params = {};
  // 如果url中包含?说明有参数
  if (url.indexOf("?") !== -1) {
    // 暂时注释
    // if (!argName) return '?' + url.split('?')[1]
    // 获取所有参数options: 如?a=1&b=2转为['a=1','b=2']
    var options = url.split("?")[1].split("&");
    if (options.length) {
      for (var i = 0; i < options.length; i++) {
        // 获取单项option: 如'a=1'转为['a', '1']
        var option = options[i].split("=");
        if (option.length === 2) {
          if (argName) {
            if (argName === option[0]) return option[1];
          } else {
            params[option[0]] = option[1];
          }
        }
      }
    }
  }
  if (Object.keys(params).length) return params;
  return "";
}
