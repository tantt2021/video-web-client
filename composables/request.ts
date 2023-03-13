export const get = async (url: string, method = 'get', params = {}) => {
    const { data: result, pending, error, refresh } = await useLazyFetch(
        url,
        {
            params,
            method
        }
    )
    return result;
}

export const post = async (url: string, method = 'post', params = {}) => {
    const { data: result } = await useLazyFetch(
        url,
        {
            params,
            method
        }
    )
    return result;
}