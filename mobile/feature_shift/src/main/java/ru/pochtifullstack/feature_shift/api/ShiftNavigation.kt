package ru.pochtifullstack.feature_shift.api

import android.os.Bundle

interface ShiftNavigation {

    fun moveToScaner()

    fun moveToRequestList()

    fun moveBackToScaner()

    fun moveBackToShift()

    fun moveBackToAuth()

    fun moveToMap(bundle: Bundle)
}