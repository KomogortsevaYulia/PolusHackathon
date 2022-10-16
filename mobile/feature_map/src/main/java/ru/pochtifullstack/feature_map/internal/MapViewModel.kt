package ru.pochtifullstack.feature_map.internal

import androidx.lifecycle.*
import kotlinx.coroutines.launch
import ru.pochtifullstack.core_domain.domain.Request
import ru.pochtifullstack.core_domain.repository.RequestsRepository
import java.lang.Exception

class MapViewModel(
    private val requestsRepository: RequestsRepository
): ViewModel() {

    private val _statusLiveData = MutableLiveData<Request>()
    val statusLiveData: LiveData<Request> = _statusLiveData

    private val _errorLiveData = MutableLiveData<Boolean>()
    val errorLiveData: LiveData<Boolean> = _errorLiveData

    fun approveRequest(id: Int) {
        viewModelScope.launch {
            try {
                _statusLiveData.postValue(requestsRepository.approveRequest(id))
            } catch (e: Exception) {
                _errorLiveData.postValue(true)
            }
        }
    }

    fun endRequest(id: Int) {
        viewModelScope.launch {
            try {
                _statusLiveData.postValue(requestsRepository.endRequest(id))
            } catch (e: Exception) {
                _errorLiveData.postValue(true)
            }
        }
    }
}