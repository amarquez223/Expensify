window.onload = function () {


const transactions = $('#chartContainer01').data('transactions');

let dataarray = [];

names = [];
let i,j;
for (i = 0; i < transactions.length; i++) {
	dataarray[i] = [];
	names.push(transactions[i][1][0]);
	for (j= 0; j < transactions[i].length; j++) {
		dataarray[i].push({
			y : transactions[i][j][3], 
			x : new Date(transactions[i][j][1],transactions[i][j][2] -1)
		})	
	}
}

const chart = new CanvasJS.Chart("chartContainer01", {
	backgroundColor: "#33373a",
	animationEnabled: true,
	/*title: {
		text: "Last 6 months",
		horizontalAlign: "left",
		fontFamily: "arial black",
		fontColor: "white"
	},*/
	legend: {
		fontColor: "white"
	},
	axisX: {
		interval: 1,
		intervalType: "month",
		labelFontColor: "white"
	},
	axisY: {
		valueFormatString: "$#0,,.M",
		labelFontColor: "white"
	},
	ToolTip: {
		shared: true,
		content: "{name}: {y}"
	},
	data: [
	{
		type: "stackedColumn",
		showInLegend: true,
		color: "#0033cc",
		name: names[0],
		dataPoints: dataarray[0]
	},
	{
		type: "stackedColumn",
		showInLegend: true,
		color: "#cc00cc",
		name: names[1],
		dataPoints: dataarray[1]
	},
	{
		type: "stackedColumn",
		showInLegend: true,
		color: "#ff9900",
		name: names[2],
		dataPoints: dataarray[2]
	},
	{
		type: "stackedColumn",
		showInLegend: true,
		color: "#009900",
		name: names[3],
		dataPoints: dataarray[3]
	}
	]
});
chart.render();

}