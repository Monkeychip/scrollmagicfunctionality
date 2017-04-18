(function(){
jQuery(document).ready(function($){


////////////////////////////////////////////////////////////////////////////////
//SCROLL MAGIC FUNCTIONALITY:
//1. Define the variable that selects all child elements of the section
//2. Duplicate code under last segement and paste at the bottom.
//3. Replace ID with new ID, and replace variable with new variable defined in #1.
////////////////////////////////////////////////////////////////////////////////

/////////////////////
//DECLARE VARIALBES//
////////////////////

$("#dream").css("max-width","100% !important");

	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {
        triggerHook: 'onLeave'
    	}
	}),

		design = $("#design").find("*"),
		designID = $('#design'),
		build = $("#build").find("*"),
		buildID = $("#build"),
		dream = $("#dream").find("*"),
		dreamID = $("#dream"),
		map = $("#map h2:first-child").add($("#map h2:first-child").next()),
		mapID = $("#map"),
		anvil = $("#anvil h2:first-child").add($("#anvil h2:first-child").next()),
		anvilID = $("#anvil"),
		leadership = $("#leadership h2:first-child").add($("#leadership p:first-child")[0]),
		leadershipID = $("#leadership"),
		inthepress = $("#in-the-press h2:first-child").add($("#in-the-press p:first-child")[0]),
		inthepressID = $("#in-the-press"),
		/*variables for preventing scroll background*/
		 mapSection = $('#mpfy-map-0'),
		 mapToolTip= $('.mpfy-tooltip'), //hover elements on map
		 mapPopUpHolder = $('.mpf-p-popup-holder'),
		 mapPin = $('a.mpfy-pin'),
		 cboxOverlay = $("#cboxOverlay"),
		/*variables for blur background functionality*/
		vcRow = $('.vc_row'),
		leadershipClickBox = $("#leadership").find('.overlay').eq(7),
		cboxElement = $('.cboxElement'), //link above plus sign for expanding popups.
		jlfPlusSign = $(".jlf-plus-sign"),
		notMobile = Modernizr.mq('only screen and (min-width: 1825px)');

/*Scrollmagic pin sections*/
/*if(notMobile === true ){
			    var sectionDesign = new ScrollMagic.Scene({
			        triggerElement: designID,
			        triggerHook: 0,
							offset:-85,
			        duration: "100%"
			    })
			    .setPin(designID)
			    .addTo(controller);

			    var sectionBuild = new ScrollMagic.Scene({
			        triggerElement: buildID,
			        triggerHook: 0,
							offset:-85,
			        duration: "100%"
			    })
			    .setPin(buildID)
			    .addTo(controller);

			    var sectionDream= new ScrollMagic.Scene({
			        triggerElement: dreamID,
			        triggerHook: 0,
							offset:-85,
			        duration: "100%"
			    })
			    .setPin(dreamID)
			    .addTo(controller);


			    var sectionMap = new ScrollMagic.Scene({
			        triggerElement: mapID,
			        triggerHook: 0,
							offset: -85,
			        duration: "100%"
			    })
			    .setPin(mapID)
			    .addTo(controller);

			    var sectionAnvil = new ScrollMagic.Scene({
			        triggerElement: anvilID,
			        triggerHook: 0,
							offset: -85,
			        duration: "100%"
			    })
			    .setPin(anvilID)
			    .addTo(controller);

			    var sectionLeadership = new ScrollMagic.Scene({
			        triggerElement: leadershipID,
			        triggerHook: 0,
							offset: -85,
			        duration: "100%"
			    })
			    .setPin(leadershipID)
			    .addTo(controller);

			    var sectionPress = new ScrollMagic.Scene({
			        triggerElement: inthepressID,
			        triggerHook: 0,
							offset: -85,
			        duration: "100%"
			    })
			    .setPin(inthepressID)
			    .addTo(controller);
}

*/
////////////////////////////////
//Mapify Pro Plugin Additions//
////////////////////////////////

$(window).on("load", function() {//execute on load because of delay in Google API loading

	function preventDefault(e) {
	  e = e || window.event;
	  if (e.preventDefault)
	      e.preventDefault();
	  e.returnValue = false;
	}


	/*function disableScroll() {
  	   		$(document).on('scroll touchmove mousewheel', '#cboxOverlay', function(e){
				  e.preventDefault();
				  e.stopPropagation();
				  return false;
			});
  	}
*/
		$('#cboxContent').on( 'mousewheel DOMMouseScroll', function (e) {

		  var e0 = e.originalEvent;
		  var delta = e0.wheelDelta || -e0.detail;
			console.log("test");
		  this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
		  e.preventDefault();
		});


	function allowScroll(){
		 if (window.removeEventListener);
	        window.removeEventListener('DOMMouseScroll', preventDefault, false);
		    window.onmousewheel = document.onmousewheel = null;
		    window.onwheel = null;
		    window.ontouchmove = null;
		    document.onkeydown = null;
	}


	function disableScrollMap() {
		//check if tooltip visible and if map pop up is not showing, then disable scroll
		if($('.mpfy-tooltip').is(':visible') && $('.mpf-p-popup-holder').css('display') != 'block'){
			  if (window.addEventListener) // older FF
			  window.addEventListener('DOMMouseScroll', preventDefault, false);
			  window.onwheel = preventDefault; // modern standard
			  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
			  window.ontouchmove  = preventDefault;// mobile
		}else{
			 if (window.removeEventListener);
	        window.removeEventListener('DOMMouseScroll', preventDefault, false);
		    window.onmousewheel = document.onmousewheel = null;
		    window.onwheel = null;
		    window.ontouchmove = null;
		    document.onkeydown = null;
		}
	}

	function disableMapPopUpScroll(){
		if($('.mpf-p-popup-holder').css("display") != 'none'){ //only disable certain parts of the scroll if this is around.
			cboxOverlay.on('scroll touchmove mousewheel keydown', function(e){
				  e.preventDefault();
				  e.stopPropagation();
				  return false;
			});
		}
	};

	function blurBackground(){
		var test = $('.mpf-p-popup-holder').css("display"); //must define ahead of time, can't replace jquery Object with Var.
				if(test === 'block'){
					vcRow.fadeIn("slow", function(){$(this).addClass('vc_row-blur-background')});
				}else{
					vcRow.removeClass('vc_row-blur-background');
				}
	}

  //EVENT TRIGGERS for Blur and Scorll on Map only

		mapPin.on("click tap touchstart", function(){
			setTimeout(function(){
				blurBackground();
			},1000);
		});

		$(document).on('mousemove hover','holder.mpf-container', function(){
			blurBackground();
		});

		mapSection.on("mousewheel", disableScrollMap);

		$(document).on("mousewheel", ".mpfy-p-popup-background", function(){
			disableScrollMap();
			blurBackground();
		});



/////////////////////////////////////////////////////////////
//BLUR BACKGROUND and DISABLE BACKGROUND SCROLL ON POP UPS//
///////////////////////////////////////////////////////////

//plus sign on pop ups.
	jlfPlusSign.on('click tap touchstart', function(){
		vcRow.fadeIn("slow",function(){$(this).addClass('vc_row-blur-background');})
		setTimeout(function(){disableScroll();},1000);
	});
//Learn more link right above plus sign and the staff links
	cboxElement.on('click tap touchstart', function(){
		vcRow.fadeIn("slow",function(){$(this).addClass('vc_row-blur-background');})
		setTimeout(function(){disableScroll();},1000);
	});

	leadershipClickBox.on('click tap touchstart', function(){
		vcRow.fadeIn("slow",function(){$(this).addClass('vc_row-blur-background');})
		setTimeout(function(){disableScroll();},1000);
	});
/////////////////////////////////
//DISABLE BLUR and ALLOW SCROLL//
/////////////////////////////////

//must run through on handler because it is not loaded into the dom until after jlfplussign click event.
	$(document).on('click tap touchstart', '#cboxClose', function(){
		vcRow.removeClass('vc_row-blur-background');
		allowScroll();
	});

//different class name for map close button
	$(document).on('click tap touchstart', '.mpfy-p-close', function(){
	    vcRow.removeClass('vc_row-blur-background');
	    allowScroll();
	});

// allow scroll and remove blur if you click on the background of the pop ups.
	$(document).on('click tap touchstart', '#cboxOverlay', function(){
	    vcRow.removeClass('vc_row-blur-background');
	    allowScroll();
	});
// need a special function just for the map pop up remove blur and allow scroll when background clicked.
	$(document).on('click tap touchstart', '.mpfy-p-popup-background', function(){
		vcRow.removeClass('vc_row-blur-background');
	    allowScroll();
	});

//escape key turn off blur.
	$(document).keyup(function(e){
		if(e.keyCode === 27){
			$('.mpfy-p-close').trigger("click");
			vcRow.removeClass('vc_row-blur-background');
		};
	});




});



});
}());
