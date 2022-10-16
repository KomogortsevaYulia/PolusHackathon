package ru.pochtifullstack.core_data.sharedpref

import android.content.Context

class AppSharedPref(context: Context) {

    companion object {
        private const val APP_SHARED_PREF = "app_shared_pref"
        private const val APP_LOGIN = "app_login"
    }

    private val sharedPref = context.getSharedPreferences(APP_SHARED_PREF, Context.MODE_PRIVATE)

    fun setLoginStatus(isLoggedIn: Boolean) {
        sharedPref.edit()
            .putBoolean(APP_LOGIN, isLoggedIn)
            .apply()
    }

    fun getLoginStatus(): Boolean {
        return sharedPref.getBoolean(APP_LOGIN, false)
    }
}