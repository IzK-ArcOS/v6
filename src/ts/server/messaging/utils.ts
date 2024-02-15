import { MessageTitleParsed } from "$types/messaging";

const partialFilters = ["#", "](", "![", "!", ">", "|", "(", ")"];

export function filterPartialMessageBody(partial: string) {
  let str = partial;

  for (let i = 0; i < partialFilters.length; i++) {
    str = str.split(partialFilters[i]).join("");
  }

  return str;
}

export function parseTitle(body: string): MessageTitleParsed {
  const data = { title: "", body: "" };
  const bodyParts = body.split("\n");

  let title = "";

  if (bodyParts[0].startsWith("### ")) {
    title = bodyParts[0].replace("### ", "");
  }

  data.title = title;
  data.body = title ? body.replace(`${bodyParts[0]}\n`, "") : body;

  return data;
}
