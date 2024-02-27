<h1 class="image-header">
  <img src="#ProcessManagerIcon" alt="icon" />
  <span>
    The Process Manager
  </span>
</h1>

The Process Manager (more commonly known as Processes) is a handy tool we added to allow you to manage running processes and [services](@client/help/Services.md) on ArcOS. You might be spooked by it at first glance, but it's quite easy to understand. In this article you'll learn:

- How to open the Process Manager
- [How to stop running processes](@client/help/ProcessManager/stopping.md)
- What process errors are
- [How to manage ArcOS services](@client/help/ProcessManager/services.md)
- [Managing your security settings](@client/help/ProcessManager/security.md)

## Opening the Process Manager

Opening the process manager can be done in a bunch of different ways:

1. ### Press `Alt` + `X` on your keyboard

   This will open the Process Manager as an overlay on top of all other windows. However, this won't work if the Shell isn't running.

2. ### Right-click in places

   You can open the Process Manager by right clicking on either the **Taskbar** or **Desktop**, and selecting **Processes** from the list that appears.

3. ### App Information Dialog

   When you're viewing the information of any application, you can click **Processes** in that dialog to open the Process Manager.

4. ### Launching it from ArcTerm (Technical)

   You can also use the `spawn` command in [ArcTerm](@client/help/ArcTerm.md) to open the Process Manager:

   ```
   ~/ $ spawn ProcessManager
   ```

## What are process errors?

When an handle on a process didn't go as expected (say, killing a process), an error code is displayed to you. This code reveals exactly what went wrong, and might tell you how you can solve the problem. Below follows a table of the different error codes for processes:

### When spawning a process or app

| Code                 | Description                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| `success`            | The application or process spawned successfully without any errors.                                      |
| `err_elevation`      | The process required authentication from the user (in form of a Secure Context), and it wasn't provided. |
| `err_noExist`        | The application you tried to open doesn't exist.                                                         |
| `err_spawnCondition` | The application you tried to open has a spawn condition, and it wasn't met.                              |
| `err_parentNoExist`  | The parent process or application specified doesn't exist.                                               |
| `err_aboveLimit`     | The maximum amount of processes that can be spawned has been exceeded.                                   |
| `err_disabled`       | The application you tried to open is disabled.                                                           |

<br/>

### When closing a process or app

| Code                  | Description                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| `success`             | The process was killed successfully without any errors.                                                      |
| `err_criticalProcess` | This process is a core process and is required for ArcOS to function properly.                               |
| `err_disposed`        | The process ID specified belongs to a process that has already been terminated.                              |
| `err_elevation`       | The termination required authentication from the user (in form of a Secure Context), and it wasn't provided. |
| `err_noExist`         | The application or process you tried to terminate doesn't exist.                                             |
| `err_killCancel`      | The process stopped you from ending it because there is still an operation running.                          |
