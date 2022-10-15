package ru.pochtifullstack.feature_scaner.api

interface ScanerNavigation {

    fun moveFurther(vehicleId: String)

    fun moveBack()
}