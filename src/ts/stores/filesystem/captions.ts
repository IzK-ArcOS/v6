import { WriteFileReturnValue } from "$types/fs";

export const WriteFileReturnCaptions: Record<WriteFileReturnValue, string> = {
  err_noSpace: "You don't have enough free space on your account",
  err_serverError: "A server error occured",
  err_unknown: "An unknown error occured",
  success: "Your file was written successfully",
  err_authentication: "You need to be logged in to write files",
};
