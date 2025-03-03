local function toggleNuiFrame(shouldShow)
  SendReactMessage('setVisible', shouldShow)
end

RegisterCommand('show-nui', function()
  toggleNuiFrame(true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

local function sendNotificationToUI(data)

  local uiData = {
    action = "triggerNotification",
    data = {
      type = data.type,
      description = data.description,
      title = data.title,
      duration = data.duration
    }
  }

  toggleNuiFrame(true)
  SendReactMessage("triggerNotification", uiData)
end

exports('notify', function(data)
  sendNotificationToUI(data)
end)

RegisterCommand("notifytest", function()
  print("Comando /notifytest chamado")
  
  exports['saga-notify']:notify({
    title = "Success Notification",
    description = "Esta é uma notificação de sucesso.",
    type = "success"
  })

  exports['saga-notify']:notify({
    title = "Error Notification",
    description = "Ocorreu um erro! Tente novamente.",
    type = "error"
  })

  exports['saga-notify']:notify({
    title = "Info Notification",
    description = "Esta é uma notificação informativa.",
    type = "info"
  })
end, false)
