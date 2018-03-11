window.onload = function () {

// Toma la información enviada por el servidor
const transactions01 = $('#chartContainer01').data('transactions');

// Crea el arreglo que contendrá los arreglos de datos para la primer gráfica
let dataarray01 = [];

// Lee la información de transactions01
names = [];
let i,j;
for (i = 0; i < transactions01.length; i++) {
	dataarray01[i] = [];

	// Asigna en el arreglo names los labels de los gastos
	names.push(transactions01[i][1][0]);

	for (j= 0; j < transactions01[i].length; j++) {
		// Asigna en el arreglo dataarray01 los  arreglos que requiere CanvasJS para el gráfico
		dataarray01[i].push({
			y : transactions01[i][j][3], 
			x : new Date(transactions01[i][j][1],transactions01[i][j][2] -1)
		})	
	}
}

// Crea la gráfica con base en los datos previos
const chart = new CanvasJS.Chart("chartContainer01", {
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
	data: [
	{
		type: "stackedColumn",
		showInLegend: true,
		color: "#0033cc",
		name: names[0],
		dataPoints: dataarray01[0]
	},
	{
		type: "stackedColumn",
		showInLegend: true,
		color: "#cc00cc",
		name: names[1],
		dataPoints: dataarray01[1]
	},
	{
		type: "stackedColumn",
		showInLegend: true,
		color: "#ff9900",
		name: names[2],
		dataPoints: dataarray01[2]
	},
	{
		type: "stackedColumn",
		showInLegend: true,
		color: "#009900",
		name: names[3],
		dataPoints: dataarray01[3]
	}
	]
});
chart.render();

function toolTipContent(e) {
	var str = "";
	var total = 0;
	var str2, str3;
	for (var i = 0; i < e.entries.length; i++){
		var  str1 = "<span style= \"color:"+e.entries[i].dataSeries.color + "\"> "+e.entries[i].dataSeries.name+"</span>: $<strong>"+e.entries[i].dataPoint.y+"</strong>bn<br/>";
		total = e.entries[i].dataPoint.y + total;
		str = str.concat(str1);
	}
	str2 = "<span style = \"color:DodgerBlue;\"><strong>"+(e.entries[0].dataPoint.x).getFullYear()+"-"+((e.entries[0].dataPoint.x).getMonth()+1)+"</strong></span><br/>";
	total = Math.round(total * 100) / 100;
	str3 = "<span style = \"color:Tomato\">Total:</span><strong> $"+total+"</strong>bn<br/>";
	return (str2.concat(str)).concat(str3);
}


}