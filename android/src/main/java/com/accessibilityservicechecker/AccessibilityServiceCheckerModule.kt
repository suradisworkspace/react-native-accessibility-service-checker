package com.accessibilityservicechecker

import android.accessibilityservice.AccessibilityServiceInfo
import android.view.accessibility.AccessibilityManager
import android.view.accessibility.AccessibilityManager.AccessibilityStateChangeListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule

@ReactModule(name = AccessibilityServiceCheckerModule.NAME)
class AccessibilityServiceCheckerModule(reactContext: ReactApplicationContext) :
  NativeAccessibilityServiceCheckerSpec(reactContext) {
  private val context = reactContext
  private var listenerCount = 0
  private val packageManager = reactContext.packageManager
  private val accessibilityManager: AccessibilityManager =
    reactContext.getSystemService(AccessibilityManager::class.java)
  private val listener = Listener(::sendEvent)


  override fun getName(): String {
    return NAME
  }

  private fun sendEvent(isEnabled: Boolean) {
    context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(EVENT_NAME, isEnabled)
  }

  private fun convertInfoToMap(info: AccessibilityServiceInfo): WritableMap {
    val map = Arguments.createMap()
    val id = info.id
    val eventTypes = AccessibilityServiceInfo.feedbackTypeToString(info.eventTypes)
    val description = info.loadDescription(packageManager)
    val capabilities = AccessibilityServiceInfo.capabilityToString(info.capabilities)
    val flag = AccessibilityServiceInfo.flagToString(info.flags)
//    Log.d("ASC", "id: $id")
//    Log.d("ASC", "eventTypes: $eventTypes")
//    Log.d("ASC", "capabilities: $capabilities")
//    Log.d("ASC", "description: $description")
//    Log.d("ASC", "flag: $flag")
//    Log.d("ASC", "=======================================================")
    map.putString("id", id)
    map.putString("eventTypes", eventTypes)
    map.putString("capabilities", capabilities)
    map.putString("description", description)
    map.putString("flag", flag)
    return map
  }

  private fun start() {
    accessibilityManager.addAccessibilityStateChangeListener(listener)
  }

  private fun stop() {
    accessibilityManager.removeAccessibilityStateChangeListener(listener)
  }

  private class Listener(private val callback: (Boolean) -> Unit) :
    AccessibilityStateChangeListener {
    override fun onAccessibilityStateChanged(isEnabled: Boolean) {
      callback(isEnabled)
    }
  }

  override fun getInstalledServices(): WritableArray {
    try {
      val list = Arguments.createArray()
      accessibilityManager.installedAccessibilityServiceList.onEach {
        list.pushMap(convertInfoToMap(it))
      }
      return list
    } catch (e: IllegalStateException) {
      throw IllegalStateException("Something went wrong")
    }
  }

  override fun getEnabledServices(feedBackType: Double): WritableArray? {
    try {
      val list = Arguments.createArray()
      accessibilityManager.getEnabledAccessibilityServiceList(feedBackType.toInt())
        .onEach {
          list.pushMap(convertInfoToMap(it))
        }
      return list
    } catch (e: IllegalStateException) {
      throw IllegalStateException("Something went wrong")
    }
  }

  val params = Arguments.createMap().apply {
    putString("eventProperty", "someValue")
  }

  override fun addListener(eventName: String) {
    if (listenerCount == 0) {
      start()
    }
    listenerCount++
  }

  override fun removeListeners(count: Double) {
    listenerCount -= count.toInt()
    if (listenerCount == 0) {
      stop()
    }
  }


  companion object {
    const val NAME = "AccessibilityServiceChecker"
    const val EVENT_NAME = "RNASC_Listener"
  }
}
