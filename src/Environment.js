function Environment (parent){
   this.parent = parent;
   this.table = [];
}

Environment.prototype.put = function(key, symbol){
   this.table[key] = symbol;
};

Environment.prototype.get = function(key){
   for(var e = this; e; e = this.parent){
      if(e.table[key]){
         return e.table[key];
      }
   }
   return null;
};


