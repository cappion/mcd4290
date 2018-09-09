// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName);
    // And load the view location page.
    location.href = 'viewLocation.html';
}
function addLocationBlock(i) {
    var div = document.createElement('LI');
    div.className = 'row';
    div.innerHTML =             ' <li class="mdl-list__item mdl-list__item--two-line" onclick="viewLocation('+i+')">'+
               ' <span class="mdl-list__item-primary-content">'+
                '  <img class="mdl-list__item-icon" id="icon1" src="images/loading.png" class="list-avatar" />'+
              '    <span id='+'location'+i+'>Location B</span>'+
                 ' <span id=weather'+i+' class="mdl-list__item-sub-title">Weather Summary</span>'+
              '  </span>'+
             ' </li>'

    document.getElementById('next location').appendChild(div);
    console.log(11)
} 
function addCropTable(i) {
    var div = document.createElement('LI');

    div.className = 'row';

    div.innerHTML ='<li class="mdl-list__item mdl-list__item--two-line" onclick="deleteCrop(0);">'+'<span class="mdl-list__item-primary-content">'+'<img class="mdl-list__item-icon" id="icon" src="images/loading.png" class="list-avatar" />'+'<span id=CropName'+i+'>Crop A</span>'+ '<span id=crop'+i+' class="mdl-list__item-sub-title">Crop name</span>'+'</span>'+'</li>'
    document.getElementById('next crop').appendChild(div);
    console.log(12)
} 
//get singal getNewCrop and to see if change the crop name in main page 
 var getNewCrop=localStorage.getItem('add new crop')
 if(getNewCrop!=null){
   document.getElementById("crop0").innerHTML=getNewCrop

 }
//get singal getNewLocation and to see if change the location name in main page 
var getHint=JSON.parse(localStorage.getItem('hintcrop'))
var hint=JSON.parse(localStorage.getItem('hint'))
var cropClass=JSON.parse(localStorage.getItem('cropinfo'))
for(var i=0;i<getHint;i++){
    
    var cropName=cropClass.data[i].name
    console.log(cropName)
    console.log(getHint)
    if(i>0){
        addCropTable(i)
        console.log(789)
    }
    if(cropName!=null){
    document.getElementById('CropName'+i).innerHTML=cropName
    }
}

for(var i=1;i<hint+1;i++){
    var location1=localStorage.getItem('inputLocation'+i)
    console.log(location1)
    if(i>2){
        addLocationBlock(i)
    }

document.getElementById('location'+i).innerHTML=location1
    }





var hintcrop=JSON.parse(localStorage.getItem('hintcrop'))
var cropInfo=JSON.parse(localStorage.getItem('cropinfo'))
for(var i=0;i<cropInfo.data.length;i++){
document.getElementById('crop'+i).innerHTML='Name: '+cropInfo.data[i].name+'; Season: '+cropInfo.data[0].season+'; Safe temperature range: '+ cropInfo.data[i].mintemp+'&#176'+'C to '+cropInfo.data[i].maxtemp+'&#176'+'C; '+'Low yield offset: '+cropInfo.data[i].offset+'&#176'+'C; '+'Tolerance: '+cropInfo.data[i].tolerance+' days.'
}

//current weather
var hintforlocation=JSON.parse(localStorage.getItem('hint'))+1
console.log(hintforlocation)
for(var i=0;i<hintforlocation;i++){
    console.log(localStorage.getItem('inputLocation'+i))
getLocation(localStorage.getItem('inputLocation'+i))
var lan=JSON.parse(localStorage.getItem('lat')) 
var lon=JSON.parse(localStorage.getItem('lon'))
var date=date()
console.log(date)
var url="https://api.darksky.net/forecast/aa955778362d3863db5b9a8f08bfabaf/"+lan+","+lon+"?exclude=currently,minutely,hourly,flags"+"&callback=urlCallback"
    var script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
    var currentWeather=JSON.parse(localStorage.getItem('weather'))
    document.getElementById('weather'+i).innerHTML='Temperature: '+ currentWeather.min+'&#176'+'C'+currentWeather.max+'&#176'+'C'
}


    



var getLocation =  function(address) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var lontitude = results[0].geometry.location.lng();
      localStorage.setItem('lat',latitude)
      localStorage.setItem('lon',lontitude)
      coordinate.lan=latitude
      coordinate.lon=lontitude
      coordinateToString=JSON.stringify(coordinate)
      localStorage.setItem('coordinate',coordinateToString)
      var mapOptions = {
    center: new google.maps.LatLng(latitude,lontitude),
    zoom: 15,
     mapTypeId: 'roadmap'
}
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      }  
    
  });

}
function urlCallback(weatherInfo){
    var weather=weatherInfo
    
    var tempInfo={
        min:Math.round((weather.daily.data[0].temperatureMin-32)*5/9),
        max:Math.round((weather.daily.data[0].temperatureMax-32)*5/9)
    }
    localStorage.setItem('weather',JSON.stringify(tempInfo))
    }