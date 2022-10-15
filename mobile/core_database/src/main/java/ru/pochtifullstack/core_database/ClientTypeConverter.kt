package ru.pochtifullstack.core_database

import androidx.room.TypeConverter
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import ru.pochtifullstack.core_domain.domain.CarInfo
import ru.pochtifullstack.core_domain.domain.Client

class ClientTypeConverter {

    @TypeConverter
    fun mapClientToString(value: Client): String {
        val gson = Gson()
        val type = object : TypeToken<Client>() {}.type
        return gson.toJson(value, type)
    }

    @TypeConverter
    fun mapStringToClient(value: String): Client {
        val gson = Gson()
        val type = object : TypeToken<Client>() {}.type
        return gson.fromJson(value, type)
    }
}