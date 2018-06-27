 import Vue from 'vue'

Vue.prototype.trim = function(s){   
    s = s.replace(/\s+/g, "");
    s = s.replace(/<\/?.+?>/g,""); 
    s = s.replace(/[\r\n]/g, "");
    return s;    
}  



