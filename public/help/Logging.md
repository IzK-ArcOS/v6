<h1 class="image-header">
  <img src="#LoggerIcon" alt="icon"/>
  <span>Logging</span>
</h1>
The Logging application contains verbose information about the things ArcOS does in the background. From it you can debug problems with ArcOS without having to open Developer Options in your browser. In this article, you'll learn:

- How to open Logging
- [What logging levels are](@client/help/Logging/Levels.md)

---

> ### ![icon](#WarningIcon) **Elevation required**
>
> Keep in mind that this application requires elevation. If you have elevation disabled, it won't be able to open.

## Opening Logging

Opening Logging can be done in a bunch of different ways:

3. ### Start Menu / Desktop

   You can open the File Manager by clicking it in the left panel of the Start Menu or on the Desktop.

4. ### Launching it from ArcTerm (technical)

   You can type `logs` in ArcTerm to open the Logger application with a specific category, for example:

   ```
   ~/ $ logs process/handler
   ```

   **TIP**: Type `logs $$` in ArcTerm to view the specific logs of the ArcTerm instance you're running.
   <br/><br/>
   You can also use the `spawn` command in [ArcTerm](@client/help/ArcTerm.md) to open Logging:

   ```
   ~/ $ spawn LoggerApp ["LOG_LEVEL","CATEGORY"]
   ```

   where you can optionally specify the log level and what category to view. You can can omit these by leaving out the `["LOG_LEVEL","CATEGORY"]` part of the command. Example:

   ```
   ~/ $ spawn LoggerApp ["all","ArcTerm 727243-504938-501243-811523"]
   ```
