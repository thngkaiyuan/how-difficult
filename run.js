var replacementRate = 300;
var initialWait = 20000;
var subdomain = location.hostname.split('.')[0];
var path_len = location.pathname.split('/').length;
var firstTime = true;
var map = new Map();

function setDifficulty(problemId, e1, e2) {
    var diff = map.get(problemId);
    if(diff) {
        e1.innerText = diff;
        e2.innerText = diff;
        return;
    }

    var problemUrl = "//open.kattis.com/problems/" + problemId;
    $.get(problemUrl, function(responseText) {
        var diffObj = $(responseText).find('strong:contains("Difficulty")').next()[0];
        var diff = $(diffObj).text();
        e1.innerText = diff;
        e2.innerText = diff;
        map.set(problemId, diff);
    });
}

function getProblemsAndSetDifficulties() {
    var tbl = $("#standings");
    var headings = tbl.find("th.problemcolheader-standings");
    for(var i = 0; i < headings.length/2; i++) {
        var elem = headings[i];
        var a = elem.getElementsByTagName('a')[0];
        var a2 = headings[i+(headings.length/2)].getElementsByTagName('a')[0];
        var href = a.href;
        var nodes = href.split('/');
        var problemId = nodes[nodes.length-1];
        setDifficulty(problemId, a, a2);
    }

    if(!firstTime) setTimeout(getProblemsAndSetDifficulties, replacementRate);
}

if(subdomain !== "open" && path_len === 3) {
    getProblemsAndSetDifficulties();
    firstTime = false;
    setTimeout(getProblemsAndSetDifficulties, initialWait);
}