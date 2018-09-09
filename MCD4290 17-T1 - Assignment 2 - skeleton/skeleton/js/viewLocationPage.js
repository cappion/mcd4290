// Code for the View Location page.

// This is sample code to demonstrate navigation.
// You need not use it for final app.
var weatherList=document.getElementById('weather-list')
var coordinate={}
var getLocation =  function(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var lontitude = results[0].geometry.location.lng();
      var latLon={
          lat:latitude,
          lng:lontitude
      }
      localStorage.setItem('lat',latitude)
      localStorage.setItem('lon',lontitude)
      coordinate.lat=latitude
      coordinate.lng=lontitude
      
      coordinateToString=JSON.stringify(coordinate)
      localStorage.setItem('coordinate',coordinateToString)
      var mapOptions = {
          center: new google.maps.LatLng(latitude,lontitude),
          zoom: 15,
          mapTypeId: 'roadmap'
      }
      setMarker(map)
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      }
  });
}
function setMarker(map){
    var image = {
        url:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
        size: new google.maps.Size(20, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 32)
    }
    var marker = new google.maps.Marker({
        
        position: JSON.parse(localStorage.getItem('coordinate')),
        map: map,
        icon:image,
        title: 'Hello World!'
        });
}


    console.log(localStorage.getItem('lat')+','+localStorage.getItem('lon'))
    
var locationIndex = JSON.parse(localStorage.getItem(APP_PREFIX + "-selectedLocation"));
if(locationIndex<2){
    locationIndex+=1
}
console.log(locationIndex)

        var something=localStorage.getItem('inputLocation'+locationIndex)
        console.log(localStorage.getItem('inputLocation'+locationIndex))

        //Call the function with address as paramete
    
        getLocation(localStorage.getItem('inputLocation'+locationIndex))
    

    // If a location name was specified, use it for header bar title.
    document.getElementById("headerBarTitle").textContent =localStorage.getItem('inputLocation'+locationIndex);


function moveLocation(){
    locationIndex++
    localStorage.removeItem('inputLocation'+locationIndex)
    location.href='index.html'
}
//add and check the date

function addCheckDate(){
     var day=Number(document.getElementById("day").value)
    var month=Number(document.getElementById("month").value)
    var year=Number(document.getElementById("year").value)
    console.log(day)
    console.log(month)
    console.log(year)
    var inputdate = new Date(year,month-1,day) //你要用正则成功的截取正确格式的参数，并注意月份和实际输入的相差1
    if(Math.abs(inputdate - new Date()) > 365*24*3600*1000){
        alert("Wrong date! Only the last 12 months from today!")
    }
    else{
        if(day<10){
            day='0'+day
        }
        if(month<10){
            var date=year+'-'+0+month+'-'+day
            }
        else{
            var date=year+'-'+month+'-'+day
        }
        console.log(date)
    }
    if(month===1||month===3||month===5||month===7||month===8||month===10||month===12){
        if(day>31||day<1){
            return alert("Wrong date!")
        }
    }
    else if(month===4||month===6||month===9||month===11){
        if(day>30||day<1){
            return alert("wrong date!")
        }
    }
    else if(year%4===0&&year%100!==0){
        if(month===2){
            if(day<1||day>29){
            return alert("Wrong date!")
            }
        }
    }
    else if(year%400===0&&year%100!==0){
        if(month===2){
            if(day<1||day>29){
            return alert("Wrong date!")
            }
        }
    }
    else if(year%4!==0||year%400!==0){
        if(month===2){
            if(day<1||day>28){
                return alert("Wrong date!")
            }
        }
    }
    if(month===09||month===10||month===11){
document.getElementById('season information').innerHTML='Spring'
    }
    else if(month===12||month===01||month===02)
    {
document.getElementById('season information').innerHTML='Summer'
    }
    else if(month===03||month===04||month===05){
document.getElementById('season information').innerHTML='Autumn'
    }
    else if(month===06||month===07||month===08){
document.getElementById('season information').innerHTML='Winter'
    }
    var time={
 
        year:year,
        month:month,
        day:day
        
    }
    localStorage.setItem('time',JSON.stringify(time))

    var lan=JSON.parse(localStorage.getItem('lat'))
    var lon=JSON.parse(localStorage.getItem('lon'))
    
    console.log(date)
    var url="https://api.darksky.net/forecast/aa955778362d3863db5b9a8f08bfabaf/"+lan+","+lon+','+date+'T12:00:00'+"?exclude=currently,minutely,hourly,flags"+"&callback=urlCallback"
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    
    
    var cropname=JSON.parse(localStorage.getItem('cropinfo'))
    console.log(cropname.data[0].name)
    document.getElementById('cropname1').innerHTML=cropname.data[0].name
    document.getElementById('minimum1').innerHTML=cropname.data[0].mintemp
    document.getElementById('maximum1').innerHTML=cropname.data[0].maxtemp
    document.getElementById('season1').innerHTML=cropname.data[0].season
    if(cropname.data[1].name!=null){
         document.getElementById('cropname2').innerHTML=cropname.data[1].name
         document.getElementById('minimum2').innerHTML=cropname.data[1].mintemp
         document.getElementById('maximum2').innerHTML=cropname.data[1].maxtemp
         document.getElementById('season2').innerHTML=cropname.data[1].season
    }
    if(cropname.data[2].name!=null){
         document.getElementById('cropname3').innerHTML=cropname.data[2].name
         document.getElementById('minimum3').innerHTML=cropname.data[2].mintemp
         document.getElementById('maximum3').innerHTML=cropname.data[2].maxtemp
         document.getElementById('season3').innerHTML=cropname.data[2].season
         console.log(cropname.data[2].season+cropname.data[3].season)
    }
    if(cropname.data[3].name!=null){
         document.getElementById('cropname4').innerHTML=cropname.data[3].name
         document.getElementById('minimum4').innerHTML=cropname.data[3].mintemp
         document.getElementById('maximum4').innerHTML=cropname.data[3].maxtemp
         document.getElementById('season4').innerHTML=cropname.data[3].season
    }
    
    
    
}
  var minTemp=document.getElementById("minTemp")
     var maxTemp=document.getElementById("maxTemp")
function urlCallback(weatherInfo){
    var weather=weatherInfo
    
    var tempInfo={
        min:Math.round((weather.daily.data[0].temperatureMin-32)*5/9),
        max:Math.round((weather.daily.data[0].temperatureMax-32)*5/9)
    }
    console.log(tempInfo)
 var weatherinformation=document.getElementById("weather information")
    weatherinformation.innerHTML=tempInfo.min+'&#176'+'C'+'~'+tempInfo.max+'&#176'+'C'
    localStorage.setItem('weatherinfo',JSON.stringify(tempInfo))
    result(1,'result1')
    result(2,'result2')
    result(3,'result3')
    result(4,'result4')
}
function result(cropNameId, resultId,){
    var cropname=JSON.parse(localStorage.getItem('cropinfo'))
    var idC=cropNameId
    
    var idR=resultId
    console.log(idR)
    var cropName=cropname.data[idC-1].name
    
    var minTempCrop=cropname.data[idC-1].mintemp
    var maxTempCrop=cropname.data[idC-1].maxtemp
    var offTemp=cropname.data[idC-1].offset
    var tolerance=cropname.data[idC-1].tolerance
    var weatherInfo=JSON.parse(localStorage.getItem('weatherinfo'))
    var minTemp=weatherInfo.min
    var maxTemp=weatherInfo.max
    if((minTempCrop<=minTemp&&maxTempCrop>=maxTemp)&&minTemp<maxTempCrop){
        document.getElementById(idR).innerHTML=cropName+' will have a high yield.'+'&#8211'+' where both high and low temperatures are within the safe range.'
    }
    else if(minTemp>minTempCrop&&minTemp<maxTempCrop&&maxTemp-maxTempCrop<offTemp){
        document.getElementById(idR).innerHTML=cropName+' will survive but have low yield.'+'&#8211'+' where high or low temperatures are outside the safe range but not far enough to be dangerous.'
    }
    else if(maxTemp>minTempCrop&&maxTemp<maxTempCrop&&minTempCrop-minTemp<offTemp){
        document.getElementById(idR).innerHTML=cropName+' will survive but have low yield.'+'&#8211'+' where high or low temperatures are outside the safe range but not far enough to be dangerous.'
    }
    else{
        document.getElementById(idR).innerHTML=cropName+' will perish after '+ tolerance +'days.'+'&#8211'+'where either the max or min temperature is in the dangerous range. In this case, '+tolerance+' is the number of days the crop would survive'
    }
}
console.log(123)
