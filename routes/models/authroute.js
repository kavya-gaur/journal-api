const express = require("express")
const {registerController,loginController, journalController, getJournalsController, updateJournalController, deleteJournalController} = require("../../controllers/authcontroller")

const router = express.Router()

router.post("/register",registerController)
router.post("/login",loginController)
router.post("/journal",journalController)
router.post("/journals",getJournalsController)
router.post("/updatejournal",updateJournalController)
router.post("/deletejournal",deleteJournalController)


module.exports = router