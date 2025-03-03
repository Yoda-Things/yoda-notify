import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { debugData } from "../utils/debugData";
import "./App.css";

debugData([{ action: "setVisible", data: true }]);

const App: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const data = event.data;
      if (data?.action === "triggerNotification") {

        let notifData = data.data;
        if (notifData && notifData.data) {
          notifData = notifData.data;
        }

        const { title, description, type, duration } = notifData;

        const newNotification = {
          title: title,
          description: description,
          type: type,
          duration: duration || 5000,
          id: Date.now(),
        };

        setNotifications((prevNotifications) => {
          if (prevNotifications.length >= 3) {
            return [...prevNotifications.slice(1), newNotification];
          }
          return [...prevNotifications, newNotification];
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const removeNotification = (id: number) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const Notification: React.FC<{
    title: string;
    description: string;
    duration?: number;
    type?: "success" | "error" | "info";
    onRemove: () => void;
  }> = ({ title, description, duration = 5000, type = "info", onRemove }) => {
    const [exiting, setExiting] = useState(false);

    const handleAnimationEnd = () => {
      setExiting(true);
      setTimeout(() => {
        onRemove();
      }, 200);
    };

    useEffect(() => {
    }, [title, description, duration, type]);

    const getProgressBarColor = (type: "success" | "error" | "info") => {
      switch (type) {
        case "success":
          return "rgba(56, 161, 105, 0.7)";
        case "error":
          return "rgba(229, 62, 62, 0.7)";
        case "info":
          return "rgba(236, 201, 75, 0.7)";
        default:
          return "#fff";
      }
    };

    return (
      <div className={`notification ${type} ${exiting ? "fade-out" : ""}`}>
        <div className="icon-container">
          {type === "success" && <CheckCircle size={20} className="icon" />}
          {type === "error" && <XCircle size={20} className="icon" />}
          {type === "info" && <AlertTriangle size={20} className="icon" />}
        </div>
        <div className="notification-content">
          <span className="notification-title">{title}</span>
          <span className="notification-description">{description}</span>
        </div>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              animation: `progress ${duration}ms linear forwards`,
              backgroundColor: getProgressBarColor(type),
            }}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="space-y-5">
        <div className="notifications-container">
          {notifications.map((notification) => (
            <Notification
              key={notification.id}
              title={notification.title}
              description={notification.description}
              type={notification.type}
              duration={notification.duration}
              onRemove={() => removeNotification(notification.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
