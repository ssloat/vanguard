/*jslint browser:true*/
/*globals VGC:true*/ 
(function () {
	'use strict';
	var inst,
		header = document.getElementById('vgc-globalHeader'),
		defaultGHContent = document.getElementById('vgc-defaultContent');
	if (!defaultGHContent){
		if (header && typeof header !== 'undefined') {
			header.innerHTML = '';
		}
		inst = VGC.app('globalHeaderFooter', ['$coreLib']).newInstance();
		inst.run();
	}
	
}());
