export interface MessageType{
    id:string,
    type:string,
    sender_id:string,
    receiver_id:string,
    message_text:string,
    createTime:string,
    is_read:number,
}

export interface chatMessageType{
    key:string,
    messages:Array<MessageType>,
    participants:Array<string>,
    userID:string,
    uname:string,
}