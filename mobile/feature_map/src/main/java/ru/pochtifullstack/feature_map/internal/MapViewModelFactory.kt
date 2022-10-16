package ru.pochtifullstack.feature_map.internal

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.yandex.mapkit.mapview.MapView
import ru.pochtifullstack.core_domain.repository.RequestsRepository
import javax.inject.Inject

internal class MapViewModelFactory @Inject constructor(
    private val requestsRepository: RequestsRepository
): ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return MapViewModel(
            requestsRepository = requestsRepository
        ) as T
    }
}