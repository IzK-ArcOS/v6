# Apps Settings

The apps page is used to manage the applications ArcOS comes with. At the top of the page, you can find both a search field and three buttons. These buttons allow you to filter between applications you'll use yourself (User applications) and applications that ArcOS itself uses to support other applications (Components). Clicking on one of these buttons applies the filter of that button.

Clicking on an application opens a new dialog containing information about the application you selected. Here you can choose to open, disable, or manage the application.

In this article you'll learn:

- How to enable or disable an application,
- The risks of disabling certain applications,
- What hidden applications are, and
- How to make Hidden applications visible

Before you continue, first open the **Settings App**. More information about opening the settings app can be found in the [Settings](@client/help/Settings.md) article under **"Opening the settings app"**. Once opened, make sure you're on the **Apps** page by clicking on **Apps** in the sidebar.

## Disable an application

1. On the Apps page, select any application by clicking on it:
   ![medium](@client/help/assets/settings-apps-select.png)
2. In the dialog that appears, select **Disable** at the top:
   ![medium](@client/help/assets/settings-apps-disable-button.png)
   <br/>
   If the button is green, that means that the application is already disabled. Clicking on a green button will re-enable the application.
3. Depending on your security settings, you might be asked to enter your password. Do so and press **Approve** in the **Secure Context** to confirm:
   ![medium](@client/help/assets/settings-apps-disable-secure-context.png)

> ### ![icon](#AppInfoIcon) **Getting app info**
>
> There are multiple different ways to get information about an application. The most common way is by right-clicking on a Desktop icon, and selecting **App Info** from there.

### What are the risks?

If you disable certain important applications such as the Shell and Desktop Wallpaper, ArcOS might stop functioning entirely. This is because these are required for you to be able to interact with your ArcOS Desktop. If they get disabled, re-gaining access to your account will have to be done using ArcTerm Mode.

## What are hidden applications?

Hidden applications are applications you can't see- or interact with by default. They are _hidden_ from view because they are used to support some other part of ArcOS. These can be made visible by enabling the **Show hidden applications** checkbox on the Apps page.

Remember however that many of these applications won't launch when directly opened from the Start Menu or Desktop. This is because they require additional parameters, normally provided by other applications.

When a hidden application fails to open, you might get an ArcOS notification:
![medium](@client/help/assets/settings-apps-failed-to-open.png)

## Technical Terms

These are some technical terms you might find while you're using ArcOS.

### Single Instance

The Single Instance property specifies if you can open only one instance of
any given application at once, or multiple. If Single Instance is enabled, and a
second instance is spawned, it will stop the spawn and focus the first instance instead.

### Load Condition

The Load Condition is a condition that must be met for the application to be
loaded into the Library. If the Load Condition doesn't match, the load process is
aborted, and the Library is unaffected.

---

[Back to **Settings**](@client/help/Settings.md)
