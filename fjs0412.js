_ = require('lodash')

function lylicSecment(n) {
    return _.chain([])
	.push(n + "本のビールが残ってる")
	.push(n + "本のビール")
	.push("ひとつ取って，隣に回せ")
	.tap(function(lylics) {
	    if(n>1){
		lylics.push((n-1) + "本のビールが残ってる");
	    }
	    else {
		lylics.push("もうビールは残ってない");
	    }
	})
	.value();
}

function song(start,end,lyricGen){
    return _.reduce(_.range(start,end,-1),
		    function(acc,n){
			return acc.concat(lyricGen(n));
		    },[]);
}

var lylics = song(99,0,lylicSecment);

console.log(lylics);
