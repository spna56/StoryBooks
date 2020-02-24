module.exports={
    truncate:function(str,len){
        if(str.length>len&&str.length>0){
            var new_str="str"+"..."
                new_str=str.substr(0,len)
                new_str=str.substr(0,new_str.lastIndexOf(" "));
                new_str=(new_str.length>0)?new_str:str.substr(0,len);
                return new_str+"...";
        }
        return str;

        },
        striptags: function(){
           return input.replace(/<(?:.|\n)*?>/gm,'')  //removing the line breaks and other tags that might appear also gm signifies that replacement should happen over many line and it should happen more than once
        }
    }
