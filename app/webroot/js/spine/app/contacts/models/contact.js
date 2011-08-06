jQuery(function($){
  
  var Contact = Spine.Model.setup("Contact", ["first_name", "last_name", "email",
    "mobile", "work", "address", "notes"]);

  // Persist model between page reloads
  Contact.extend(Spine.Model.Ajax);
  Contact.extend(Spine.Model.Filter);

  Contact.extend({
    selectAttributes: ["first_name", "last_name", "email", 
    "mobile", "work", "address"],

    nameSort: function(a, b){
      var aa = a.first_name.toLowerCase();
      var bb = b.first_name.toLowerCase();
      if(aa == bb) {
        return 0;
      } else {
        return (aa < bb) ? -1 : 1;
      }
    }
  });

  Contact.include({
    selectAttributes: function(){
      var result = {};
      for (var i=0; i < this.parent.selectAttributes.length; i++) {
        var attr = this.parent.selectAttributes[i];
        result[attr] = this[attr];
      }
      return result;
    },

    fullName: function(){
      if ( !this.first_name && !this.last_name ) return;
      return(this.first_name + " " + this.last_name);
    }
  });
  
  window.Contact = Contact;
  
});
