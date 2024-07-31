import { NextRequest } from "next/server";
import { API_INDEX_DISCUSSION } from "./api_index";
type Method = "GET" | "POST";

export async function apiDiscussion(req: NextRequest, method: Method) {
   const { searchParams } = new URL(req.url);
   const path = searchParams.get("path");
   const act = API_INDEX_DISCUSSION.find((v) => v.path === path && v.method === method);
   if (!path)
      return Response.json({ message: "page not found" }, { status: 404 });
   if (act) return act.bin(req);

   return Response.json({ message: "404" });
}
