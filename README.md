![yoda-notify](https://github.com/user-attachments/assets/52afd38e-7300-49a7-93fe-6a122c1f9f02)

## Export notify
The script exports a function notify so other resources can send notifications to the UI. For example:

exports['yoda-notify']:notify({
  title = "Notification title",         -- Required
  description = "Notification description", -- Required
  type = "success",                      -- Required ("success", "error", or "info")
  duration = 6000                        -- Optional (default: 5000 ms)
})
