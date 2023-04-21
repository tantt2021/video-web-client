
import { createPinia } from 'pinia'
// import { Context } from '@nuxt/types'

const pinia = createPinia();

// export default function defineNuxtRouteMiddleware(){
//     return async function piniaMiddleware(context:any,to:any,from:any){
//         console.log(to,from);
        
//         context.app.pinia = pinia;
//         console.log(context.app.pinia,"pinia");
        
//         await context.next();
//     }
// }
export default defineNuxtRouteMiddleware((to:any, from:any) => {
    // console.log(to);    
    // console.log(to.path);
    // console.log(from.path);
    
    // navigateTo(to.path);
})
