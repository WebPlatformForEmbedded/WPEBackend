function unfold_current_page(base_name) {
	var this_panel = $('#site-navigation .panel-collapse[data-nav-ref="' + base_name + '"]');
	var this_panel_body = $('#site-navigation .sidenav-ref[data-nav-ref="' + base_name + '"]');
	var panels_to_unfold = $(this_panel).parents("#site-navigation .panel-collapse");
	panels_to_unfold.addClass("panel-body-current").parent().addClass('sidenav-panel-current');
	this_panel.addClass("panel-body-current").parent().addClass('sidenav-panel-current');

	$(this_panel_body).attr("href", utils.hd_context.hd_basename + "#");

	panels_to_unfold.collapse("show");
	this_panel.collapse("show");

	return this_panel;
}

function sitemap_downloaded_cb(html_sitemap) {
	$("#sidenav").html(html_sitemap);
	var wrapper = $("#sitenav-wrapper");
	var this_panel = unfold_current_page(utils.hd_context.extension + "-" + utils.hd_context.project_name + "-" + utils.hd_context.hd_basename);

	wrapper.mCustomScrollbar({"scrollInertia": 0,
				  "theme": "minimal",
				  "mouseWheel":{ "preventDefault": true },
				  "documentTouchScroll": false});

	if ($(this_panel).length) {
		wrapper.mCustomScrollbar("scrollTo", this_panel.offset().top - wrapper.offset().top - $('#topnav').height() + 8);
	}
}

$(document).ready(function() {
	setupFilters();

	$("#toc-wrapper").mCustomScrollbar({"scrollInertia": 0,
					    "theme": "dark",
					    "mouseWheel":{ "preventDefault": true },
					    "documentTouchScroll": false});

	$("#main").swipe({
		swipe:function(event, direction, distance, duration, fingers)
		{
			console.log(direction, distance, duration, fingers);
			if (direction == "right") {
				if ($("body").hasClass("toc-expanded"))
					$("body").removeClass("toc-expanded");
				else
					$("body").addClass("sitenav-expanded");
				return false;
			}
			if (direction == "left") {
				if ($("body").hasClass("sitenav-expanded"))
					$("body").removeClass("sitenav-expanded");
				else
					$("body").addClass("toc-expanded");
				return false;
			}
		},
		allowPageScroll: "vertical",
		fallbackToMouseEvents: false,
		excludedElements: "button, input, select, textarea, a, .noSwipe, pre",
	});

	$("#body").click(function(e) {
		$("body").removeClass("toc-expanded");
		$("body").removeClass("sitenav-expanded");
	});

	$("#sidenav-toggle").click(function(e) {
		$("body").removeClass("toc-expanded");
		$("body").toggleClass("sitenav-expanded");
	});

	$("#toc-toggle").click(function(e) {
		$("body").removeClass("sitenav-expanded");
		$("body").toggleClass("toc-expanded");
	});
});
