function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  var ktxaddress = new google.maps.LatLng(10.843607321509296, 106.79513762516697);
  var utc2address = new google.maps.LatLng(10.845854060340471,106.79454802852483);
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: ktxaddress,
  });
  directionsRenderer.setMap(map);

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };
  document.getElementById("start").addEventListener("change", onChangeHandler);
  document.getElementById("end").addEventListener("change", onChangeHandler);


  //Hiển thị thông tin
  const infowindow1 = new google.maps.InfoWindow({
    content:
      '<div id ="content" ><b>BuiVanManh</b><br>21 tuoi<br> ngay sinh: 07/03/2000<br> msv: 5951071057</div>',
    position: ktxaddress,
  });

  //Hiển thị thông tin
  const infowindow2 = new google.maps.InfoWindow({
    content:
      '<div id ="content" ><b>Phan hieu dai hoc giao thong van tai thanh pho Ho Chi Minh</b><br>451 Le Van Viet<br> Thanh lap: 32 nam <br> co khoa cong nghe thong tinh</div>',
                position: utc2address,
  });

  // Marker
  const marker = new google.maps.Marker({
    position: ktxaddress,
    title: "Ký túc xá",
    map: map,
    icon: "./photo/anh1.png",
  });

  const marker1 = new google.maps.Marker({
    position: utc2address,
    title: "Đại học GTVT Phân hiệu Tp.HCM",
    map: map,
    icon: "./photo/utc2.jpg",
  });

  
  google.maps.event.addListener(marker, "click", function () {
    infowindow1.open(map, marker);
  });
  google.maps.event.addListener(marker1, "click", function () {
    infowindow2.open(map, marker1);
  });
}

google.maps.event.addDomListener(window, "load", initMap);
function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  directionsService.route(
    {
      origin: {
        query: document.getElementById("start").value,
      },
      destination: {
        query: document.getElementById("end").value,
      },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}