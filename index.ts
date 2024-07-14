import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.get("/staff/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await prisma.staff.findMany({
            where: {
                staff_pass_id: id,
            },
        });
        res.status(200).json(result[0]);
        console.log(`retrieved ${id} team name: ${result[0].team_name}`);
    } catch (e) {
        console.log(e);
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
