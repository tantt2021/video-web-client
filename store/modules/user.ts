import { getRegister, getLogin,getLoginByCode,getLoginByEmail } from "@/api/login";
import {getHistorys} from "@/api/history";
const useUserStore = defineStore('user', () => {
    let username = ref("");
    let password = ref('');
    let description = ref('');
    let sex = ref('');
    let likeCount = ref(0);
    let views = ref(0);
    let createTime = ref('');
    let id = ref("");
    let email = ref("");
    let pause_history = ref(0);
    async function login(object: any) {
        let res = await getLogin(object);
        if (res.data !== null) {
            username.value = res.data.uname;
            email.value = res.data.email;
            description.value = res.data.description;
            sex.value = res.data.sex;
            likeCount.value = res.data.likeCount;
            views.value = res.data.views;
            createTime.value = res.data.createTime;
            id.value = res.data.id;
            pause_history.value = res.data.pause_history;
        }
        return res;
    }
    async function register(object: any) {
        let res = await getRegister(object);
        console.log(res,"userts");
        
        if (res.data.msg === '用户已存在') {
            return res;
        } else if(res.msg === '请求成功'){
            username.value = res.data.uname;
            email.value = res.data.email;
            description.value = res.data.description;
            sex.value = res.data.sex;
            likeCount.value = res.data.likeCount;
            views.value = res.data.views;
            createTime.value = res.data.createTime;
            id.value = res.data.id;
            pause_history.value = res.data.pause_history;
            return res;
        }
        
    }
    function logout() {
        // 清除cookie
        username.value = "";
        email.value = "";
        description.value = "";
        sex.value = "";
        likeCount.value = 0;
        views.value = 0;
        createTime.value = "";
        id.value = "";
        pause_history.value = 0;
    }
    async function loginByCode(object:any) {
        let res = await getLoginByCode(object);
        return res;
    }
    async function loginByEmail(object: object) {
        let res = await getLoginByEmail(object);
        if (res.data === null) {
            return res;
        } else {
            username.value = res.data.uname;
            email.value = res.data.email;
            description.value = res.data.description;
            sex.value = res.data.sex;
            likeCount.value = res.data.likeCount;
            views.value = res.data.views;
            createTime.value = res.data.createTime;
            id.value = res.data.id;
            pause_history.value = res.data.pause_history;
            return res;
        }
    }

    
    return { username, email, password, description, sex, likeCount, views, createTime,id,pause_history, login, logout, register,loginByCode,loginByEmail };
},
    {
        // 持久化存储
        persist: true,
    }
)

export default useUserStore;