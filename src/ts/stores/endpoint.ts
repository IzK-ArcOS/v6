export const Endpoints = {
  FsDirCreate: "/fs/dir/create", // v1,
  FsDirectory: "/fs/dir/get", // v1
  FsFileGet: "/fs/file/get", // v1
  FsFileWrite: "/fs/file/write", // v1
  FsQuota: "/fs/quota", // v1
  FsRm: "/fs/rm", // v1
  MetaData: "/v2/",
  NewUsers: "/v2/users/",
  Token: "/v2/token/",
  UserData: "/v2/users/me",
  Users: "/users/get", // v1
  UserRename: "/user/rename", // v1
  UserChangePassword: "/user/changepswd", // v1
  LogoffToken: "/logoff" // v1
};

export function isStoredEndpoint(endpoint: string) {
  const store = Object.values(Endpoints);

  return store.includes(endpoint);
}
