import { request } from './axios'

/**
 * @description -封装User类型的接口方法
 */
export class API {       // 模块一
    /**
     * @description 用户登录
     * @param {string} username - 用户名
     * @return {HttpResponse} result
     */
    static async getSiteInfo(params) {   // 接口一
        return request('getSiteInfo', params, 'post')
    }
    static async getExchange(params) {   // 接口二
        return request('getExchange', params, 'post')
    }
    static async getFund(params) {   // 接口三
        return request('getFund', params, 'post')
    }
    static async getGuide(params) {   // 接口三
        return request('getGuide', params, 'post')
    }
    static async getFacilities(params) {   // 接口三
        return request('getFacilities', params, 'post')
    }
    static async getParty(params) {   // 接口三
        return request('getParty', params, 'post')
    }
    static async getPersonnel(params) {   // 接口三
        return request('getPersonnel', params, 'post')
    }
    static async getVip(params) {   // 接口三
        return request('getVip', params, 'post')
    }
    static async getFinancial(params) {   // 接口三
        return request('getFinancial', params, 'post')
    }
    static async getHonor(params) {   // 接口三
        return request('getHonor', params, 'post')
    }
    static async getCash(params) {   // 接口三
        return request('getCash', params, 'post')
    }
    static async getPension(params) {   // 接口三
        return request('getPension', params, 'post')
    }
    static async getNotice(params) {   // 接口三
        return request('getNotice', params, 'post')
    }
}

// export class landRelevant {     // 模块二
//     /**
//      * @description 获取地列表
//      * @return {HttpResponse} result
//      */
//     static async landList(params) {
//         return request('/land_list_info',params, 'get')
//     }
// }