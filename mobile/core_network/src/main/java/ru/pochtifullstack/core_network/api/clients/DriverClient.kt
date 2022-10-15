package ru.pochtifullstack.core_network.api.clients

import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import ru.pochtifullstack.core_network.api.DriverApi
import java.sql.Driver
import java.util.concurrent.TimeUnit
import javax.inject.Inject

class DriverClient {

    val BASE_URL = "https://virgo.tucana.org/api/"

    private fun getOkHttpClient(): OkHttpClient {
        return OkHttpClient.Builder()
            .addInterceptor(HttpLoggingInterceptor().setLevel(HttpLoggingInterceptor.Level.BODY))
            .connectTimeout(10000, TimeUnit.MILLISECONDS)
            .build()
    }

    private fun getRetrofitClient(): Retrofit {
        return Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(getOkHttpClient())
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    @Synchronized
    fun buildDriverApi(): DriverApi = getRetrofitClient().create(DriverApi::class.java)
}