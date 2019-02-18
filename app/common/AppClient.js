
import qs from 'qs';
import {Toast} from "antd-mobile-rn";
import _ from 'lodash';
export const BaseServer = "http://192.168.22.137:8081";
// 超时时间
const MAX_WAITING_TIME = 10000;

export const GET = (serverName, params) => {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {reject({ERR_MSG: '请求超时,请重试。', ERR_CODE: '400'})}, MAX_WAITING_TIME);
        let realURL = serverName + "?" + qs.stringify(params);
        log("HTTP-GET", realURL);
        fetch(realURL, {method: "GET", headers: {"Content-type": "application/json; charset=UTF-8"}})
            .then((response) => {return response.json()})
            .then((resJson) => {
                log("HTTP-GET-返回", resJson);
                (resJson.status === 0) ? resolve(resJson.data) : reject(resJson.data || resJson.result);
                clearTimeout(timeout);
            }).catch((err) => {
            reject({ERR_MSG: '网络连接错误，请检查您的网络连接或稍后再试。', ERR_CODE: '400'})
        })
    }).catch((err)=>{
        Toast.offline(err.ERR_MSG);
        log("HTTP-GET-错误", err);
    })
};
export const POST = (serverName, body) => {
    // let defaultHeaders = {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"};
    return realRequest(serverName, "POST", "", body);
};

export const POSTFile = (serverName, formData, token) => {
    let defaultHeaders = {'Content-Type': 'multipart/form-data'};
    let headersTemp = token ? _.assign(defaultHeaders, {Authorization: "bearer " + token}) : defaultHeaders;
    return realRequest(serverName, "POST", headersTemp, formData);
};

export const PUT = (serverName, params) => {
    return realRequest(serverName, "PUT", "", JSON.stringify(params));
};
export const PUTFile = (serverName, formData, token) => {
    let defaultHeaders = {'Content-Type': 'multipart/form-data'};
    let headersTemp = token ? _.assign(defaultHeaders, {Authorization: "bearer " + token}) : defaultHeaders;
    return realRequest(serverName, "PUT", headersTemp, formData);
};
function realRequest(url, method, headers, body) {
    let defaultHeaders = {"Content-type": "application/json; charset=UTF-8"};
    let realHeaders = headers ? _.assign(defaultHeaders, headers) : defaultHeaders;
    log("HTTP", method+"[ "+url+" ]\n"+"["+realHeaders+"]\n"+"[ "+body+" ]");
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {reject({ERR_MSG: '请求超时,请重试。', ERR_CODE: '400'})}, MAX_WAITING_TIME);
        fetch(url, {method: method, headers: realHeaders, body: body,}).then((response) => response.json())
            .then((resJson) => {
                log("HTTP-返回", body);
                resJson.status === 0 ? resolve(resJson.data) : reject(resJson.result);
                clearTimeout(timeout);
            }).catch((err) => {
            log("HTTP-错误", err);
            reject({ERR_MSG: '网络连接错误，请检查您的网络连接或稍后再试。', ERR_CODE: '400'})
        })
    });
}


