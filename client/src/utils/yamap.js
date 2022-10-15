export function init(myMap) {
  var myPlacemark, myPlacemark2;
  // myMap = new window.ymaps.Map(
  //   "map",
  //   {
  //     center: [55.753994, 37.622093],
  //     zoom: 9,
  //   },
  //   {
  //     searchControlProvider: "yandex#search",
  //   }
  // );

  // Слушаем клик на карте.
  myMap.events.add("click", function (e) {
    var coords = e.get("coords");
    // Если метка уже создана – просто передвигаем ее.
    if (myPlacemark && !myPlacemark2) {
      console.log("2 метка", coords);
      myPlacemark2 = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark2);
      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark2.events.add("dragend", function () {
        getAddress(myPlacemark2.geometry.getCoordinates(), myPlacemark2);
      });
      getAddress(coords, myPlacemark2);
    }
    // Если нет – создаем.
    else if (!myPlacemark) {
      console.log("1 метка", coords);
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);
      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add("dragend", function () {
        getAddress(myPlacemark.geometry.getCoordinates(), myPlacemark);
      });
      getAddress(coords, myPlacemark);
    }
  });

  // Создание метки.
  function createPlacemark(coords) {
    return new window.ymaps.Placemark(
      coords,
      {
        iconCaption: "поиск...",
      },
      {
        preset: "islands#violetDotIconWithCaption",
        draggable: true,
      }
    );
  }

  // Определяем адрес по координатам (обратное геокодирование).
  function getAddress(coords, placemark) {
    placemark.properties.set("iconCaption", "поиск...");

    window.ymaps.geocode(coords).then(function (res) {
      var firstGeoObject = res.geoObjects.get(0);

      placemark.properties.set({
        // Формируем строку с данными об объекте.
        iconCaption: [
          // Название населенного пункта или вышестоящее административно-территориальное образование.
          firstGeoObject.getLocalities().length
            ? firstGeoObject.getLocalities()
            : firstGeoObject.getAdministrativeAreas(),
          // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise(),
        ]
          .filter(Boolean)
          .join(", "),
        // В качестве контента балуна задаем строку с адресом объекта.
        balloonContent: firstGeoObject.getAddressLine(),
      });
    });
  }
}
