package ru.pochtifullstack.feature_shift.api

import android.app.Application
import android.content.Context
import ru.pochtifullstack.core_domain.repository.DriverRepository
import ru.pochtifullstack.core_domain.repository.RequestsRepository
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.feature_shift.internal.di.ShiftScope

interface ShiftDeps {

    val shiftNavigation: ShiftNavigation
    val vehicleRepository: VehicleRepository
    val driverRepository: DriverRepository
    val requestsRepository: RequestsRepository
}

interface ShiftDepsProvider {

    val shiftDeps: ShiftDeps
}

val Context.shiftDepsProvider: ShiftDepsProvider
    get() = when (this) {
        is ShiftDepsProvider -> this
        is Application -> error("Application must implement ShiftDepsProvider")
        else -> applicationContext.shiftDepsProvider
    }

