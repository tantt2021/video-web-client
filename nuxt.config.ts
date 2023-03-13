// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        // '@nuxtjs/style-resources',
        '@pinia/nuxt',
    ],
    css: [
        "ant-design-vue/dist/antd.css",
        "assets/css/common.css",
        "assets/css/global.scss",
        "assets/css/animate.css",
        "assets/css/normalize.css",
    ],
    plugins: [
        "~/plugins/ant-design-vue.ts",
    ],
    build: {
        less: {
            lessOptions: {
                modifyVars: {
                    'primary-color': '#44bc87',
                    'link-color': '#1DA57A',
                    'border-radius-base': '2px',
                },
            }
        }
    },

})
