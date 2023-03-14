import { getRegister, getLogin } from "@/api/login";
const useUserStore = defineStore('user', () => {
    let username = ref("");
    let password = ref('');
    let description = ref('');
    let birth = ref(0);
    let sex = ref('');
    let likeCount = ref(0);
    let views = ref(0);
    let createTime = ref('');
    async function login(object: any) {
        let res = await getLogin(object);
        if (res.data !== null) {
            username.value = res.data.uname;
            description.value = res.data.description;
            birth.value = res.data.birth;
            sex.value = res.data.sex;
            likeCount.value = res.data.likeCount;
            views.value = res.data.views;
            createTime.value = res.data.createTime;
        }
        return res;
    }
    async function register(object: any) {
        let res = await getRegister(object);
        if (res.data !== null) {
            username.value = res.data.uname;
            description.value = res.data.description;
            birth.value = res.data.birth;
            sex.value = res.data.sex;
            likeCount.value = res.data.likeCount;
            views.value = res.data.views;
            createTime.value = res.data.createTime;
        }
        return res;
    }
    function logout() {
        // 清除cookie
        username.value = "";
        description.value = "";
        birth.value = 0;
        sex.value = "";
        likeCount.value = 0;
        views.value = 0;
        createTime.value = "";
    }
    return { username, password, description, sex, likeCount, views, birth, createTime, login, logout, register };
},
    {
        // 持久化存储
        persist: true,
        //     persist: {
        //         enabled: true,  // ??
        //         strategies: [
        //             {
        //                 key: 'counter',
        //                 storage: process.client ? localStorage : null
        //             }
        //         ],
        //     }
    }
)

export default useUserStore;