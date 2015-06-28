_=require('lodash');

function existy(x){return x != null;};
function truthy(x){return (x != false) && existy(x);};

function cat(/*いくつかの配列*/){
    var head = _.first(arguments);
    if(existy(head))//_.isArray(head)???
	return head.concat.apply(head, _.rest(arguments));
    else
	return [];
}

function construct(head,tail){
    return cat([head],_.toArray(tail));
}

function mapcat(func, coll){
    return cat.apply(null,_.map(coll,func));
}

function butLast(coll) {
    return _.toArray(coll).slice(0,-1);
}

function interpose(inter,coll) {
    return butLast(mapcat(function(e){
	return construct(e, [inter]);
    },coll));
}

function project(table, keys){
    return _.map(table, function(obj) {
	return _.pick.apply(null,construct(obj, keys));
    });
}

function rename(obj,newNames){
    return _.reduce(newNames, function(o, nu, old){
	if(_.has(obj,old)){
	    o[nu]=obj[old];
	    return o;
	}
	else
	    return o;
    },
		    _.omit.apply(null,construct(obj,_.keys(newNames))));
}

function as(table, newNames) {
    return _.map(table, function(obj){
	return rename(obj, newNames);
    });
}

function restrict(table, pred){
    return _.reduce(table, function(newTable, obj){
	if(truthy(pred(obj)))
	    return newTable;
	else
	    return _.without(newTable, obj);
    }, table);
}


var library = [{title: "SICP", isbn: "0262010771", ed: 1},
	       {title: "SICP", isbn: "0252010871", ed: 2},
	       {title: "Joy of Clojure", isbn: "1935182641", ed: 1}];

var editionResults = project(library,['isbn','ed']);
//console.log(editionResults);
//console.log(_.toArray([['de']]));
//console.log(rename({a: 1, b: 2}, {'a': 'AAA'}));
//console.log(as(library, {ed: 'edition'}));
//console.log(project(as(library,{ed: 'edition'}), ['edition']));
console.log(restrict(library, function(book){
    return book.ed > 1;
}));
