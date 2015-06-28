var lylics = [];

for(var botteles = 99; botteles > 0; botteles--){
    lylics.push(botteles + "本のビールが残ってる");
    lylics.push(botteles + "本のビール");
    lylics.push("ひとつ取って，隣に回せ");
    if(botteles > 1) {
	lylics.push((botteles -1) + "本のビールが残ってる");
    }
    else {
	lylics.push("もうビールは残っていない");
    }
}

console.log(lylics);
