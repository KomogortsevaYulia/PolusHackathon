package ru.pochtifullstack.feature_shift.api

import android.app.Application
import android.content.Context
import ru.pochtifullstack.feature_shift.internal.di.ShiftScope

interface ShiftDeps {

    val shiftNavigation: ShiftNavigation
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

