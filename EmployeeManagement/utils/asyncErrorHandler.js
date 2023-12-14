module.exports = (fun)=>{
    return (req, resp, next)=>{
         fun(req, resp, next).catch((error)=>next(error))
    }
}