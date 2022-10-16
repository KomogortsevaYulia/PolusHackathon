package ru.pochtifullstack.feature_map.internal.di

import dagger.Component
import ru.pochtifullstack.feature_map.api.MapDeps
import ru.pochtifullstack.feature_map.api.MapFragment
import javax.inject.Scope

@Scope
annotation class MapScope

@[MapScope Component(
    dependencies = [MapDeps::class]
)]
internal interface MapComponent {

    @Component.Factory
    interface Factory {

        fun create(
            mapDeps: MapDeps
        ): MapComponent
    }

    fun inject(mapFragment: MapFragment)
}