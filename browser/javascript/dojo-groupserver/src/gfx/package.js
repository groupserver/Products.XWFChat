/*
	Copyright (c) 2004-2006, The Dojo Foundation
	All Rights Reserved.

	Licensed under the Academic Free License version 2.1 or above OR the
	modified BSD license. For more information on Dojo licensing, see:

		http://dojotoolkit.org/community/licensing.shtml
*/

dojo.require("dojo.gfx.m2d");
dojo.provide("dojo.gfx.*");

dojo.requireIf(dojo.render.svg.capable, "dojo.gfx.svg");
dojo.requireIf(!dojo.render.svg.capable && dojo.render.vml.capable, "dojo.gfx.vml");

dojo.require("dojo.experimental");
dojo.experimental("dojo.gfx.*");

dojo.gfx.defaultRenderer.init();

dojo.gfx.normalizeParameters = function (existed, update) {
    if(update) {
        for(x in existed) {
            if(x in update) {
                existed[x] = update[x];
            }
        }
    }
    return existed;
}

dojo.gfx.GUID = 1;
dojo.gfx.guid = function(){
    return dojo.gfx.GUID++;
};
