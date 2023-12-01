import { ReleaseLogo } from "$ts/images/branding";
import { ARCOS_MODE } from "$ts/metadata/mode";
import { MODES } from "$ts/stores/branding";

export const Logo = (m?: string) => MODES[m || ARCOS_MODE] || ReleaseLogo;
