import Aero from "$state/Desktop/Components/ProcessRenderer/Window/Titlebar/Aero.svelte";
import Default from "$state/Desktop/Components/ProcessRenderer/Window/Titlebar/Controls/Default.svelte";
import Og from "$state/Desktop/Components/ProcessRenderer/Window/Titlebar/OG.svelte";
import Traffic from "$state/Desktop/Components/ProcessRenderer/Window/Titlebar/Traffic.svelte";
import { WindowControlOption } from "$types/app";

export const TitlebarButtons: { [key: string]: WindowControlOption } = {
  default: {
    caption: "Default",
    author: "ArcOS Team",
    content: Default,
  },
  traffic: {
    caption: "Traffic Lights",
    author: "Apple",
    content: Traffic,
  },
  og: {
    caption: "O.G.",
    author: "WebOSv3 Team",
    content: Og,
  },

  win7: {
    caption: "Windows 7",
    author: "Microsoft Corporation",
    content: Aero,
  },
};
