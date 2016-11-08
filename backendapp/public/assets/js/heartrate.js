function e(val,timestamp) {
	data = t(val,timestamp);
	//alert(data);
	o.setData([data]);
	o.draw();
	//setTimeout(e, i)
}

function t(value,timestamp) {
	if(n.length>150) {
		n=n.slice(1)
	}
	
	while(n.length<r) {
		/*var e=n.length>0?n[n.length-1]: 50;
		var t=e+Math.random()*10-5;
		if(t<0) {
			t=0
		}
		if(t>100) {
			t=100
		}
		*/
		n.push(0)
	}
	n.push(value);
	var i=[];
	for(var s=0;s<n.length;++s) {
		i.push([s, n[s]])
	}
	return i
}

if($("#live-updated-chart").length!==0) {
	var n=[],
	r=150;
	var i=1000;
	$("#updateInterval").val(i).change(function() {
		var e=$(this).val();
		if(e&&!isNaN(+e)) {
			i=+e;
			if(i<1) {
				i=1
			}
			if(i>2e3) {
				i=2e3
			}
			$(this).val(""+i)
		}
	}
	);

	var s= {
		series: {
			shadowSize:0,
			color:"purple",
			lines: {
				show: true, fill: true
			}
		}
		,
		yaxis: {
			min: 0, max: 200, tickColor: "#ddd"
		}
		,
		xaxis: {
			show: true, tickColor: "#ddd"
		}
		,
		grid: {
			borderWidth: 1, borderColor: "#ddd"
		}
	}
	;
	var o =$.plot($("#live-updated-chart"), [t(0)], s);
	e(0)
}

function setHeartRateData(evt){
	var rate = evt["heartRate"];
	//var timestamp = evt["timestamp"];
	//var quality = evt["quality"];

	e(rate);
	$("#currentrate").text(rate+" bpm");


}
//getHeartRate();
var intveral;

var socket = io('http://192.168.0.58:3000');

socket.on('connect', function() {
	socket.on('heartrate', function(data) {
		//console.log(data);
		setHeartRateData(data);
	});
});
