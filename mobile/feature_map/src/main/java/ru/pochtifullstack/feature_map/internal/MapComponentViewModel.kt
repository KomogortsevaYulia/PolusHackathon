package ru.pochtifullstack.feature_map.internal

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import ru.pochtifullstack.feature_map.api.mapDepsProvider
import ru.pochtifullstack.feature_map.internal.di.DaggerMapComponent
import ru.pochtifullstack.feature_map.internal.di.MapComponent

internal class MapComponentViewModel(
    application: Application
): AndroidViewModel(application) {

    val mapComponent: MapComponent by lazy {
        DaggerMapComponent.factory().create(
            mapDeps = application.mapDepsProvider.mapDeps
        )
    }
}