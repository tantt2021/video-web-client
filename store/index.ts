import useUserStore from "./modules/user";
import useGlobalStore from "./modules/global";

export default function useStore() {
    return {
        user: useUserStore(),
        global: useGlobalStore(),
    }
}