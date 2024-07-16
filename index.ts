import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getStaffBasedOnId, getRedeemedRecord } from "./utils/utils"

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

app.get("/staff/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const staff = await getStaffBasedOnId(id);

        if (!staff) {
            return res.status(404).send("Staff pass does not exist")
        }

        const teamName = staff.team_name
        return res.status(200).send(teamName); 
    } catch (e) {
        console.log(e);
    }
});


app.post("/redeem-gift", async (req, res) => {
    const { staff_pass_id } = req.body;

    try {
        const staff = await getStaffBasedOnId(staff_pass_id)

        if (!staff) {
            return res.status(404).send('Staff pass does not exist')
        }

        const teamName = staff.team_name
        const redeemed = await getRedeemedRecord(teamName)

        if (redeemed) {
            return res.status(500).send(`Gift for team ${teamName} has already been redeemed`)
        }

        const time = Date.now()
        
        try {
            const user = await prisma.redemption.create({
                data: {
                    staff_pass_id: staff_pass_id,
                    team_name: teamName,
                    redeemed_at: time.toString(),
                }
            })

            if (!user) {
                return res.status(400).send("Something wrong happened when redeeming gift")
            }

            return res.status(200).send("Successfully redeemed gift")
        } catch (e) {
            console.log(e)
        }
    } catch (e) {
        console.log(e)
    }
})

app.get("/test", async (req, res) => {
    const records = await prisma.redemption.findMany()
    res.status(200).send(records)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
