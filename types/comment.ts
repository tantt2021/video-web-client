export interface CommentType{
    content:string,
    createTime:string,
    downvotes:number,
    dynamic_id:string,
    id:string,
    parent_id:string,
    type:string,
    upvotes:number,
    user_id:string,   
    uname:string,
    avatar:string,
    sonComment:CommentType[],
    reply_username?: string,  // 构建子评论数组时给子评论设置父评论用户名
    reply_user_id:string,
}