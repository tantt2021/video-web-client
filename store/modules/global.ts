const useGlobalStore = defineStore("global",()=>{
    let record = ref(true);
    const handleTest = () =>{
        record.value = !record.value;
        console.log(record.value,"record");        
    }
    // 私信id
    let chatId = ref("");
    let chatUname = ref("");
    return {record,handleTest,chatId,chatUname};

    
}
)

export default useGlobalStore;