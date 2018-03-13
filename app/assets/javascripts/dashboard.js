window.onload = function () {

// Toma la información enviada por el servidor
const transactions01 = $('#chartContainer01').data('transactions');

// Crea el arreglo que contendrá los arreglos de datos para la primer gráfica
let dataarray01 = [];

// Lee la información de transactions01
let i,j,k;
for (i = 0; i < transactions01.length; i++) {
	temp = [];
	for (j= 0; j < transactions01[i][2].length; j++) {
		// Asigna en el arreglo dataarray01 los  arreglos que requiere CanvasJS para el gráfico
		temp.push(
		{
				y : transactions01[i][2][j][2], 
				x : new Date(transactions01[i][2][j][0],transactions01[i][2][j][1] -1)
		})	
	}

	dataarray01.push(
	{
		type: "stackedColumn",
		showInLegend: true,
		color: transactions01[i][1],
		name: transactions01[i][0],
		dataPoints: temp
	});
}

// Crea la gráfica con base en los datos previos
const chart01 = new CanvasJS.Chart("chartContainer01", {
	backgroundColor: "#33373a",
	animationEnabled: true,
	
	// Nombres de los gastos en el eje X 
	legend: {
		fontColor: "white"
	},

	// Propiedades del Eje X
	axisX: {
		interval: 1,
		intervalType: "month",
		labelFontColor: "white"
	},

	// Propiedades del Eje Y
	axisY: {
		valueFormatString: "$#0,,.M",
		labelFontColor: "white"
	},

	// ToolTips al momento de pasar el cursor sobre el gŕafico
	toolTip: {
		shared: true,
		content: toolTipContent
	},

	// Los datos propiamente dichos
	data: dataarray01
});
chart01.render();

function toolTipContent(e) {
	var str = "";
	var total = 0;
	var str2, str3;
	for (var i = 0; i < e.entries.length; i++){
		var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong><br/>";
		total = e.entries[i].dataPoint.y + total;
		str = str.concat(str1);
	}
	str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"-"+((e.entries[0].dataPoint.x).getMonth()+1)+"</strong></span><br/>";
	total = Math.round(total * 100) / 100;
	str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong><br/>";
	return (str2.concat(str)).concat(str3);
}


// Toma la información enviada por el servidor
const transactions02 = $('#chartContainer02').data('transactions');

// Crea el arreglo que contendrá los arreglos de datos para la primer gráfica
let dataarray02 = [];

// Lee la información de transactions02
for (i = 0; i < transactions02.length; i++) {
	temp = [];
	for (j= 0; j < transactions02[i][2].length; j++) {
		temp.push({
			label : transactions02[i][2][j][0], 
			y : transactions02[i][2][j][1]
		})
	}	

	dataarray02.push({
		type: "column",
		name: transactions02[i][0],
		legendText: transactions02[i][0],
		color: transactions02[i][1],
		showInLegend: true, 
		dataPoints: temp
	})
}

const chart02 = new CanvasJS.Chart("chartContainer02", {
	backgroundColor: "#33373a",
	animationEnabled: true,
	toolTip: {
		shared: true
	},
	legend: {
		cursor:"pointer",
		itemclick: toggleDataSeries,
		fontColor: "white"
	},
	axisX: {
		title: "Día del mes actual",
		interval: 1,
		labelFontColor: "white"
	},
	axisY: {
		valueFormatString: "$#0,,.M",
		labelFontColor: "white"
	},
	data: dataarray02
});
chart02.render();

function toggleDataSeries(e) {
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
	chart02.render();
}

// Toma la información enviada por el servidor
const transactions03 = $('#chartContainer03').data('transactions');

// Crea el arreglo que contendrá los arreglos de datos para la primer gráfica
let dataarray03 = [];

// Lee la información de transactions03
temp = [];
for (i = 0; i < transactions03.length; i++) {
	temp.push({
		label : transactions03[i][0], 
		y : transactions03[i][1]
	})
}
	
dataarray03.push({
	type: "doughnut",
	startAngle: 60,
	//innerRadius: 60,
	indexLabelFontSize: 17,
	indexLabelFontColor: "white",
	indexLabel: "{label} - #percent%",
	toolTipContent: "<b>{label}:</b> {y} (#percent%)",
	dataPoints: temp
})

const chart03 = new CanvasJS.Chart("chartContainer03", {
	backgroundColor: "#33373a",
	animationEnabled: true,
	data: dataarray03
});
chart03.render();

// Toma la información enviada por el servidor
const transactions04 = $('#chartContainer04').data('transactions');

// Crea el arreglo que contendrá los arreglos de datos para la primer gráfica
let dataarray04 = [];

// Lee la información de transactions03
let names = [];
let colors = [];

names[0] = "Mes Anterior";
colors[0] = "#ff66cc";

names[1] = "Mes Actual";
colors[1] = "#66ffff";
for (i = 0; i < transactions04.length; i++) {
	temp = [];
	for (j = 0; j < transactions04[i].length; j++) {
		temp.push({
			x : transactions04[i][j][0], 
			y : transactions04[i][j][1]
		})
	}
	dataarray04.push({
		type: "splineArea",
		showInLegend: true,
		color: colors[i],
		name: names[i],
		dataPoints: temp
	})
}

console.log(dataarray04);

const chart04 = new CanvasJS.Chart("chartContainer04", {
	backgroundColor: "#33373a",
	animationEnabled: true,
	axisX :{
		interval: 1,
		labelFontColor: "white"
	},
	axisY :{
		valueFormatString: "#0,,.M",
		prefix: "$",
		labelFontColor: "white"
	},
	toolTip: {
		shared: true
	},
	legend: {
		fontColor: "white"
	},
	data: dataarray04
});

chart04.render();


}