export const GuestId = ()=>{
    let id = localStorage.getItem("guestId");
    if(!id){
        id = crypto.randomUUID();
        localStorage.setItem("guestId",id);
    }

    return id;
}