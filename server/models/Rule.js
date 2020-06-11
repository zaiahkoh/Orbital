const isEmpty = require('is-empty');
const validator = require('validator');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true});

var col;

client.connect((err, client) => {
  col = client.db('modtree').collection('rules')
});

const acceptedFuncs = [
  'and', 'or', 'mcs', 'filter', 'notEmpty', 'nTrue', 'nModules'
];

module.exports = RuleSchema = {
  validate: (value) => {
    var errors = {};
    const {name, tag, func, params} = {...value};

    //Check if all values are defined
    if (name == undefined) {
      errors.name = "undefined name";
    }
    if (tag == undefined) {
      errors.tag = "undefined tag";
    }
    if (func == undefined) {
      errors.func = "undefined func";
    }
    if (params == undefined) {
      errors.func = "undefined params"
    }

    if ( !isEmpty(errors) ) {
      return {errors, value}
    }

    //Check if all values are strings
    if (typeof name !== 'string') {
      errors.name = "not a string name";
    }
    if (typeof tag !== 'string') {
      errors.tag = "not a string tag";
    }
    if (typeof func !== 'string') {
      errors.func = "not a string func";
    }
    if (typeof params !== 'object') {
      errors.params = "not an Object params";
    }

    if ( !isEmpty(errors) ) {
      return {errors, value}
    }

    //Check whether the tag and function are valid according to the schema
    if (!tag.startsWith('r_')) {
      errors.tag = 'invalid tag';
    }

    if (!acceptedFuncs.includes(func)){
      errors.func = 'func not recognised'
    }

    if ( !isEmpty(errors) ) {
      return {errors, value}
    }

    //Check if the params are according to schema, depending on the function
    if (func === 'and' || func === 'or') {
      if ( isEmpty(params.list) ) {
        errors.params = `undefined "list" for ${func}`;
      } else {
        const validRef = (ref) => ref.startsWith('?') || ref.startsWith('r_')
            ? true
            : false
        if ( !params.list.every(validRef) ) {
          errors.params = 'invalid references in "list" parameter'
        }
      }
    } else if (func === 'mcs' || func === 'nTrue') {
      if ( isEmpty(params.n) ) {
        errors.params = `undefined "n" for ${func}`;
      } else {
        if (typeof params.n == 'string') {
          if (!validator.isNumeric(params.n), {onlyInteger: true, greaterThan: 0}) {
            errors.params = 'n is not a positive integer';
          }
        } else if (typeof params.n == 'number') {
          if (params.n <= 0 || !Number.isInteger(params.n)) {
            errors.params = 'n is not a positive integer';
          }
        }
      }
    } else if (func === 'filter') {
      
    }

    //col.findOne({tag: 'fake_tag'}).then(res => console.log(isEmpty(res)));

    if (isEmpty(errors)) {errors = undefined};
    return {errors, value};
  }
}