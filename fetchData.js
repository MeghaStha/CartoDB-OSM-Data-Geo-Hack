$(document).ready(function() {

	Days = {
		0: '2012-10-10',
		1: '2012-10-11',
		2: '2012-10-12',
		3: '2012-10-13',
		4: '2012-10-14',
		5: '2012-10-15',
	};

	IndividualDays = {
		0: 'http://geomatbiplov.cartodb.com/api/v2/viz/6138d928-a772-11e4-880d-0e853d047bba/viz.json',
		1: 'http://geomatbiplov.cartodb.com/api/v2/viz/fd1db750-a772-11e4-bd2e-0e4fddd5de28/viz.json',
		2: 'http://geomatbiplov.cartodb.com/api/v2/viz/6138d928-a772-11e4-880d-0e853d047bba/viz.json',
		3: 'http://geomatbiplov.cartodb.com/api/v2/viz/fd1db750-a772-11e4-bd2e-0e4fddd5de28/viz.json',
		4: 'http://geomatbiplov.cartodb.com/api/v2/viz/6138d928-a772-11e4-880d-0e853d047bba/viz.json',
		5: 'http://geomatbiplov.cartodb.com/api/v2/viz/fd1db750-a772-11e4-bd2e-0e4fddd5de28/viz.json'
	};

	config = {
		"number-of-days": 4
	};

	var loader = new cdb.geo.ui.TilesLoader({
		template: function() {
			return '<div class="loader"></div>'
		}
	});

	function Map() {

		var map = new L.Map('map', {
			zoomControl: true,
			center: [27.6825, 84.4286],
			zoom: 13
		});

		return map;
	}

	function Base() {

		return L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
			attribution: 'Stamen'
		});
	}

	function TableContent(jsonData, invert) {
		var content = $('<div></div>').addClass('table-content');
		for (row in jsonData) {
			var tableRow = $('<div></div>').addClass('table-row').append(function() {
				return jsonData[row] ? $("<div></div>").text(jsonData[row]['name_of_features']).append($("<div></div>").text(jsonData[row]['counts'])) : "";
			});
			invert ? tableRow.prependTo(content).addClass(row) : tableRow.appendTo(content).addClass(row);
		}
		return $(content)[0];
	}


	function Table(json) {
		return $('<div></div>').append($('<div class="title"></div>').text('Summary')).addClass('table-container').append(new TableContent(json.rows));
	}

	function cartoDBVis(link) {
		return cartodb.createLayer(map, link);
	}

	function cartoDBLayerSelector(query) {
		return cartodb.createLayer(map, {
			user_name: 'geomatbiplov',
			type: 'cartodb',
			sublayers: [{
				sql: query,
				cartocss: '#polygon {polygon-fill: #DD00FF;}'
			}]
		});
	}

	function LayerRemover() {
		map.eachLayer(function(layer) {
			map.removeLayer(layer);
		});
	}

	var scaleContainer = $('<div></div>').addClass('dayscale-container');
	var scaleRuler = $('<div></div>').addClass('dayscale-ruler');
	scaleRuler.appendTo(scaleContainer);
	var scaleMarkings = new Array();

	for (var i = 0; i < config['number-of-days']; ++i) {
		scaleMarkings[i] = $('<div></div>').addClass('dayscale-markings');
		scaleMarkings[i].appendTo(scaleRuler);
	}
	//scaleContainer.appendTo('body');

	function IndividualSliderAdding() {

		if ($('#toolTipSlider').length) {
			$('#toolTipSlider').remove();
		}

		if ($('#slider2').length) {
			$('#slider2').remove();
		}

		var tooltip = $('<div id="toolTipSlider" />');
		tooltip.text("Day 0");

		var slider1 = $('<div id="slider1"/>');

		slider1.appendTo(scaleRuler);

		scaleContainer.appendTo('body');

		LayerRemover();

		Base().addTo(map);

		cartoDBVis(IndividualDays[1]).addTo(map);

		$.getJSON('http://geomatbiplov.cartodb.com/api/v2/sql/?q=SELECT * FROM summary', function(data) {
			new Table(data).appendTo("body")
		});


		slider1.slider({
			min: 0,
			max: 5,
			slide: function(event, ui) {

				if ($.inArray(ui.value, Object.keys[Days])) {
					tooltip.text("Day " + ui.value);

					LayerRemover();

					Base().addTo(map);

					cartoDBVis(IndividualDays[ui.value]).addTo(map);

					$.getJSON('http://geomatbiplov.cartodb.com/api/v2/sql/?q=SELECT * FROM summary', function(data) {
						new Table(data).appendTo("body")
					});
				}
			}

		}).find(".ui-slider-handle").append(tooltip).hover(function() {
			tooltip.show();
		});

	}

	function AggregrateSliderAdding() {

		if ($('#slider1').length) {
			$('#slider1').remove();
		}

		if ($('#toolTipSlider').length) {
			$('#toolTipSlider').remove();
		}

		var slider2 = $('<div id="slider2" />').appendTo(scaleRuler);

		scaleContainer.appendTo('body');

		var tooltip = $('<div id="toolTipSlider" />');
		tooltip.text("Day 0");

		LayerRemover();

		Base().addTo(map);

		cartoDBLayerSelector("SELECT * FROM building WHERE date(timestamp) = date'" + Days[1] + "'").addTo(map);

		$.getJSON('http://geomatbiplov.cartodb.com/api/v2/sql/?q=SELECT * FROM summary', function(data) {
			new Table(data).appendTo("body")
		});


		slider2.slider({
			min: 0,
			max: 5,
			slide: function(event, ui) {

				if ($.inArray(ui.value, Object.keys[Days])) {
					tooltip.text("Day " + ui.value);

					LayerRemover();

					Base().addTo(map);

					cartoDBLayerSelector("SELECT * FROM building WHERE date(timestamp) > date'" + Days[1] + "'" + "+" + ui.value).addTo(map);

					$.getJSON('http://geomatbiplov.cartodb.com/api/v2/sql/?q=SELECT * FROM summary', function(data) {
						new Table(data).appendTo("body")
					});
				}
			}

		}).find(".ui-slider-handle").append(tooltip).hover(function() {
			tooltip.show();
		});

	}

	var map, base;
	map = Map();
	IndividualSliderAdding();

	$("#button1").click(function() {
		$(this).hide();
		$('#button2').show();
		//$("#button2").css('display','inline-block');
		AggregrateSliderAdding();
		//$('.titled').text("Aggregrate Changes");
	});

	$("#button2").click(function() {
		$(this).hide();
		$('#button1').show();
		//$("#button1").css('display','inline-block');
		IndividualSliderAdding();
		//$('.titled').text("Day-Wise Changes");
	});



});