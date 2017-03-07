var divs = document.querySelectorAll('.cal-cell-content table'),
    l = divs.length, i, cur;

for(i=0; i<l; i++) {
    cur = divs[i];
    console.log(cur);
}

//Equivalent to $("...").each(function(){})