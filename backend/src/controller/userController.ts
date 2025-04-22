import redis from "../config/redis";
import { User } from "../model/DbModel";

const getDashboardData = async (req: any, res: any) => {
    const userId = req.user.userId;
    const cacheKey = `dashboard:${userId}`
    try {
        

        const cacheValue = await redis.get(cacheKey);
        if(cacheValue){
            return res.json(JSON.parse(cacheValue));
        }   
        // Fetch the user by ID and populate teams, members, createdBy, and files inside each team
        const data = await User.findById(userId)
            .populate({
                path: 'teams',  // Populate the teams array
                populate: [
                    {
                        path: 'members',  // Populate the members field inside each team
                        model: 'User'      // Reference to the User model
                    },
                    {
                        path: 'createdBy',  // Populate the createdBy field inside each team
                        model: 'User'       // Reference to the User model
                    },
                    {
                        path: 'files',  // Populate the files array inside each team
                        model: 'File',  // Reference to the File model
                        select:{
                            _id: true,
                            name: true,
                            createdAt: true,
                            createdBy: true,
                            team: true,
                            __v: true,
                        },
                        populate: {
                            path: 'createdBy',  // Populate the team field inside each file
                            model: 'User'  // Reference to the Team model
                        }
                        
                    }
                ]
            });

        if (!data) {
            return res.status(404).json({ message: 'User not found' });
        }

        await redis.set(cacheKey, JSON.stringify(data), "EX", 200);//40 sec to expire
        // await redis.expire(cacheKey, 10);

        // Send the populated data as response
        res.json(data);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

export { getDashboardData }
