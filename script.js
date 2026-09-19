/* =========================================
   SCREEN REFERENCES
========================================= */

const landing =
    document.querySelector(
        "#landingScreen"
    );


const noteOpen =
    document.querySelector(
        "#noteOpenScreen"
    );


const question =
    document.querySelector(
        "#questionScreen"
    );


const celebration =
    document.querySelector(
        "#celebrationScreen"
    );


/*
    User information.

    userName = Receiver's name
    giverName = Loki
*/

let userName = "";

let userPhone = "";

const giverName = "Loki";


/* =========================================
   SCREEN CONTROL
========================================= */

function showScreen(
    screen
) {

    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(
            item => {

                item.classList.remove(
                    "is-active"
                );

            }
        );


    if (screen) {

        screen.classList.add(
            "is-active"
        );

    }


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =========================================
   SAVE RESPONSE
========================================= */

async function saveResponse(
    response,
    action,
    page,
    attempt = ""
) {

    try {

        const result =
            await fetch(
                "/api/response",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            name:
                                userName,

                            phone:
                                userPhone,

                            response:
                                response,

                            action:
                                action,

                            page:
                                page,

                            attempt:
                                attempt

                        })

                }
            );


        if (!result.ok) {

            console.error(
                "Response was not saved."
            );

        }

    } catch (error) {

        console.error(
            "Unable to save response:",
            error
        );

    }

}


/* =========================================
   LOGIN
========================================= */

const loginForm =
    document.querySelector(
        "#loginForm"
    );


if (loginForm) {

    loginForm.addEventListener(

        "submit",

        async function (
            event
        ) {

            event.preventDefault();


            const nameInput =
                document.querySelector(
                    "#name"
                );


            const phoneInput =
                document.querySelector(
                    "#phone"
                );


            /*
                Login name is the
                RECEIVER'S name.
            */

            userName =
                nameInput.value.trim();


            userPhone =
                phoneInput.value.trim();


            /*
                Update receiver's name
                throughout the website.
            */

            const displayName =
                document.querySelector(
                    "#displayName"
                );


            const letterName =
                document.querySelector(
                    "#letterName"
                );


            const finalName =
                document.querySelector(
                    "#finalName"
                );


            if (displayName) {

                displayName.textContent =
                    userName;

            }


            if (letterName) {

                letterName.textContent =
                    userName;

            }


            if (finalName) {

                finalName.textContent =
                    userName;

            }


            /*
                Save login to Excel.
            */

            try {

                await fetch(
                    "/api/login",
                    {

                        method: "POST",

                        headers: {

                            "Content-Type":
                                "application/json"

                        },

                        body:
                            JSON.stringify({

                                name:
                                    userName,

                                phone:
                                    userPhone

                            })

                    }
                );

            } catch (error) {

                console.error(
                    "Login could not be recorded:",
                    error
                );

            }


            showScreen(
                landing
            );

        }

    );

}


/* =========================================
   HEART / PARTICLE EFFECT
========================================= */

function burst(
    amount = 150
) {

    const layer =
        document.querySelector(
            "#particleLayer"
        );


    if (!layer) {

        return;

    }


    const symbols = [

        "♥",
        "💗",
        "💕",
        "💖",
        "✦",
        "✨"

    ];


    for (
        let index = 0;
        index < amount;
        index += 1
    ) {


        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "particle";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random()
                    *
                    symbols.length
                )
            ];


        particle.style.left =
            `${Math.random() * 100}%`;


        particle.style.fontSize =
            `${12 + Math.random() * 25}px`;


        particle.style.animationDuration =
            `${2.8 + Math.random() * 3.5}s`;


        particle.style.animationDelay =
            `${Math.random() * 0.8}s`;


        particle.style.setProperty(

            "--drift",

            `${-180 + Math.random() * 360}px`

        );


        particle.style.setProperty(

            "--spin",

            `${-540 + Math.random() * 1080}deg`

        );


        layer.appendChild(
            particle
        );


        particle.addEventListener(

            "animationend",

            () => {

                particle.remove();

            }

        );

    }

}


/* =========================================
   CELEBRATION
========================================= */

function celebrate(
    response = "YES",
    action = "Date Accepted"
) {


    /*
        Save response.
    */

    saveResponse(

        response,

        action,

        "Celebration",

        ""

    );


    /*
        Small heart burst.
    */

    burst(80);


    /*
        Large heart burst.
    */

    setTimeout(

        () => {

            burst(180);

        },

        350

    );


    /*
        Show celebration.
    */

    showScreen(
        celebration
    );

}


/* =========================================
   OPEN ENVELOPE
========================================= */

const openNote =
    document.querySelector(
        "#openNote"
    );


if (openNote) {

    openNote.addEventListener(

        "click",

        () => {


            /*
                Prevent multiple clicks.
            */

            if (
                openNote.classList.contains(
                    "opened"
                )
            ) {

                return;

            }


            /*
                Open envelope.
            */

            openNote.classList.add(
                "opened"
            );


            /*
                Small heart animation.
            */

            burst(35);


            /*
                Move to letter.
            */

            setTimeout(

                () => {

                    showScreen(
                        noteOpen
                    );

                },

                1100

            );

        }

    );

}


/* =========================================
   LETTER → QUESTION
========================================= */

const continueToQuestion =
    document.querySelector(
        "#continueToQuestion"
    );


if (continueToQuestion) {

    continueToQuestion.addEventListener(

        "click",

        () => {

            burst(20);

            showScreen(
                question
            );

        }

    );

}


/* =========================================
   MAIN OKAY
========================================= */

const yesMain =
    document.querySelector(
        "#yesMain"
    );


if (yesMain) {

    yesMain.addEventListener(

        "click",

        () => {

            celebrate(

                "OKAY",

                "Main Date Question - Okay"

            );

        }

    );

}


/* =========================================
   MAIN WHY
========================================= */

const whyButton =
    document.querySelector(
        "#whyButton"
    );


if (whyButton) {

    whyButton.addEventListener(

        "click",

        () => {


            saveResponse(

                "WHY?",

                "Main Date Question - Why",

                "Question Page"

            );


            burst(25);


            showScreen(

                document.querySelector(
                    "#quoteScreen"
                )

            );

        }

    );

}


/* =========================================
   WHY PAGE OKAY
========================================= */

const yesQuote =
    document.querySelector(
        "#yesQuote"
    );


if (yesQuote) {

    yesQuote.addEventListener(

        "click",

        () => {

            celebrate(

                "OKAY",

                "Why Page - Okay"

            );

        }

    );

}


/* =========================================
   WHY PAGE NOT YET
========================================= */

const noStart =
    document.querySelector(
        "#noStart"
    );


if (noStart) {

    noStart.addEventListener(

        "click",

        () => {


            saveResponse(

                "NOT YET",

                "Why Page - Not Yet",

                "Response Page 1",

                "Attempt 1"

            );


            burst(20);


            showScreen(

                document.querySelector(
                    "#attempt1"
                )

            );

        }

    );

}


/* =========================================
   ATTEMPT 1 OKAY
========================================= */

const yesAttempt1 =
    document.querySelector(
        "#yesAttempt1"
    );


if (yesAttempt1) {

    yesAttempt1.addEventListener(

        "click",

        () => {

            celebrate(

                "OKAY",

                "Attempt 1 - Okay"

            );

        }

    );

}


/* =========================================
   ATTEMPT 1 NOT YET
========================================= */

const no1 =
    document.querySelector(
        "#no1"
    );


if (no1) {

    no1.addEventListener(

        "click",

        () => {


            saveResponse(

                "NOT YET",

                "Attempt 1 - Not Yet",

                "Response Page 2",

                "Attempt 2"

            );


            burst(25);


            showScreen(

                document.querySelector(
                    "#attempt2"
                )

            );

        }

    );

}


/* =========================================
   ATTEMPT 2 OKAY
========================================= */

const yesAttempt2 =
    document.querySelector(
        "#yesAttempt2"
    );


if (yesAttempt2) {

    yesAttempt2.addEventListener(

        "click",

        () => {

            celebrate(

                "OKAY",

                "Attempt 2 - Okay"

            );

        }

    );

}


/* =========================================
   ATTEMPT 2 NOT YET
========================================= */

const no2 =
    document.querySelector(
        "#no2"
    );


if (no2) {

    no2.addEventListener(

        "click",

        () => {


            saveResponse(

                "NOT YET",

                "Attempt 2 - Not Yet",

                "Response Page 3",

                "Attempt 3"

            );


            burst(30);


            showScreen(

                document.querySelector(
                    "#attempt3"
                )

            );

        }

    );

}


/* =========================================
   ATTEMPT 3 OKAY
========================================= */

const yesAttempt3 =
    document.querySelector(
        "#yesAttempt3"
    );


if (yesAttempt3) {

    yesAttempt3.addEventListener(

        "click",

        () => {

            celebrate(

                "OKAY",

                "Attempt 3 - Okay"

            );

        }

    );

}


/* =========================================
   ATTEMPT 3 NOT YET
========================================= */

const no3 =
    document.querySelector(
        "#no3"
    );


if (no3) {

    no3.addEventListener(

        "click",

        () => {


            saveResponse(

                "NOT YET",

                "Attempt 3 - Not Yet",

                "Playful Page",

                "Attempt 4"

            );


            burst(35);


            showScreen(

                document.querySelector(
                    "#playfulScreen"
                )

            );

        }

    );

}


/* =========================================
   MAYBE LATER
========================================= */

const maybeLater =
    document.querySelector(
        "#maybeLater"
    );


if (maybeLater) {

    maybeLater.addEventListener(

        "click",

        () => {


            saveResponse(

                "MAYBE LATER",

                "Maybe Later",

                "Final Date Page"

            );


            burst(40);


            showScreen(

                document.querySelector(
                    "#finalScreen"
                )

            );

        }

    );

}


/* =========================================
   FINAL YES
========================================= */

const finalYes =
    document.querySelector(
        "#finalYes"
    );


if (finalYes) {

    finalYes.addEventListener(

        "click",

        () => {


            /*
                Button pulse.
            */

            finalYes.style.transform =
                "scale(1.12)";


            /*
                Heart explosion.
            */

            burst(100);


            /*
                Show celebration.
            */

            setTimeout(

                () => {

                    celebrate(

                        "YES",

                        "Final Date Question - YES"

                    );

                },

                450

            );

        }

    );

}


/* =========================================
   FINAL WHY
========================================= */

const finalWhy =
    document.querySelector(
        "#finalWhy"
    );


if (finalWhy) {

    finalWhy.addEventListener(

        "click",

        () => {


            saveResponse(

                "WHY?",

                "Final Date Question - Why",

                "Final Date Page"

            );


            burst(25);


            showScreen(

                document.querySelector(
                    "#quoteScreen"
                )

            );

        }

    );

}


/* =========================================
   START AGAIN
========================================= */

const againButton =
    document.querySelector(
        "#againButton"
    );


if (againButton) {

    againButton.addEventListener(

        "click",

        () => {


            const envelope =
                document.querySelector(
                    "#openNote"
                );


            /*
                Reset envelope.
            */

            if (envelope) {

                envelope.classList.remove(
                    "opened"
                );

            }


            /*
                Small transition.
            */

            burst(35);


            setTimeout(

                () => {

                    showScreen(
                        landing
                    );

                },

                250

            );

        }

    );

}


/* =========================================
   BACKGROUND HEARTS
========================================= */

const heartsBackground =
    document.querySelector(
        ".hearts-bg"
    );


if (heartsBackground) {


    for (

        let index = 0;

        index < 22;

        index += 1

    ) {


        const heart =
            document.createElement(
                "span"
            );


        heart.textContent =

            index % 4 === 0

                ? "✦"

                : "♥";


        heart.style.left =
            `${Math.random() * 100}%`;


        heart.style.top =
            `${Math.random() * 100}%`;


        heart.style.fontSize =
            `${10 + Math.random() * 16}px`;


        heart.style.opacity =
            `${0.15 + Math.random() * 0.3}`;


        heart.style.animationDuration =
            `${4 + Math.random() * 5}s`;


        heart.style.animationDelay =
            `${Math.random() * 3}s`;


        heartsBackground.appendChild(
            heart
        );

    }

}
