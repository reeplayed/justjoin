export default (d)=>{
    const date = new Date(d)
    return Math.round((Date.now()-date)/(1000*3600*24))
}