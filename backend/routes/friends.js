import  express  from "express";
import controller from "../controller/friends.js";

const router = express.Router()
router
    .route('/')
        .get(controller.getMany)
        .post(controller.addOne)
        .post(controller.addUs)

router
    .route( '/:id')
        .get(controller.getOne)
        .patch(controller.updateOne)
        .delete(controller.deleteOne);

router
    .route('/login')
    .post(controller.logIn)


export default router