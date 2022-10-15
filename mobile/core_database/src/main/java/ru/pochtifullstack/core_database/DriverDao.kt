package ru.pochtifullstack.core_database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import ru.pochtifullstack.core_domain.domain.Request

@Dao
interface DriverDao {

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun addRequest(request: Request)

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun addRequests(requests: List<Request>)
}