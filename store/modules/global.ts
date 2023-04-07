const useGlobalStore = defineStore("global",()=>{
    let record = ref(true);
    const handleTest = () =>{
        record.value = !record.value;
        console.log(record.value,"record");        
    }
    return {record,handleTest};

    
}
)

export default useGlobalStore;