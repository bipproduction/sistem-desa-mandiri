import { prisma } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import _ from "lodash";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";


// GET ALL POSITION
export async function GET(request: Request) {
    try {

        let grup
        const { searchParams } = new URL(request.url);
        const idGroup = searchParams.get("group");
        const active = searchParams.get('active');
        const name = searchParams.get('search')
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }

        if (idGroup == "null" || idGroup == undefined) {
            grup = user.idGroup
         } else {
            grup = idGroup
         }

        const cek = await prisma.group.count({
            where: {
                id: grup,
                isActive: true
            }
        })

        if (cek == 0) {
            return NextResponse.json({ success: false, message: "Gagal mendapatkan jabatan, data tidak ditemukan", }, { status: 404 });
        }

        const positions = await prisma.position.findMany({
            where: {
                idGroup: grup,
                isActive: (active == "true" ? true : false),
                name: {
                    contains: (name == undefined || name == null) ? "" : name,
                    mode: "insensitive"
                }
            },
            select: {
                id: true,
                name: true,
                isActive: true,
                Group: {
                    select: {
                        name: true
                    }
                }
            },
        });

        const allData = positions.map((v: any) => ({
            ..._.omit(v, ["Group"]),
            group: v.Group.name
        }))

        return NextResponse.json({ success: true, message: "Berhasil mendapatkan jabatan", data: allData, }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal mendapatkan jabatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}



// CREATE POSITION
export async function POST(request: Request) {
    try {
        const user = await funGetUserByCookies()
        if (user.id == undefined) {
            return NextResponse.json({ success: false, message: "Anda harus login untuk mengakses ini" }, { status: 401 });
        }
        const data = await request.json();
        const cek = await prisma.position.count({
            where: {
                name: data.name,
                idGroup: data.idGroup,
            },
        });
        if (cek == 0) {
            const positions = await prisma.position.create({
                data: {
                    name: data.name,
                    idGroup: data.idGroup,
                },
                select: {
                    id: true,
                    name: true,
                },
            });

            revalidatePath('/api/position?active=true', "page")
            revalidatePath('/api/position?active=false', 'page')
            revalidatePath('/position?active=true', 'page')
            revalidateTag('position')

            return NextResponse.json({ success: true, message: "Berhasil menambahkan jabatan", positions, }, { status: 200 });
        } else {
            return NextResponse.json(
                { success: false, message: "Jabatan sudah ada" },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Gagal menambahkan jabatan, coba lagi nanti", reason: (error as Error).message, }, { status: 500 });
    }
}
