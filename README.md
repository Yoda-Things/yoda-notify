# Yoda Notify 🚀  
A simple and customizable notification system for FiveM with a sleek NUI interface.  

![yoda-notify](https://github.com/user-attachments/assets/52afd38e-7300-49a7-93fe-6a122c1f9f02)  

## 🔧 Export: `notify`  
This script provides an export function, `notify`, allowing other resources to trigger notifications in the UI easily.  

### 📌 Example Usage:  
```lua
exports['yoda-notify']:notify({
  title = "Notification Title",         -- Required  
  description = "Notification Description", -- Required  
  type = "success",                      -- Required ("success", "error", or "info")  
  duration = 6000                        -- Optional (default: 5000 ms)  
})
```

✅ Parameters:

|Parameter   | 	Type	 |  Required |  Description                                           |
|------------|---------|-----------|--------------------------------------------------------|
|title	     |  string |  ✅ Yes	 |  The main title of the notification.                   |
|description |  string |  ✅ Yes	 |  The message content of the notification.              |
|type	       |  string |  ✅ Yes	 |  Type of notification ("success", "error", or "info"). |
|duration	   |  number |  ❌ No	 |  Display duration in milliseconds (default: 5000).     |

💡 Easily integrate Yoda Notify into your FiveM scripts for a polished notification experience! 🚀  

📖 **Documentation:** [Yoda Notify Documentation](https://yoda-things.gitbook.io/yoda-things-documentation/free-resources/notify-system)
