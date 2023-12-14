const employeeSchema = require("../Database/model/employeeSchema");

class ApiFeature {
    constructor(query, queryObj){
        this.query = query;
        this.queryObj = queryObj
    }

    filter(){
        const copyQueryObj = {...this.queryObj};
        const queryObjKey = Object.keys(copyQueryObj);
        const schemaKey = [...Object.keys(employeeSchema.schema.obj)];
        queryObjKey.forEach((key)=>{
            if(!schemaKey.includes(key)){
                delete copyQueryObj(key);
            }
        });

        this.query = this.query.find(copyQueryObj);
        return this;
    }

    sort(){
        if(this.queryObj.sort){
            const sortBy = this.queryObj.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort("-joiningDate");
        }
        return this;
    }

    paginate(){
        const limit = this.queryObj.limit * 1 || 5;
        const page = this.queryObj.page * 1 || 1;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiFeature;