// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { antdTheme } from "./utils/antdTheme";
import IconsResolver from "unplugin-icons/resolver";
export default defineNuxtConfig({
    modules: [
        // '@nuxtjs/style-resources',

        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // 自动引入 `usePinia()`
                    'defineStore',
                    // 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
                    ['defineStore', 'definePiniaStore'],
                ],
            },
        ],
        '@pinia-plugin-persistedstate/nuxt',

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
        transpile: [
            "lodash-es",
            "@ant-design/icons-vue",
            "echarts",
            "graphql",
        ],
    },
    vite: {
        ssr: {
            noExternal: ["ant-design-vue", "dayjs"],
        },
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true,
                    // https://www.antdv.com/docs/vue/customize-theme/#Ant-Design-Vue-Less-variables
                    modifyVars: antdTheme(),
                },
            },
        },
        define: {
            // fixed apollo client err
            __DEV__: 'true',
        },
        plugins: [
            Components({
                resolvers: [
                    IconsResolver({
                        prefix: "Icon",
                    }),
                    // resolveIcons true will error with NITRO_PRESET=cloudflare
                    AntDesignVueResolver({ resolveIcons: true, importStyle: "less" }),
                ],
                dts: "types/components.d.ts",
            }),
        ],
        esbuild: true
            ? {}
            : {
                pure: !true ? ["console.log", "console.warn", "debugger"] : [],
                legalComments: "none",
            },
    },

})
