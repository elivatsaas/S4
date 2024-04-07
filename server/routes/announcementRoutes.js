const express = require("express");

const AnnouncementHandler = require("../handlers/announcementHandlers");
const AppError = require("../utils/appError");
const catchASync = require("../utils/catchASync");
const router = express.Router();

//router.param("id", AnnouncementHandler.checkID);

router
  .route("/")
  .get(
    catchASync(async function (req, res, next) {
      var Announcements = await AnnouncementHandler.getAllAnnouncements();
      res.status(200).json({
        status: "success",
        results: Announcements.length,
        data: {
          Announcements,
        },
      });
    })
  )
  .post(
    catchASync(async function (req, res, next) {
      const { body, Employee_id } = req.body;
      const newAnnouncement = await AnnouncementHandler.createAnnouncement(
        body,
        Employee_id
      );
      res.status(201).json({
        status: "success",
        data: {
          newAnnouncement,
        },
      });
    })
  );

router
  .route("/:id")
  .get(
    catchASync(async function (req, res, next) {
      const Announcement = await AnnouncementHandler.getAnnouncement(
        req.params.id * 1
      );
      if (!Announcement) {
        return next(new AppError("No Announcement found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          Announcement,
        },
      });
    })
  )
  .patch(
    catchASync(async function (req, res, next) {
      const Announcement = await AnnouncementHandler.getAnnouncement(
        req.params.id * 1
      );
      if (!Announcement) {
        return next(new AppError("No Announcement found with that ID", 404));
      }
      var { body } = req.body;
      const id = req.params.id;
      const updatedAnnouncement = await AnnouncementHandler.updateAnnouncement(
        id,
        body
      );
      res.status(201).json({
        status: "success",
        data: {
          updatedAnnouncement,
        },
      });
    })
  )
  .delete(
    catchASync(async function (req, res, next) {
      const Announcement = await AnnouncementHandler.getAnnouncement(
        req.params.id * 1
      );
      if (!Announcement) {
        return next(new AppError("No Announcement found with that ID", 404));
      }
      AnnouncementHandler.deleteAnnouncement(req.params.id * 1);
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );

module.exports = router;
