// popup page

var $ = function(id) {
	return document.getElementById(id);
};

var FrontManager = {
	init: function() {
		var body = $("main");
		if (window.localStorage.getItem('totalnumb') == null)
			window.localStorage.setItem('totalnumb', '' + 0);
		var grpNumb = parseInt(window.localStorage.getItem('totalnumb'));
		if (grpNumb == 0) {
			var p = document.createElement('p');
			var div = document.createElement('div');
			p.innerHTML += "No group";
			div.appendChild(p);
			body.appendChild(div);
			return;
		}

		for (var i = 0;i < grpNumb;i++){
			var tmpname = window.localStorage.getItem('group' + i + 'name');
			var numb = window.localStorage.getItem('group' + i + 'numb');
			var btn = document.createElement('input');
			var addcurr = document.createElement('input');
			var div = document.createElement('div');
			
			btn.setAttribute('id', 'group' + i + 'btn');
			btn.setAttribute("type","button");
			btn.setAttribute("value",tmpname + "(" + numb + ")");
			btn.addEventListener('click', function(obj){var n = parseInt(obj.target.id.replace(/[^0-9]/ig,""));
														  FrontManager.open(n);}, false);

			addcurr.setAttribute('id', 'group' + i + 'addcurr');
			addcurr.setAttribute("type","button");
			addcurr.setAttribute("value","+");
			addcurr.addEventListener('click', function(obj){var n = parseInt(obj.target.id.replace(/[^0-9]/ig,""));
														  FrontManager.addCurrent(n);}, false);
			
			div.appendChild(btn);
			div.appendChild(addcurr);
			// div.setAttribute('class','row');
			div.style.whiteSpace = 'nowrap';
			body.appendChild(div);
		}
	},

	addCurrent: function(index) {
		chrome.tabs.query({active: true}, function(tabs){
				var url = tabs[0].url;
				if (url.substring(0,7) != "http://" && url.substring(0,8) != "https://") 
					url = "http://" + url;
		
				var numb = parseInt(window.localStorage.getItem('group' + index + 'numb'));
				// duplicate check
				var alwduplicatechecked = window.localStorage.getItem('alwduplicatecheck');
				if (alwduplicatechecked == null) {
					alwduplicatechecked = 0;
					window.localStorage.setItem('alwduplicatecheck', '' + alwduplicatechecked)
				} else alwduplicatechecked = parseInt(alwduplicatechecked);
				if (!alwduplicatechecked) {
					for (var i=0;i<numb;i++) {
						var turl = window.localStorage.getItem('group' + index + ':' + i);
						if (turl === url)
							return;
					}
				}
				window.localStorage.setItem('group' + index + ':' + numb, url);
				numb++;
				window.localStorage.setItem('group' + index + 'numb', numb);

				var btn = $('group' + index + 'btn');
				var tmpname = window.localStorage.getItem('group' + index + 'name');
				btn.setAttribute('value', tmpname + "(" + numb + ")");
			});	
	},

	open: function(index) {
		var clrallchecked = window.localStorage.getItem('clrallcheck');
		if (clrallchecked == null) {
			clrallchecked = 0;
			window.localStorage.setItem('clrallcheck', '' + clrallchecked)
		} else clrallchecked = parseInt(clrallchecked);
		var numb = window.localStorage.getItem('group'+ index +'numb');
		chrome.tabs.query({}, function(tabs){
			if (clrallchecked) {
				for (let t of tabs)
					chrome.tabs.remove(t.id);
			}
			for (var i = 0;i < numb;i++) {
				var target_url = window.localStorage.getItem('group'+ index +':' + i);
				chrome.tabs.create({url:target_url,selected:false});
			}
		});
	}
};

document.addEventListener('DOMContentLoaded', function() {  
	FrontManager.init();  
}); 
/*
var option_url = chrome.extension.getURL('options/index.html');
var win = chrome.windows.getCurrent();
chrome.tabs.getAllInWindow(win,function(tabs){
    var option_tab = tabs.filter(function(t) { return t.url === option_url });
    if(option_tab.length == 0)
        chrome.tabs.create({url:option_url,selected:false});
});
*/