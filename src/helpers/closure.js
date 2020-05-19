let flag = false

export default (func) => {
    if(!flag){
        flag = true
    }
    else{
        func()
    }
}