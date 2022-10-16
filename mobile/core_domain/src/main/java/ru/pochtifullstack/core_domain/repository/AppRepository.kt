package ru.pochtifullstack.core_domain.repository

interface AppRepository {

    fun login()

    fun logout()

    fun getLoginStatus(): Boolean
}