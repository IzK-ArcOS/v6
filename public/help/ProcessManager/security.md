# Managing your security settings

You can manage your ArcOS Secure Context Settings by going to the Security Tab of Processes. From this page you can enter lockdown, enable password-less prompts, or disable elevated requests entirely.

You can see what ArcOS thinks about your settings at the top of the tab.

| Configuration             | Elevation | Lockdown | Password  |
| ------------------------- | --------- | -------- | --------- |
| Recommended               | Enabled   | Disabled | Required  |
| Mildly Insecure           | Enabled   | Disabled | Not asked |
| In Lockdown               | Any       | Enabled  | Any       |
| Inadvisable Configuration | Disabled  | Any      | Any       |

<br/>

## What does Disable Elevation mean?

When you disable elevation, all ArcOS components can make changes to system settings and perform operations that could potentially be destructive for your account. You won't be asked for permission, and you won't even know if something in the background initiated an elevation request. **We do NOT recommend that you disable elevation**.

To disable elevation, click **Disable Elevation** on the Security page.

## Locking down Elevation

Locking down elevation disables all elevation requests. It doesn't allow them through at all. This is handy if you want to temporarily block any elevation requests from going through, like when you're debugging a problem.

To enable Lockdown, toggle **Lock down elevation** on the Security page.

## Don't ask for password

If you don't want to enter a password every time to elevate, you can opt to disable the password prompt. With this enabled you won't be asked for a password, but for you to simply click on **Approve** in a Secure Context.

To disable the password prompt, toggle **Don't ask for password** on the Security page.

## The security status menu

On the system tray you can find a security icon. If you click it, a popup will appear allowing you to quickly change the Lockdown and Password modes of your ArcOS Security Settings on the fly. It will also tell you the situation you're in at the bottom of the menu, as displayed in the configuration table above.

---

[Back to **Process Manager**](@client/help/ProcessManager.md)
