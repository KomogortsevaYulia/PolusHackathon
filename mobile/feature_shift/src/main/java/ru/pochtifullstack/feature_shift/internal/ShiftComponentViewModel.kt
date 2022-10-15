package ru.pochtifullstack.feature_shift.internal

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import ru.pochtifullstack.feature_shift.api.shiftDepsProvider
import ru.pochtifullstack.feature_shift.internal.di.DaggerShiftComponent
import ru.pochtifullstack.feature_shift.internal.di.ShiftComponent

internal class ShiftComponentViewModel(
    application: Application
): AndroidViewModel(application) {

    val shiftComponent: ShiftComponent by lazy {
        DaggerShiftComponent.factory().create(
            shiftDeps = application.shiftDepsProvider.shiftDeps
        )
    }
}