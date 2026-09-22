/* ==========================================
   OASIS INFOBYTE
   Web Development - Level 1 Task 3
   Temperature Converter
========================================== */

const form = document.getElementById("converter-form");

const temperatureInput =
    document.getElementById("temperature");

const inputUnit =
    document.getElementById("input-unit");

const outputUnit =
    document.getElementById("output-unit");

const inputError =
    document.getElementById("input-error");

const absoluteZeroError =
    document.getElementById("absolute-zero-error");

const celsiusResult =
    document.getElementById("celsius-result");

const fahrenheitResult =
    document.getElementById("fahrenheit-result");

const kelvinResult =
    document.getElementById("kelvin-result");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    inputError.textContent = "";

    absoluteZeroError.textContent = "";

    absoluteZeroError.style.display = "none";


    const input =
        temperatureInput.value.trim();


    /* Numeric validation */

    if (
        input === "" ||
        !Number.isFinite(Number(input))
    ) {

        inputError.textContent =
            "Please enter a valid numeric temperature.";

        clearResults();

        return;
    }


    const value = Number(input);


    /* Convert input into Celsius */

    let celsius;


    switch (inputUnit.value) {

        case "celsius":
            celsius = value;
            break;

        case "fahrenheit":
            celsius = (value - 32) * 5 / 9;
            break;

        case "kelvin":
            celsius = value - 273.15;
            break;
    }


    /* Absolute zero check */

    if (celsius < -273.15) {

        absoluteZeroError.textContent =
            "Temperature cannot be below absolute zero (-273.15°C).";

        absoluteZeroError.style.display = "block";

        clearResults();

        return;
    }


    /* Calculate conversions */

    const fahrenheit =
        (celsius * 9 / 5) + 32;

    const kelvin =
        celsius + 273.15;


    /* Show selected output */

    clearResults();


    switch (outputUnit.value) {

        case "celsius":

            celsiusResult.textContent =
                formatTemperature(celsius);

            break;


        case "fahrenheit":

            fahrenheitResult.textContent =
                formatTemperature(fahrenheit);

            break;


        case "kelvin":

            kelvinResult.textContent =
                formatTemperature(kelvin);

            break;


        case "all":

            celsiusResult.textContent =
                formatTemperature(celsius);

            fahrenheitResult.textContent =
                formatTemperature(fahrenheit);

            kelvinResult.textContent =
                formatTemperature(kelvin);

            break;
    }

});


/* Format number */

function formatTemperature(value) {

    return value.toFixed(2);
}


/* Clear results */

function clearResults() {

    celsiusResult.textContent = "—";

    fahrenheitResult.textContent = "—";

    kelvinResult.textContent = "—";
}