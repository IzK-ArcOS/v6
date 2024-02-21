import { Log } from "$ts/console";

export default function (url: string, init: RequestInit, ms: number = 3000): Promise<Response> {
  Log("util/ttlFetch", url);

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error("TIMEOUT"));
    }, ms);

    fetch(url, init)
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((reason) => {
        clearTimeout(timer);
        reject(reason);
      });
  });
}
