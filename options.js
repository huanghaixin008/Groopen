// options page

var $ = function(id) {
	return document.getElementById(id);
};

var GroupManager = {
	init: function() {  // display all groups and urls
		// Options div
		var opndiv = $('Options');
		var opnp = document.createElement('h2');
		opnp.setAttribute('id', 'optionsp');
		opnp.innerHTML += "Options";
		var opnpdiv = document.createElement('div');
		opnpdiv.setAttribute('id', 'optionpdiv');
		opnpdiv.appendChild(opnp);
		opndiv.appendChild(opnpdiv);
		var newgrpbtn = document.createElement('input');
		newgrpbtn.setAttribute("type","button");
		newgrpbtn.setAttribute("value","New Group");
		newgrpbtn.setAttribute("id",'newgroup');
		newgrpbtn.addEventListener('click', function(){GroupManager.newGroup();}, false);
		opndiv.appendChild(newgrpbtn);  // the new group button
		var clrgrpbtn = document.createElement('input');
		clrgrpbtn.setAttribute("type","button");
		clrgrpbtn.setAttribute("value","Clear Group");
		clrgrpbtn.setAttribute("id",'clrgroup');
		clrgrpbtn.addEventListener('click', function(){GroupManager.clearGroup();}, false);
		opndiv.appendChild(clrgrpbtn);  // clear group button
		// Groups div
		var grpdiv = $('Groups');
		var grpp = document.createElement('h2');
		grpp.setAttribute('id', 'groupsp');
		grpp.innerHTML += "Groups";
		var grppdiv = document.createElement('div');
		grppdiv.setAttribute('id', 'grouppdiv');
		grppdiv.appendChild(grpp);
		grpdiv.appendChild(grppdiv);

		var grpNumb = parseInt(window.localStorage.getItem('totalnumb'));
		var nullp = document.createElement('p');
		nullp.setAttribute("id","null");
		nullp.innerHTML += "No existing group for now!";
		grpdiv.appendChild(nullp);
		if (grpNumb > 0)
			nullp.style.display = "none";
		
		for (var i = 0;i < grpNumb; i++) {
			var div = document.createElement('div');
			var p = document.createElement('p');
			var btn1 = document.createElement('input');
			var btn2 = document.createElement('input');
			var btn3 = document.createElement('input');
			
			div.setAttribute('id','group' + i);
			p.setAttribute('id','group' + i + 'name');
			p.innerHTML += window.localStorage.getItem('group' + i + 'name');

			btn1.setAttribute("type","button");
			btn1.setAttribute("value","Delete Group");
			btn1.setAttribute("id",'group' + i + "del");
			btn1.addEventListener('click', function(obj){ var n = parseInt(obj.target.id.replace(/[^0-9]/ig,""));
														  GroupManager.delGroup(n);}, false);  // delete group button

			btn2.setAttribute("type","button");
			btn2.setAttribute("value","Rename Group");
			btn2.setAttribute("id",'group' + i + "edit");
			btn2.addEventListener('click', function(obj){ var n = parseInt(obj.target.id.replace(/[^0-9]/ig,""));
														  GroupManager.editGroup(n);}, false);  // edit group button 			

			btn3.setAttribute("type","button");
			btn3.setAttribute("value","Add URL");
			btn3.setAttribute("id",'group' + i + "add");
			btn3.addEventListener('click', function(obj){ var n = parseInt(obj.target.id.replace(/[^0-9]/ig,""));
														  GroupManager.addURL(n);}, false);  // add URL button

			div.appendChild(p);			
			div.appendChild(btn3);		
			div.appendChild(btn2);			
			div.appendChild(btn1);  

			var numb = parseInt(window.localStorage.getItem('group' + i + 'numb'));
			for (var j = 0;j < numb;j++) {
				var urldiv = document.createElement('div');
				urldiv.setAttribute('id','group' + i + ':' + j + 'div');
				var a = document.createElement('a');
				var url = window.localStorage.getItem('group' + i + ":" + j);
				var btn1 = document.createElement('input');
				var btn2 = document.createElement('input');

				btn2.setAttribute("type","button");
				btn2.setAttribute("value","Edit url");
				btn2.setAttribute("id",'group' + i + ":" + j + "edit");
				btn2.addEventListener('click', function(obj){ var s = obj.target.id.split(":");
															  var n1 = parseInt(s[0].replace(/[^0-9]/ig,""));
															  var n2 = parseInt(s[1].replace(/[^0-9]/ig,""));
														      GroupManager.editURL(n1,n2);}, false);  // edit URL button
				btn1.setAttribute("type","button");
				btn1.setAttribute("value","Delete url");
				btn1.setAttribute("id",'group' + i + ":" + j + "del");
				btn1.addEventListener('click', function(obj){ var s = obj.target.id.split(":");
															  var n1 = parseInt(s[0].replace(/[^0-9]/ig,""));
															  var n2 = parseInt(s[1].replace(/[^0-9]/ig,""));
														      GroupManager.delURL(n1,n2);}, false);  // delete URL button

				a.innerHTML += url;
				a.setAttribute('href',url);
				a.setAttribute('id','group' + i + ":" + j);
				urldiv.appendChild(a);
				urldiv.appendChild(btn2);
				urldiv.appendChild(btn1);
				div.appendChild(urldiv);
			}  // display urls

			grpdiv.appendChild(div);
		} // display groups
	},

	newGroup: function() {
		if (window.localStorage.getItem('totalnumb') == null)
			window.localStorage.setItem('totalnumb', '' + 0);
		var nullp = $('null');
		nullp.style.display = 'none';

		var name = prompt("Please input the name of new group:");  // quest it
		if (name == null)
			return;

		var totalnumb = parseInt(window.localStorage.getItem('totalnumb'));

		window.localStorage.setItem('group' + totalnumb + 'name', name);
		window.localStorage.setItem('group' + totalnumb + 'numb', '' + 0);

		var grpdiv = $('Groups');
		var div = document.createElement('div');   // insert new element at the end
		var p = document.createElement('p');
		var btn1 = document.createElement('input');
		var btn2 = document.createElement('input');
		var btn3 = document.createElement('input');

		div.setAttribute('id','group' + totalnumb);
		p.setAttribute('id','group' + totalnumb + 'name');
		p.innerHTML += name;

		btn1.setAttribute("type","button");
		btn1.setAttribute("value","Delete Group");
		btn1.setAttribute("id",'group' + totalnumb + "del");
		btn1.addEventListener('click', function(obj){ var n = parseInt(obj.target.id.replace(/[^0-9]/ig,""));
													  GroupManager.delGroup(n);}, false);  // delete group button

		btn2.setAttribute("type","button");
		btn2.setAttribute("value","Rename Group");
		btn2.setAttribute("id",'group' + totalnumb + "edit");
		btn2.addEventListener('click', function(obj){ var n = parseInt(obj.target.id.replace(/[^0-9]/ig,""));
													  GroupManager.editGroup(n);}, false);  // edit group button 			

		btn3.setAttribute("type","button");
		btn3.setAttribute("value","Add URL");
		btn3.setAttribute("id",'group' + totalnumb + "add");
		btn3.addEventListener('click', function(obj){ var n = parseInt(obj.target.id.replace(/[^0-9]/ig,""));
													  GroupManager.addURL(n);}, false);  // add URL button

	    totalnumb += 1;
		window.localStorage.setItem('totalnumb', totalnumb);

		div.appendChild(p);
		div.appendChild(btn3);
		div.appendChild(btn2);
		div.appendChild(btn1);

		grpdiv.appendChild(div);

		return totalnumb;
	},

	clearGroup: function() {
		if (!confirm("Are you sure to clear groups?"))
			return;

		var totalnumb = parseInt(window.localStorage.getItem('totalnumb'));
		// hide all div and remove localstorage
		for (var j=0;j<totalnumb;j++) {
			var numb = parseInt(window.localStorage.getItem('group' + j + 'numb'));
			window.localStorage.removeItem('group' + j + 'name');
			window.localStorage.removeItem('group' + j + 'numb');
			for (var i=0;i<numb;i++)
				window.localStorage.removeItem('group' + j + ":" + i);
			var cdiv = $('group' + j);
			cdiv.setAttribute('id', 'group' + j + 'false');
			var cp = $('group' + j + 'name');
			cp.setAttribute('id', 'group' + j + 'namefalse');
			var cdivadd = $('group' + j + 'add');
			cdivadd.setAttribute('id', 'group' + j + 'addfalse');
			var cdivdel = $('group' + j + 'del');
			cdivdel.setAttribute('id', 'group' + j + 'delfalse');
			var cdivedit = $('group' + j + 'edit');
			cdivedit.setAttribute('id', 'group' + j + 'editfalse');
			cdiv.style.display = 'none';
			for (var i = 0;i < numb; i++) {	
				var a = $('group' + j + ":" + i);	
				a.setAttribute('id','group' + j + ":" + i + 'false');
				var div = $('group' + j + ":" + i + 'div');
				div.setAttribute('id','group' + j + ":" + i + 'divfalse');
				var input = $('group' + j + ":" + i + 'del');
				input.setAttribute('id','group' + j + ":" + i + 'delfalse');
				input = $('group' + j + ":" + i + 'edit');
				input.setAttribute('id','group' + j + ":" + i + 'editfalse');
				div.style.display = 'none';
			}
		}

		window.localStorage.setItem('totalnumb', '' + 0);
		var p = $('null');
		p.style.display = 'inline';
	},

	editGroup: function(index) {
		var name = prompt("Please input the new name:");  // quest it
		if (name == null)
			return;

		window.localStorage.setItem('group' + index + 'name', name);

		var p = $('group'+index+'name');  // edit group name displayed
		p.innerHTML = name;
	},

	delGroup: function(index) {
		var current = index;
		var numb = parseInt(window.localStorage.getItem('group' + current + 'numb'));
		var totalnumb = parseInt(window.localStorage.getItem('totalnumb'));
		// hide current div and remove localstorage
		window.localStorage.removeItem('group' + current + 'name');
		window.localStorage.removeItem('group' + current + 'numb');
		for (var i=0;i<numb;i++)
			window.localStorage.removeItem('group' + current + ":" + i);
		var cdiv = $('group' + current);
		cdiv.setAttribute('id', 'group' + current + 'false');
		var cp = $('group' + current + 'name');
		cp.setAttribute('id', 'group' + current + 'namefalse');
		var cdivadd = $('group' + current + 'add');
		cdivadd.setAttribute('id', 'group' + current + 'addfalse');
		var cdivdel = $('group' + current + 'del');
		cdivdel.setAttribute('id', 'group' + current + 'delfalse');
		var cdivedit = $('group' + current + 'edit');
		cdivedit.setAttribute('id', 'group' + current + 'editfalse');
		cdiv.style.display = 'none';
		for (var i = 0;i < numb; i++) {	
			var a = $('group' + current + ":" + i);	
			a.setAttribute('id','group' + current + ":" + i + 'false');
			var div = $('group' + current + ":" + i + 'div');
			div.setAttribute('id','group' + current + ":" + i + 'divfalse');
			var input = $('group' + current + ":" + i + 'del');
			input.setAttribute('id','group' + current + ":" + i + 'delfalse');
			input = $('group' + current + ":" + i + 'edit');
			input.setAttribute('id','group' + current + ":" + i + 'editfalse');
			div.style.display = 'none';
		}

		var next = index + 1;
		var name, nextnumb;
		while (next < totalnumb) { // 把所有后面的group前移填空 
			// moving group, including localstorage, p, div, add, del, edit
			nextnumb = parseInt(window.localStorage.getItem('group' + next + 'numb'));
			window.localStorage.setItem('group' + current + "numb", '' + nextnumb);
			window.localStorage.removeItem('group' + next + 'numb');
			name = window.localStorage.getItem('group' + next + 'name');
			window.localStorage.setItem('group' + current + "name", name);
			window.localStorage.removeItem('group' + next + 'name');
			var e = $('group' + next);
			e.setAttribute('id', 'group' + current);
			e = $('group' + next + 'name');
			e.setAttribute('id', 'group' + current + 'name');
			e = $('group' + next + 'add');
			e.setAttribute('id', 'group' + current + 'add');
			e = $('group' + next + 'del');
			e.setAttribute('id', 'group' + current + 'del');
			e = $('group' + next + 'edit');
			e.setAttribute('id', 'group' + current + 'edit');
			// moving urls, including localstorage, a, div, del, edit
			for (var i = 0;i < nextnumb; i++) {
				var url = window.localStorage.getItem('group' + next + ":" + i);
				window.localStorage.setItem('group' + current + ":" + i, url);
				window.localStorage.removeItem('group' + next + ":" + i);
				var e = $('group' + next + ":" + i); // a
				e.setAttribute('id','group' + current + ":" + i);
				e = $('group' + next + ":" + i + 'div');
				e.setAttribute('id','group' + current + ":" + i + 'div');
				e = $('group' + next + ":" + i + 'del');
				e.setAttribute('id','group' + current + ":" + i + 'del');
				e = $('group' + next + ":" + i + 'edit');
				e.setAttribute('id','group' + current + ":" + i + 'edit');
			}
			current++;
			next++;
		}

		totalnumb--;
		window.localStorage.setItem('totalnumb','' + totalnumb);
		if (totalnumb == 0) {
			var nullp = $('null');
			nullp.style.display = 'block';
		}

		return totalnumb;
	},

	addURL: function(index) { 
		var numb = parseInt(window.localStorage.getItem('group' + index + 'numb'));

		var url = prompt("Please input the URL:"); // quest it
		if (url == null)
			return;
		if (url.substring(0,7) != "http://" && url.substring(0,8) != "https://") 
			url = "http://" + url;

		// duplicate check
		/* allow duplicate here
		for (var i=0;i<numb;i++) {
			var turl = window.localStorage.getItem('group' + index + ':' + i);
			if (turl === url) {
				alert("Duplicated URL!");
				return;
			}
		} */
		window.localStorage.setItem('group' + index + ':' + numb, url);

		var div = $('group' + index);
		var urldiv = document.createElement('div');
		urldiv.setAttribute('id','group' + index + ':' + numb + 'div');
		var a = document.createElement('a');				
		var btn1 = document.createElement('input');
		var btn2 = document.createElement('input');

		btn1.setAttribute("type","button");
		btn1.setAttribute("value","Delete url");
		btn1.setAttribute("id",'group' + index + ":" + numb + "del");
		btn1.addEventListener('click', function(obj){ var s = obj.target.id.split(":");
													  var n1 = parseInt(s[0].replace(/[^0-9]/ig,""));
													  var n2 = parseInt(s[1].replace(/[^0-9]/ig,""));
												      GroupManager.delURL(n1,n2);}, false);  // delete URL button

		btn2.setAttribute("type","button");
		btn2.setAttribute("value","Edit url");
		btn2.setAttribute("id",'group' + index + ":" + numb + "edit");
		btn2.addEventListener('click', function(obj){ var s = obj.target.id.split(":");
													  var n1 = parseInt(s[0].replace(/[^0-9]/ig,""));
													  var n2 = parseInt(s[1].replace(/[^0-9]/ig,""));
												      GroupManager.editURL(n1,n2);}, false);  // edit URL button
		a.innerHTML += url;
		a.setAttribute('href',url);
		a.setAttribute('id','group' + index + ":" + numb);

		numb++;
		window.localStorage.setItem('group' + index + 'numb', numb);

		urldiv.appendChild(a);    // add element
		urldiv.appendChild(btn2);    // add element
		urldiv.appendChild(btn1);    // add element
		div.appendChild(urldiv);
	},

	delURL: function(index1,index2) { // group index and url index
		var numb = parseInt(window.localStorage.getItem('group' + index1 + 'numb'));
		var current = index2;
		var next = index2 + 1;

		for (;next < numb;){
			window.localStorage.setItem('group' + index1 + ":" + current, window.localStorage.getItem('group' + index1 + ":" + next));

			var a = $('group' + index1 + ":" + next);
			var temp = next - 1;
			a.setAttribute('id','group' + index1 + ":" + temp);  // change IDs
			var div = $('group' + index1 + ":" + next + 'div');
			div.setAttribute('id','group' + index1 + ":" + temp + 'div');  // change IDs

			var btn = $('group' + index1 + ":" + next + "del");
			btn.setAttribute('id','group' + index1 + ":" + temp + "del"); 
			btn = $('group' + index1 + ":" + next + "edit");
			btn.setAttribute('id','group' + index1 + ":" + temp + "edit"); 

			current++;
			next++;
		}
		window.localStorage.removeItem('group' + index1 + ":" + numb);
		var a = $('group' + index1 + ":" + index2);
		var div = $('group' + index1 + ":" + index2 + 'div');
		var delbtn = $('group' + index1 + ":" + index2 + "del");
		var editbtn = $('group' + index1 + ":" + index2 + "edit");
		div.style.display = "none";
		div.setAttribute('id','group' + index1 + ":" + index2 + "divfalse");
		a.setAttribute('id','group' + index1 + ":" + index2 + "false");
		delbtn.setAttribute('id','group' + index1 + ":" + index2 + "del" + "false"); 
		editbtn.setAttribute('id','group' + index1 + ":" + index2 + "edit" + "false");   // hide the deleted one

		numb--;
		window.localStorage.setItem('group' + index1 + "numb",'' + numb);

		return numb;
	},

	editURL: function(index1,index2) {  // need a quest 
		if (index2 >= parseInt(window.localStorage.getItem('group' + index1 + 'numb')))
			return;

		var url = prompt("Please input the new URL:"); // quest it
		if (url == null)
			return;
		if (url.substring(0,8) != "http://" && url.substring(0,9) != "https://")
			url = "http://" + url;

		window.localStorage.setItem('group' + index1 + ":" + index2, url);		
		var p = $('group' + index1 + ":" + index2);  // edit url displayed
		p.innerHTML = url;
	}
};

document.addEventListener('DOMContentLoaded', function() {  
	GroupManager.init();  
}); 


/*
localStorage存的东西： 
1. totalnumb，group的个数
2. group+index+numb，第index个group的url数
3. group+index1+：+index2，第index1个group中的第index2个url
*/

// TODO cannot assure no repeating groupname now
// *** TODO problems occur when refresh after delete
// TODO deleting group has severe problems (caused by wrong html structure?)