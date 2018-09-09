// Code for the Add Crop page.
var cropsList=['corn','tomatoes','leek','wheat']
var addTimes=0
var searchtime=0
var corparray=[]
var hintcrop=0
 var   definecrop= JSON.parse(localStorage.getItem('hintcrop'))
 if(definecrop!=0){
     hintcrop=definecrop
 }

function addCrops()
{
    addTimes++
	var correct=0
    var inputCrops=document.getElementById("cropname").value
    
	for (var i=0;i<cropsList.length; i++)
    {
		if (inputCrops ===cropsList[i])
        {
			cropsList.splice(i,1)
            correct++
		}
		
	}
	if(correct===0)
    {
		alert("Wrong input! Please try again!")
        hintcrop--
        return 
    }
    //setItem to localstorage as a singal for main page
//create new block to show input crops
    var minTemp=document.getElementById("minTemp").value
    var season=document.getElementById("season").value
    var maxTemp=document.getElementById("maxTemp").value
    var lowYieldOff=document.getElementById("Offset").value
    var tolerance=document.getElementById("tolerance").value
    var cropInfo={
        name: inputCrops,
        season:season,
        mintemp:minTemp,
        maxtemp:maxTemp,
        offset:lowYieldOff,
        tolerance:tolerance
    }
     hintcrop++
    console.log(hintcrop)
    console.log(corparray.length)
    if(hintcrop>1){
       var class1=JSON.parse(localStorage.getItem('cropinfo'))
       console.log(class1)
        corparray=class1.data
        console.log(corparray)
        
    }
    corparray.push(cropInfo)
    
    var cropdata={
        data:corparray
    }
    localStorage.setItem('cropinfo',JSON.stringify(cropdata))
searchtime++
      localStorage.setItem('hintcrop',hintcrop)
}

