import { PrismaClient } from "@prisma/client";
import { formatData } from "./utils";

const prisma = new PrismaClient();

export const getAllStaff = async () => {
    const allStaff = await prisma.staff.findMany();
    return formatData(allStaff);
};

export const getRedemptionRecords = async () => {
    const records = await prisma.redemption.findMany();
    return formatData(records);
};

export const getStaffBasedOnId = async (id: string) => {
    const staff = await prisma.staff.findUnique({
        where: {
            staff_pass_id: id,
        },
    });

    return staff;
};

export const getRedeemedRecord = async (teamName: string) => {
    const record = await prisma.staff.findMany({
        where: {
            team_name: teamName,
        },
    });
    return record;
};
