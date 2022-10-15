package ru.pochtifullstack.core_database

import androidx.room.TypeConverter
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import ru.pochtifullstack.core_domain.domain.CarInfo

class CarInfoTypeConverter {

    @TypeConverter
    fun mapCarInfoToString(value: CarInfo): String {
        val gson = Gson()
        val type = object : TypeToken<CarInfo>() {}.type
        return gson.toJson(value, type)
    }

    @TypeConverter
    fun mapStringToCarInfo(value: String): CarInfo {
        val gson = Gson()
        val type = object : TypeToken<CarInfo>() {}.type
        return gson.fromJson(value, type)
    }
}