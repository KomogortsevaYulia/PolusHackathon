export function createtwoPlacemark(myMap) {
  var myPlacemark, myPlacemark2;

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
        createMultiRoute(myMap, myPlacemark, myPlacemark2);
        getAddress(myPlacemark2.geometry.getCoordinates(), myPlacemark2);
        myMap.geoObjects.add(myPlacemark);
        myMap.geoObjects.add(myPlacemark2);
      });

      createMultiRoute(myMap, myPlacemark, myPlacemark2);
      getAddress(coords, myPlacemark2);
      myMap.geoObjects.add(myPlacemark);
      myMap.geoObjects.add(myPlacemark2);
    }
    // Если нет – создаем.
    else if (!myPlacemark) {
      console.log("1 метка", coords);
      myPlacemark = createPlacemark(coords);
      myMap.geoObjects.add(myPlacemark);

      // Слушаем событие окончания перетаскивания на метке.
      myPlacemark.events.add("dragend", function () {
        createMultiRoute(myMap, myPlacemark, myPlacemark2);
        getAddress(myPlacemark.geometry.getCoordinates(), myPlacemark);
        myMap.geoObjects.add(myPlacemark);
        myMap.geoObjects.add(myPlacemark2);
      });

      // createMultiRoute(myMap, myPlacemark, myPlacemark2);
      getAddress(coords, myPlacemark);
      // myMap.geoObjects.add(myPlacemark);
      // myMap.geoObjects.add(myPlacemark2);
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

  return({myPlacemark,myPlacemark2})
}

export function createMultiRoute(myMap, mark1, mark2) {
  var multiRoute = new window.ymaps.multiRouter.MultiRoute(
    {
      // Описание опорных точек мультимаршрута.
      referencePoints: [
        mark1.geometry.getCoordinates(),
        mark2.geometry.getCoordinates(),
      ],
      // Параметры маршрутизации.
      params: {
        // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
        results: 2,
      },
    },
    {
      // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
      boundsAutoApply: true,
    }
  );

  myMap.geoObjects.removeAll();
  myMap.geoObjects.add(multiRoute);
}
