/*
 * @Author: zxd
 * @Date: 2021-08-15 17:00:37
 * @Description: 基于 axios 封装的请求模块
 */

import axios from 'axios'

const request = axios.create({
  baseURL: "https://conduit.productionready.io",
});

export default request