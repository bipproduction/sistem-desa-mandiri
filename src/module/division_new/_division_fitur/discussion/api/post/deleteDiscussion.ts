import { prisma } from "@/module/_global";

export default async function deleteDiscussion(req: Request) {
   try {
      const data = await req.json()
      const del = await prisma.divisionDisscussion.update({
         where: {
            id: data.id
         },
         data: {
            isActive: false
         }
      })

      return Response.json(
         { success: true, message: "Sukses Delete Diskusi" },
         { status: 200 }
      );
   } catch (error) {
      console.error(error);
      return Response.json(
         { message: "Internal Server Error", success: false },
         { status: 500 }
      );
   }
}