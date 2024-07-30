import { getOneGroup } from "./get/getOneGroup";
import { listGroups } from "./get/listGroup";
import { createGroup } from "./post/createGroup";
import { deleteGroup } from "./post/deleteGroup";
import { updateGroup } from "./post/updateGroup";

export const API_INDEX_GROUP = [
  {
    path: "get-all-group",
    method: "GET",
    bin: listGroups,
  },
  {
    path: "create-group",
    method: "POST",
    bin: createGroup,
  },
  {
    path: "update-group",
    method: "POST",
    bin: updateGroup,
  },
  {
    path: "delete-group",
    method: "POST",
    bin: deleteGroup,
  },
  {
    path: "get-one-group",
    method: "GET",
    bin: getOneGroup,
  },
];
