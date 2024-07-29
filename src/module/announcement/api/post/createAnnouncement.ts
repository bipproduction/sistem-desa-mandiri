import { prisma } from "@/module/_global";
import { NextRequest } from "next/server";

export async function createAnnouncement(req: NextRequest) {
  try {
    const data = await req.json();
    const announcement = await prisma.annoucement.create({
      data: {
        title: data.title,
        desc: data.desc,
        idVillage: data.idVillage,
        createdBy: data.createBy,
        isActive: true,
      },
      select: {
        id: true,
        title: true,
        desc: true,
      },
    });

    const announcementMember = await prisma.annoucementMember.createMany({
      data: data.groups.map((group: any) => ({
        idAnnoucement: announcement.id,
        idGroup: group.idGroup,
        idDivision: group.idDivision,
        isActive: true,
      })),
    });

    return Response.json({
      announcement: announcement,
      announcementMember: announcementMember,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
