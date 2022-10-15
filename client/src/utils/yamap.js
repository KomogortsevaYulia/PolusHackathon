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

export function createMultiRoute (myMap) {
  /**
   * Создаем мультимаршрут.
   * Первым аргументом передаем модель либо объект описания модели.
   * Вторым аргументом передаем опции отображения мультимаршрута.
   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml
   */
  var multiRoute = new window.ymaps.multiRouter.MultiRoute({
      // Описание опорных точек мультимаршрута.
      referencePoints: [
          [55.734876, 37.59308],
          "Москва, ул. Мясницкая"
      ],
      // Параметры маршрутизации.
      params: {
          // Ограничение на максимальное количество маршрутов, возвращаемое маршрутизатором.
          results: 2
      }
  }, {
      // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
      boundsAutoApply: true
  });
  
  // Создаем кнопки для управления мультимаршрутом.
  var trafficButton = new ymaps.control.Button({
          data: { content: "Учитывать пробки" },
          options: { selectOnClick: true }
      }),
      viaPointButton = new ymaps.control.Button({
          data: { content: "Добавить транзитную точку" },
          options: { selectOnClick: true }
      });

  // Объявляем обработчики для кнопок.
  trafficButton.events.add('select', function () {
      /**
       * Задаем параметры маршрутизации для модели мультимаршрута.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml#setParams
       */
      multiRoute.model.setParams({ avoidTrafficJams: true }, true);
  });

  trafficButton.events.add('deselect', function () {
      multiRoute.model.setParams({ avoidTrafficJams: false }, true);
  });

  viaPointButton.events.add('select', function () {
      var referencePoints = multiRoute.model.getReferencePoints();
      referencePoints.splice(1, 0, "Москва, ул. Солянка, 7");
      /**
       * Добавляем транзитную точку в модель мультимаршрута.
       * Обратите внимание, что транзитные точки могут находится только
       * между двумя путевыми точками, т.е. не могут быть крайними точками маршрута.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRouteModel.xml#setReferencePoints
       */
      multiRoute.model.setReferencePoints(referencePoints, [1]);
  });

  viaPointButton.events.add('deselect', function () {
      var referencePoints = multiRoute.model.getReferencePoints();
      referencePoints.splice(1, 1);
      multiRoute.model.setReferencePoints(referencePoints, []);
  });

  // Создаем карту с добавленными на нее кнопками.
  var myMap = new ymaps.Map('map', {
      center: [55.750625, 37.626],
      zoom: 7,
      controls: [trafficButton, viaPointButton]
  }, {
      buttonMaxWidth: 300
  });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);
}
