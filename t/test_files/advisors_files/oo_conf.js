/*
OnlineOpinion v5.9.0
Released: 11/17/2014. Compiled 11/17/2014 01:01:01 PM -0600
Branch: master 7cffc7b9a0b11594d56b71ca0cb042d9b0fc24f5
Components: Full
UMD: disabled
The following code is Copyright 1998-2014 Opinionlab, Inc. All rights reserved. Unauthorized use is prohibited. This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. http://www.opinionlab.com
*/

/* global window, OOo */

/*
Inline configuration
*********************
Object is now being instantiated against the OOo object (1 global class)
To call this object, place the below in the click event
OOo.oo_feedback.show(event)
*/
(function (w, o) {
    'use strict';

    var addFasText = function()
		{
			var tabElement = document.getElementById('oo_tab'),
				ooAnchorTag,
				largeTextSpan;
			
			if (tabElement) 
			{
				//find elements added by OL engine and add main text
				ooAnchorTag = tabElement.childNodes[0].childNodes[0];
				ooAnchorTag.innerHTML = 'Got Feedback?';
				
				//add span for the text that gets hidden on small
				largeTextSpan = document.createElement('span');
				largeTextSpan.setAttribute('class', 'hideOnSmall');
				largeTextSpan.innerHTML = ' We\'re listening.';
			    ooAnchorTag.appendChild(largeTextSpan);
			}
		},
		/**
		 * Add a class to the body element when the feedback element is on the page
		 * This allows for the vuiScrollToTop element to be repositioned so the two
		 * don't overlap.
		 */
		addBodyClass = function()
		{
			var bodyElementClasses = document.body.className;
			
			bodyElementClasses = bodyElementClasses + ' ooFeedbackVisible';
			document.body.setAttribute('class', bodyElementClasses);
		},
		OpinionLabInit = function () 
		{
			o.oo_feedback = new o.Ocode({
				tealeafCookieName: 'TLTSID', 
				tab: {
					title: 'Got Feedback?'
				}
			});
			addFasText();
			addBodyClass();
		};

    o.addEventListener(w, 'load', OpinionLabInit, false);

})(window, OOo);