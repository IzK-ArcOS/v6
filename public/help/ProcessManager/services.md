# Managing Services

On the services page you can manage the services ArcOS runs. Services are operations that run constantly to be of service to you or other ArcOS components. A service has a name, description, PID and a status field. The PID is the Process ID of the service.

To access the underlying process of the service, select it and press **Go to process** in the bottom right of the window. If this button is grayed out, that means that the service isn't running.

To start or stop a service, click the Red or Green button in the very bottom right of the window. If the service is running, the button is called **Stop** and its color is Red. If the service isn't running, the button is called **Start** and its color is Green.

To restart a service, click the yellow **Restart** button to the left of the start/stop button.

> ### ![icon](#WarningIcon) **Note**
>
> Starting, stopping or restarting a service requires you to provide your password in a Secure Context. If Secure Context is disabled, you won't be able to manage services.

---

[Back to **Process Manager**](@client/help/ProcessManager.md)
