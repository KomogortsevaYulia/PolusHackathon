package ru.pochtifullstack.feature_scaner.api

import android.Manifest
import android.content.Context
import android.content.pm.PackageManager
import android.os.Bundle
import android.util.Log
import android.view.View
import dagger.Lazy
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import by.kirich1409.viewbindingdelegate.viewBinding
import com.budiyev.android.codescanner.*
import ru.pochtifullstack.feature_scaner.R
import ru.pochtifullstack.feature_scaner.databinding.FragmentScanerBinding
import ru.pochtifullstack.feature_scaner.internal.ScanerComponentViewModel
import ru.pochtifullstack.feature_scaner.internal.ScanerViewModel
import ru.pochtifullstack.feature_scaner.internal.ScanerViewModelFactory
import javax.inject.Inject


class ScanerFragment : Fragment(R.layout.fragment_scaner) {

    @Inject
    internal lateinit var scanerViewModelFactory: Lazy<ScanerViewModelFactory>

    private val binding by viewBinding(FragmentScanerBinding::bind)
    private val scanerViewModel: ScanerViewModel by viewModels {
        scanerViewModelFactory.get()
    }
    private val componentViewModel: ScanerComponentViewModel by viewModels()

    private lateinit var codeScanner: CodeScanner

    override fun onAttach(context: Context) {
        componentViewModel.scanerComponent.inject(this)

        super.onAttach(context)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        if (checkPermission()) {
            initScanner()
        } else {
            requestPermission();
        }
    }

    private fun initScanner() {
        codeScanner = CodeScanner(requireContext(), binding.scannerView)

        codeScanner.camera = CodeScanner.CAMERA_BACK
        codeScanner.formats = CodeScanner.ALL_FORMATS

        codeScanner.autoFocusMode = AutoFocusMode.SAFE
        codeScanner.scanMode = ScanMode.SINGLE
        codeScanner.isAutoFocusEnabled = true
        codeScanner.isFlashEnabled = false

        // Callbacks
        codeScanner.decodeCallback = DecodeCallback {
            codeScanner.stopPreview()
            codeScanner.releaseResources()
            requireActivity().runOnUiThread {
                scanerViewModel.moveFurther(it.text)
            }
        }
        codeScanner.errorCallback = ErrorCallback { // or ErrorCallback.SUPPRESS
            Log.d("anime", "$it")
        }
        Log.d("anime", "started")
        binding.scannerView.setOnClickListener {
            codeScanner.startPreview()
        }
    }

    override fun onResume() {
        super.onResume()
        codeScanner.startPreview()
    }

    override fun onPause() {
        codeScanner.releaseResources()
        super.onPause()
    }

    private fun checkPermission(): Boolean {
        return ContextCompat.checkSelfPermission(requireContext(), Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED
    }

    private fun requestPermission() {
        ActivityCompat.requestPermissions(
            requireActivity(), arrayOf(Manifest.permission.CAMERA),
            PackageManager.PERMISSION_GRANTED
        )
    }
}