describe("A class which implements a  symbol table", function(){

   it("Should have a value after add a value", function(){
      var env = new Environment();
      env.put("a","1");
      expect(env.table["a"]).toBe("1");
   });

   it("Should return a value when looking for a previously added value", function(){
      var env = new Environment();
      env.put("a","1");
      expect(env.get("a")).toBe("1");
   });

   it("Should return a value from parent Environment when looking for inexitent added value", function(){
      var env1 = new Environment();
      env1.put("a","1");
      var env2 = new Environment(env1);
      env2.put("b","2");
      expect(env2.get("a")).toBe("1");
      expect(env2.get("b")).toBe("2");
   });

   it("Should return a value from own Environment when looking for existant value", function(){
      var env1 = new Environment();
      env1.put("a","1");
      env1.put("b","2");
      var env2 = new Environment(env1);
      env2.put("a","2");
      var env3 = new Environment(env1);
      env3.put("a","3");
      expect(env1.get("a")).toBe("1");
      expect(env2.get("a")).toBe("2");
      expect(env3.get("a")).toBe("3");
   });

   it("Should return a value from parent Environment when looking for existant value", function(){
      var env1 = new Environment();
      env1.put("a","1");
      env1.put("b","2");
      var env2 = new Environment(env1);
      env2.put("a","2");
      var env3 = new Environment(env1);
      env3.put("a","3");
      expect(env1.get("b")).toBe("2");
      expect(env2.get("b")).toBe("2");
      expect(env3.get("b")).toBe("2");
   });
});
