const express = require("express");
const AnnouncementHandler = require("../handlers/announcementHandlers");
const ShiftHandler = require("../handlers/shiftHandlers");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchASync");
const router = express.Router();

router
  .route("/employees")
  .get(
    catchAsync(async function (req, res, next) {
      const announcements =
        await AnnouncementHandler.getAnnouncementByEmployees();
      if (!announcements) {
        res.status(200).json({
          status: "success",
          results: announcements.length,
          data: {
            announcements,
          },
        });
      } else {
        res.status(200).json({
          status: "success",
          results: announcements.length,
          data: {
            announcements,
          },
        });
      }
    })
  )
  .post(
    catchAsync(async function (req, res, next) {
      const { announcementId, employeeId } = req.body;
      const newAnnouncement =
        await AnnouncementHandler.createAnnouncementEmployee(
          announcementId,
          employeeId
        );
      res.status(201).json({
        status: "success",
        data: {
          newAnnouncement,
        },
      });
    })
  );

router.route("/schedules/:Schedule_id").get(
  catchAsync(async function (req, res, next) {
    const announcements = await AnnouncementHandler.getAnnouncementsBySchedule(
      req.params.Schedule_id
    );
    res.status(200).json({
      status: "success",
      results: announcements.length,
      data: {
        announcements,
      },
    });
  })
);
router
  .route("/schedules")
  .get(
    catchAsync(async function (req, res, next) {
      const announcements =
        await AnnouncementHandler.getAnnouncementsBySchedules();
      res.status(200).json({
        status: "success",
        results: announcements.length,
        data: {
          announcements,
        },
      });
    })
  )
  .post(
    catchAsync(async function (req, res, next) {
      const newAnnouncement =
        await AnnouncementHandler.createAnnouncementSchedule(
          req.body.announcementId,
          req.body.scheduleId
        );
      res.status(201).json({
        status: "success",
        data: {
          newAnnouncement,
        },
      });
    })
  );

router.route("/stores/:Store_id").get(
  catchAsync(async function (req, res, next) {
    const announcement = await AnnouncementHandler.getAnnouncementByStore(
      req.params.Store_id
    );
    if (!announcement) {
      return next(new AppError("No announcement found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        announcement,
      },
    });
  })
);
router
  .route("/stores")
  .get(
    catchAsync(async function (req, res, next) {
      try {
        const announcement =
          await AnnouncementHandler.getAnnouncementByStores();
        console.log(announcement);
        if (!announcement) {
          return next(new AppError("No announcement found for stores", 404));
        }
        res.status(200).json({
          status: "success",
          data: {
            announcement,
          },
        });
      } catch (error) {
        return next(
          new AppError(
            "An error occurred while fetching announcements for stores",
            500
          )
        );
      }
    })
  )
  .post(
    catchAsync(async function (req, res, next) {
      const { announcementId, storeId } = req.body;
      const newAnnouncement =
        await AnnouncementHandler.createAnnouncementStores(
          announcementId,
          storeId
        );
      res.status(201).json({
        status: "success",
        data: {
          newAnnouncement,
        },
      });
    })
  );

router.route("/roles/:Role_id").get(
  catchAsync(async function (req, res, next) {
    const announcement = await AnnouncementHandler.getAnnouncementByRole(
      req.params.Role_id
    );
    if (!announcement) {
      return next(new AppError("No announcement found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        announcement,
      },
    });
  })
);
router
  .route("/roles")
  .get(
    catchAsync(async function (req, res, next) {
      const announcement = await AnnouncementHandler.getAnnouncementByRoles();
      if (!announcement) {
        return next(new AppError("No announcement found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          announcement,
        },
      });
    })
  )
  .post(
    catchAsync(async function (req, res, next) {
      const { announcementId, roleId } = req.body;
      const newAnnouncement = await AnnouncementHandler.createAnnouncementRoles(
        announcementId,
        roleId
      );
      res.status(201).json({
        status: "success",
        data: {
          newAnnouncement,
        },
      });
    })
  );

router.route("/employees/:Employee_id").get(
  catchAsync(async function (req, res, next) {
    const announcements = await AnnouncementHandler.getAnnouncementByEmployee(
      req.params.Employee_id
    );
    if (!announcements) {
      res.status(200).json({
        status: "success",
        results: announcements.length,
        data: {
          announcements,
        },
      });
    } else {
      res.status(200).json({
        status: "success",
        results: announcements.length,
        data: {
          announcements,
        },
      });
    }
  })
);

router.route("/shifts/:Shift_id").get(
  catchAsync(async function (req, res, next) {
    const shift = await ShiftHandler.getShift(req.body.Shift_id);
    if (!shift) {
      return next(new AppError("No shift found with that ID", 404));
    }
    const announcements = await AnnouncementHandler.getAnnouncementByShiftDate(
      shift.date
    );
    res.status(200).json({
      status: "success",
      results: announcements.length,
      data: {
        announcements,
      },
    });
  })
);
router
  .route("/shifts")
  .get(
    catchAsync(async function (req, res, next) {
      const announcements =
        await AnnouncementHandler.getAnnouncementByShiftDates();
      res.status(200).json({
        status: "success",
        results: announcements.length,
        data: {
          announcements,
        },
      });
    })
  )
  .post(
    catchAsync(async function (req, res, next) {
      const { announcementId, shiftId } = req.body;
      const shift = await ShiftHandler.getShift(shiftId);
      if (!shift) {
        return next(new AppError("No shift found with that ID", 404));
      }
      const newAnnouncement = await AnnouncementHandler.createAnnouncementShift(
        announcementId,
        shiftId
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
  .route("/")
  .get(
    catchAsync(async function (req, res, next) {
      const announcements = await AnnouncementHandler.getAllAnnouncements();
      res.status(200).json({
        status: "success",
        results: announcements.length,
        data: {
          announcements,
        },
      });
    })
  )
  .post(
    catchAsync(async function (req, res, next) {
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
    catchAsync(async function (req, res, next) {
      const announcement = await AnnouncementHandler.getAnnouncement(
        req.params.id * 1
      );
      if (!announcement) {
        return next(new AppError("No announcement found with that ID", 404));
      }
      res.status(200).json({
        status: "success",
        data: {
          announcement,
        },
      });
    })
  )
  .patch(
    catchAsync(async function (req, res, next) {
      const announcement = await AnnouncementHandler.getAnnouncement(
        req.params.id * 1
      );
      if (!announcement) {
        return next(new AppError("No announcement found with that ID", 404));
      }
      const { body } = req.body;
      const updatedAnnouncement = await AnnouncementHandler.updateAnnouncement(
        req.params.id * 1,
        body
      );
      res.status(200).json({
        status: "success",
        data: {
          announcement: updatedAnnouncement,
        },
      });
    })
  )
  .delete(
    catchAsync(async function (req, res, next) {
      const announcement = await AnnouncementHandler.getAnnouncement(
        req.params.id * 1
      );
      if (!announcement) {
        return next(new AppError("No announcement found with that ID", 404));
      }
      await AnnouncementHandler.deleteAnnouncement(req.params.id * 1);
      res.status(204).json({
        status: "success",
        data: null,
      });
    })
  );
module.exports = router;
