var email = 'your email address';
var pass = 'your passeord';
var dns = 'dns records';

var page = require('webpage').create();

var funcs = new Array();
funcs.push(function () {
  var url = 'https://secure.netowl.jp/netowl/?service=stardomain';
  page.open(url);
});

funcs.push(function () {
  page.evaluate(function(e, p) {
    document.getElementsByName('mailaddress')[0].value = e;
    document.getElementsByName('password')[0].value = p;
    document.getElementsByName('action_user_login')[0].click();
  }, email, pass);
});

funcs.push(function () {
  // do nothing
});

funcs.push(function () {
  page.evaluate(function() {
    document.getElementsByName('action_user_detail_index')[0].click();
  });
});

funcs.push(function () {
  page.evaluate(function() {
    document.getElementsByName('action_user_dns_index')[0].click();
  });
});

funcs.push(function () {
  page.open('https://secure.netowl.jp/star-domain/?action_user_dns_edittxt_index=true');
});

funcs.push(function () {
  page.evaluate(function(d) {
    document.getElementsByName('content')[0].value = d;
    document.getElementsByName('action_user_dns_edittxt_conf')[0].click();
  }, dns);
});

funcs.push(function () {
  page.evaluate(function() {
    document.getElementsByName('action_user_dns_edittxt_do')[0].click();
  });
});

funcs.push(function () {
  phantom.exit();
});

page.onLoadFinished = function () {
  //console.log(page.title);
  //console.log(page.url);

  if (funcs.length > 0) {
    var func = funcs.shift();
    func();
  } else {
    console.log('queue is empty. exit.');
    phantom.exit();
  }
};

page.onLoadFinished();
