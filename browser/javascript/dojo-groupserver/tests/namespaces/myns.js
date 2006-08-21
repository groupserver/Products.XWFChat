/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.provide("dojo.namespaces.myns");
dojo.provide("tests.namespaces.myns");

dojo.require("dojo.string.extras");

(function(){
	function mynsResolver(name){
		var pkg = "myns.widget."+dojo.string.capitalize(name);
		dojo.debug("resolver returning '"+pkg+"' for '"+name+"'"); 
		return pkg;
	}

	dojo.defineNamespace("my.namespace","tests/namespaces/myns","myns",mynsResolver,"myns.widget");
})();