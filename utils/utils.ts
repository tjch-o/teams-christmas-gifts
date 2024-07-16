import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getStaffBasedOnId = async (id: string) => {
    const staff = await prisma.staff.findUnique({
        where: {
            staff_pass_id: id
        }
    })

    return staff;
}

export const getRedeemedRecord = async (teamName: string) => {
    const record = await prisma.staff.findMany({
        where: {
            team_name: teamName
        }
    })
    return record;
}