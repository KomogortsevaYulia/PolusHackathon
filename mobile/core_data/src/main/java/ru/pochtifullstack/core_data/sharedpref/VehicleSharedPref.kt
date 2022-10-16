package ru.pochtifullstack.core_data.sharedpref

import android.content.Context

class VehicleSharedPref(context: Context) {

    companion object {
        private const val VEHICLE_SHARED_PREF = "vehicle_shared_pref"
        private const val VEHICLE_ID = "vehicle_id"
    }

    private val sharedPref = context.getSharedPreferences(VEHICLE_SHARED_PREF, Context.MODE_PRIVATE)

    fun setVehicleId(vehicleId: String) {
        sharedPref.edit()
            .putString(VEHICLE_ID, vehicleId)
            .apply()
    }

    fun getVehicleId(): String {
        return sharedPref.getString(VEHICLE_ID, "").toString()
    }
}