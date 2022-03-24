//Import the mongoose module
var mongoose = require('mongoose')

//Define a schema
var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

//Virtual for author's full ame

AuthorSchema
.virtual('name')
.get(function() {
    //to avoid errors in cases where the author does not have either a family name or first name, we want to make sure we handle the exception by returnig an empty string for that case
    
    var fullname= '';
    if(this.first_name && this.family_name) {
        fullame = this.family_name + ',' + this.first_name
    }
    if (!this.first_name || this.family_name) {
        fullname = '';
    }
    return fullname
})

// Virtual for author's lifespan
//Virtual properties are document properties that you can get and set but that do not get persisted to MongoDB

AuthorSchema.virtual('lifespan').get(function() {
    var lifetime_string = '';
    if (this.date_of_birth) {
      lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
      lifetime_string += this.date_of_death.getYear()
    }
    return lifetime_string;
  });
  
// Virtual for author's URL
//We will use a virtual property in the library to define a unique URL for each model record using a path and the record's _id value.
AuthorSchema
.virtual('url')
.get(function () {
    return '/catalog/author/' + this._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);