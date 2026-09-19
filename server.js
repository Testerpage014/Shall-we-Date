const express = require("express");
const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");

const app = express();

const PORT = process.env.PORT || 3000;

const DATA_FOLDER = path.join(
    __dirname,
    "data"
);

const EXCEL_FILE = path.join(
    DATA_FOLDER,
    "responses.xlsx"
);


/* =========================================
   MIDDLEWARE
========================================= */

app.use(
    express.json()
);


/*
    Prevent direct access to Excel/data folder.
*/

app.use(
    "/data",
    (req, res) => {

        res.status(404).send(
            "Not Found"
        );

    }
);


/* =========================================
   CREATE EXCEL FILE
========================================= */

async function initializeExcel() {

    if (!fs.existsSync(DATA_FOLDER)) {

        fs.mkdirSync(
            DATA_FOLDER,
            {
                recursive: true
            }
        );

    }


    /*
        If Excel already exists,
        don't recreate it.
    */

    if (fs.existsSync(EXCEL_FILE)) {

        return;

    }


    const workbook =
        new ExcelJS.Workbook();


    /* =====================================
       RESPONSES SHEET
    ===================================== */

    const responseSheet =
        workbook.addWorksheet(
            "Responses"
        );


    responseSheet.columns = [

        {
            header: "Name",
            key: "name",
            width: 25
        },

        {
            header: "Phone",
            key: "phone",
            width: 20
        },

        {
            header: "Response",
            key: "response",
            width: 20
        },

        {
            header: "Action",
            key: "action",
            width: 35
        },

        {
            header: "Page",
            key: "page",
            width: 25
        },

        {
            header: "Attempt",
            key: "attempt",
            width: 20
        }

    ];


    responseSheet.getRow(1).font = {
        bold: true
    };


    responseSheet.views = [
        {
            state: "frozen",
            ySplit: 1
        }
    ];


    /* =====================================
       LOGINS SHEET
    ===================================== */

    const loginSheet =
        workbook.addWorksheet(
            "Logins"
        );


    loginSheet.columns = [

        {
            header: "Name",
            key: "name",
            width: 25
        },

        {
            header: "Phone",
            key: "phone",
            width: 20
        },

        {
            header: "Action",
            key: "action",
            width: 20
        }

    ];


    loginSheet.getRow(1).font = {
        bold: true
    };


    loginSheet.views = [
        {
            state: "frozen",
            ySplit: 1
        }
    ];


    await workbook.xlsx.writeFile(
        EXCEL_FILE
    );


    console.log(
        "Excel file created:",
        EXCEL_FILE
    );
}


/* =========================================
   SAVE LOGIN
========================================= */

async function saveLogin(
    name,
    phone
) {

    const workbook =
        new ExcelJS.Workbook();


    await workbook.xlsx.readFile(
        EXCEL_FILE
    );


    const sheet =
        workbook.getWorksheet(
            "Logins"
        );


    sheet.addRow({

        name: name,

        phone: String(
            phone
        ),

        action: "Login"

    });


    await workbook.xlsx.writeFile(
        EXCEL_FILE
    );
}


/* =========================================
   SAVE RESPONSE
========================================= */

async function saveResponse(
    name,
    phone,
    response,
    action,
    page,
    attempt
) {

    const workbook =
        new ExcelJS.Workbook();


    await workbook.xlsx.readFile(
        EXCEL_FILE
    );


    const sheet =
        workbook.getWorksheet(
            "Responses"
        );


    sheet.addRow({

        name: name,

        phone: String(
            phone
        ),

        response: response,

        action: action,

        page: page,

        attempt: attempt

    });


    await workbook.xlsx.writeFile(
        EXCEL_FILE
    );
}


/* =========================================
   LOGIN API
========================================= */

app.post(
    "/api/login",
    async (req, res) => {

        try {

            const {
                name,
                phone
            } = req.body;


            if (!name) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Name is required."

                    });

            }


            await saveLogin(
                name,
                phone || ""
            );


            res.json({

                success: true,

                message:
                    "Login saved successfully."

            });


        } catch (error) {

            console.error(
                "Login save error:",
                error
            );


            res
                .status(500)
                .json({

                    success: false,

                    message:
                        "Unable to save login."

                });

        }

    }
);


/* =========================================
   RESPONSE API
========================================= */

app.post(
    "/api/response",
    async (req, res) => {

        try {

            const {
                name,
                phone,
                response,
                action,
                page,
                attempt
            } = req.body;


            if (!name) {

                return res
                    .status(400)
                    .json({

                        success: false,

                        message:
                            "Name is required."

                    });

            }


            await saveResponse(

                name,

                phone || "",

                response || "",

                action || "",

                page || "",

                attempt || ""

            );


            res.json({

                success: true,

                message:
                    "Response saved successfully."

            });


        } catch (error) {

            console.error(
                "Response save error:",
                error
            );


            res
                .status(500)
                .json({

                    success: false,

                    message:
                        "Unable to save response."

                });

        }

    }
);


/* =========================================
   HEALTH CHECK
========================================= */

app.get(
    "/api/health",
    (req, res) => {

        res.json({

            success: true,

            message:
                "Server is running."

        });

    }
);


/* =========================================
   STATIC FILES
========================================= */

app.use(
    express.static(
        __dirname,
        {
            index: false
        }
    )
);


/* =========================================
   HOME PAGE
========================================= */

app.get(
    "/",
    (req, res) => {

        res.sendFile(
            path.join(
                __dirname,
                "index.html"
            )
        );

    }
);


/* =========================================
   START SERVER
========================================= */

initializeExcel()
    .then(
        () => {

            app.listen(
                PORT,
                () => {

                    console.log("");

                    console.log(
                        "================================="
                    );

                    console.log(
                        "Romantic Date Website Started"
                    );

                    console.log(
                        `http://localhost:${PORT}`
                    );

                    console.log(
                        "================================="
                    );

                    console.log("");

                }
            );

        }
    )
    .catch(
        error => {

            console.error(
                "Unable to initialize Excel:",
                error
            );

        }
    );