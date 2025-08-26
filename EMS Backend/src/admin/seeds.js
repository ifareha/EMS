import { connectDb } from "../config/db.js"
import { Employee } from "../modules/employee/employee-model.js"
// import { User } from "../modules/user/user-model.js"
import { logger } from "../shared/logger.js"

const admin = async () => {
   await connectDb()

   const exist = await Employee.findOne({email: process.env.ADMIN_EMAIL})
   if (exist) {
    logger.info("Admin user already exists")
    process.exit(0)
   }
   const admin = new Employee({
    firstName: process.env.ADMIN_FIRSTNAME,
    lastName: process.env.ADMIN_LASTNAME,
    email: process.env.ADMIN_EMAIL,
    role: "ADMIN"

   })

   await admin.setPassword(process.env.ADMIN_PASSWORD)
   await admin.save()
    logger.info("Admin user created successfully")
    process.exit(0)
}
admin()