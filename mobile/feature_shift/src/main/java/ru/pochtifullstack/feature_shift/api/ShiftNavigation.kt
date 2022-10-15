package ru.pochtifullstack.feature_shift.api

interface ShiftNavigation {

    fun moveToScaner()

    fun moveToRequestList()

    fun moveBackToScaner()

    fun moveBackToShift()

    fun moveBackToAuth()
}