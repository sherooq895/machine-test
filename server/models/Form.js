const mongoose =require ('mongoose')
const Schema = mongoose.Schema;

const Formtemplate=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
   
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:Array,
        required:true
    },
    image:{
        type:String,
        required:true
    }

},{ timestamps: true})

module.exports=mongoose.model('EmployeeForm',Formtemplate)