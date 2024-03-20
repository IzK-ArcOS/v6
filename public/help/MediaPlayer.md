<h2 class="image-header">
  <img src="#MediaPlayerIcon" alt="icon"/>
  <span>Media Player</span>
</h2>
Since the creation of ArcOS' predecessor WebOSv3, we've been keen on adding support for playing audio files in ArcOS itself. Instead of keeping that alive, we've done you one better. Starting in ArcOS v6, Media Player can also play Video files besides Audio. In this article, you'll learn:

- How to open the Media Player
- What files Media Player can play by default

## Opening Media Player

Opening it is quite easy. you can open Media Player using one of these interactive options:

1. ### Start Menu / Desktop

   The Media Player icon appears on the desktop or in the Start Menu.

2. ### Launching it from ArcTerm (Technical)

   You can also use the `spawn` command in [ArcTerm](@client/help/ArcTerm.md) to open Media Player:

   ```
   ~/ $ spawn MediaPlayer ["PATH"]
   ```

   where you can optionally put the path to a file to open in place of `PATH`. If you don't want to specify a file, you can simply remove the `["PATH"]` part of the command.

## Supported files

| Icon                    | Mimetype           | Extension | Description               |
| ----------------------- | ------------------ | --------- | ------------------------- |
| ![icon](#AudioMimeIcon) | `audio/mpeg`       | `.mp3`    | MP3 Audio                 |
| ![icon](#AudioMimeIcon) | `audio/opus`       | `.opus`   | Opus audio                |
| ![icon](#AudioMimeIcon) | `audio/wav`        | `.wav`    | Waveform audio format     |
| ![icon](#AudioMimeIcon) | `audio/mp4`        | `.m4a`    | M4a audio file            |
| ![icon](#AudioMimeIcon) | `audio/flac`       | `.flac`   | Free Lossless Audio Codec |
| ![icon](#VideoMimeIcon) | `video/mp4`        | `.mp4`    | MP4 Video                 |
| ![icon](#VideoMimeIcon) | `video/x-matroska` | `.mp4`    | MKV video file            |
| ![icon](#VideoMimeIcon) | `video/quicktime`  | `.mov`    | Quicktime video file      |
| ![icon](#VideoMimeIcon) | `video/x-msvideo`  | `.avi`    | AVI Video file            |
