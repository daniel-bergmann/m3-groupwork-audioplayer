function openCity(cityName,elmnt,color) {
  var i, container, tablinks;
  container = document.getElementsByClassName("container");
  for (i = 0; i < container.length; i++) {
    container[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(cityName).style.display = "block";
  elmnt.style.backgroundColor = color;  
}
function menu() {
  alert('sjsj')
}
// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();