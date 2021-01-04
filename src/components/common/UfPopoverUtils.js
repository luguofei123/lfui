//添加事件，element-ui判断是不是服务器环境
export function on(element, event, handler){
  if(element && event && handler){
    element.addEventListener(event,handler,false);
  }
}

//移除事件
export function off(element, event, handler){
  if(element && event){
    element.removeEventListener(event, handler, false);
  }
}