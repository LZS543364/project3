import axios from "axios";
import { MessageBox } from "element-ui";
import router from "../router";
import Cookies from "js-cookie";

var alwaysPeddingPromise = new Promise( () => {});

export default function(option) {
        var defaultOption = {
                ...option,      //展开合并
                withCredentials: true,             //让axios发ajax请求自动携带当前页面的Cookies
                timeout: 5000                           //让axios发ajax最大请求时间为5秒，5秒内没有响应则认为请求超时
        };
        return axios(defaultOption)
        //ie9使用axios时response.data为null,但可以从response.request.responseText中去拿取返回结果
                .then(response => response.data || JSON.parse(response.request.responseText))
                .then(result => {
                        // if(result.message !== '') MessageBox.alert( result.message, { title: "提示", type: "success" });//如果有消息需要提示用户，则提示（不管是成功还是失败）
                        switch(result.status) {
                                case 200:
                                        if(result.message !== '')
                                                return MessageBox.alert( result.message, {
                                                        title: "提示",
                                                        type: "success"
                                                }).then(() => result.data);
                                        return result.data;
                                case 401:
                                        Cookies.set('target', router.history.current.fullPath);
                                        router.push("/login");
                                case 404:
                                case 199:
                                case 500:
                                default:
                                        if(result.message !== '') MessageBox.alert( result.message, { title: "提示", type: "warning" });
                                        return alwaysPeddingPromise ;// 返回了一个永远是pending的promise对象
                        }
                })
                .catch(error => {
                        MessageBox.alert( error.message,{ title:"提示", type: "error" });
                        return alwaysPeddingPromise;
                });
}

