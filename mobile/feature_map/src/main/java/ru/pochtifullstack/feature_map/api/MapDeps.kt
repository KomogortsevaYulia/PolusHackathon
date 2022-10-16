package ru.pochtifullstack.feature_map.api

import android.app.Application
import android.content.Context
import ru.pochtifullstack.core_domain.repository.RequestsRepository

interface MapDeps {

    val requestRepository: RequestsRepository
}

interface MapDepsProvider {

    val mapDeps: MapDeps
}

val Context.mapDepsProvider: MapDepsProvider
    get() = when (this) {
        is MapDepsProvider -> this
        is Application -> error("Application must implement MapDepsProvider")
        else -> applicationContext.mapDepsProvider
    }