CREATE TABLE "vdp_main" (
    "deviceID" NUMERIC(32),
    "gender" TEXT,
    "ageGroup" TEXT,
    "questionID" NUMERIC(1),
    "questionAnsweredNumber" NUMERIC(2),
    "readingMethod" TEXT
);

CREATE TABLE "vdp_appointment" (
    "questionID" NUMERIC(1),
    "questionEmontion" TEXT,
    "question1" TEXT,
    "question2" TEXT,
    "questionTime" TEXT,
    "questionDate" TEXT,
);

INSERT INTO "vdp_appointment" VALUES
    (1,'Noraml',20000001,"Are you happy today?","can you tell me more details?","09:30 am","2020-April-12"),
    (3,'Noraml',20000002,"Are you happy today?","can you tell me more details?","12:00 am","2020-April-12"),
    (4,'Noraml',20000002,"Are you happy today?","can you tell me more details?","10:00 am","2020-April-13"),
    (5,'Noraml',20000002,"Are you happy today?","can you tell me more details?","16:00 pm","2020-April-14");
