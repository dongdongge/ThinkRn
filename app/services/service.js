
import * as AppClient from '../common/AppClient'

export const examplePostFile = async ({formData,token})=>{
  return AppClient.POSTFile(AppClient.BaseServer+'/',formData,token);
};
export const examplePost = async ({params}) =>{
  return AppClient.POST(AppClient.BaseServer, params)
};
// 自查管理员和监督管理员的登录认证接口
export const exampleGET = async (params) =>{
  return AppClient.GET(AppClient.BaseServer+"/login", params)
};
export const examplePUT = async ({token,params})=>{
  return AppClient.PUT(AppClient.BaseServer+'',params,token);
};
export const examplePUTFile = async ({token,params})=>{
  return AppClient.PUT(AppClient.BaseServer+'',params,token);
};