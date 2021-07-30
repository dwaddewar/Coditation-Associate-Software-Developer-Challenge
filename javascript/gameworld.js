var gGameLayout;


$(document).ready(function ()
{
	gGameLayout = new Array(20);
	for (var i = 0; i < gGameLayout.length; i++) {
	  gGameLayout[i] = new Array(25);
	}
	
   loadGameLayout();
   autoPlayMove();
   setTimeout(
	function(){ 
	   resetUI();
	   updateUI(); 
	}, 3000);

});

$(function () {
  $( "#digNote" ).dialog({
    autoOpen: false
  });
  
  $("#btnNote").click(function() {
    $("#digNote").dialog('open');
  });
});


function loadGameLayout()
{
  let count  =1;
  for(var i = 0;i< 20;i++){
	  for(var j= 0;j<25;j++){
		  if(isPrime(count)){
			gGameLayout[i][j] = 0;
		  }else{
			gGameLayout[i][j] = 1;  
		  }
		  count++;
	  }
  }
  updateUI();
}

function isPrime(pPostion) {	  
	let n, i, flag = true;
	n = pPostion;
	n = parseInt(n);
	for (i = 2; i <= n - 1; i++){
		if (n % i == 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

function autoPlayMove(){	
	lFutureLayout = new Array(20);
	for (var i = 0; i < lFutureLayout.length; i++) {
	  lFutureLayout[i] = new Array(25);
	}
	let M = lFutureLayout.length;
	let N = lFutureLayout[0].length;
	for (var l = 1; l < M - 1; l++)
	{
		for (var m = 1; m < N - 1; m++)
		{
			// finding no Of Neighbours that are alive
			var aliveNeighbours = 0;
			for (var i = -1; i <= 1; i++)
				for (var j = -1; j <= 1; j++)
					aliveNeighbours += gGameLayout[l + i][m + j];

			// The cell needs to be subtracted from
			// its neighbours as it was counted before
			aliveNeighbours -= gGameLayout[l][m];

			// Implementing the Rules of Life

			// Cell is lonely and dies
			if ((gGameLayout[l][m] == 1) && (aliveNeighbours < 2))
				lFutureLayout[l][m] = 0;

			// Cell dies due to over population
			else if ((gGameLayout[l][m] == 1) && (aliveNeighbours > 3))
				lFutureLayout[l][m] = 0;

			// A new cell is born
			else if ((gGameLayout[l][m] == 0) && (aliveNeighbours == 3))
				lFutureLayout[l][m] = 1;

			// Remains the same
			else
				lFutureLayout[l][m] = gGameLayout[l][m];
		}
	}
	gGameLayout = lFutureLayout;
}

function updateUI(){
	let cntrGameLayout = document.getElementById('cntrGameLayout');
  let table = document.createElement('table');
  table.setAttribute('border', '1');
  table.setAttribute('id', 'tblGameLayout');
  let tbody = document.createElement('tbody');
  let count = 1;
  for (var i = 0; i < 20; i++) {
    let tr = document.createElement('tr');
    for (var j = 0; j < 25; j++) {
		let td = document.createElement('td');
		if(gGameLayout[i][j] == 0){
		  td.style.backgroundColor  = '#d21111';
		}else{
		  td.style.backgroundColor  = '#74d216';
		}
		td.appendChild(document.createTextNode("A_"+count));
		tr.appendChild(td);	
		td.setAttribute('id', 'A_'+count);		
		count++;
    }
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  cntrGameLayout.appendChild(table);
}

function resetUI(){
  let tblGameLayout = document.getElementById("tblGameLayout");
  tblGameLayout.remove();
}
