/**
 * Fetch repositories listed on a GitHub user's profile and display it via HTML
 * @param {String} id
 */

function repoDisplayer(id) {

    const profileName = "sygwave";
    const skippedProjects = [];
    const errorString = "<p>Check out all of our projects <a href='https://github.com/" + profileName + "?tab=repositories' target='_blank'>here</a> on our GitHub profile</p>";

    const div = document.getElementById(id);

    // Continue if we captured a Div specified by the passed-in ID
    if (div) {

        fetch("https://api.github.com/users/" + profileName + "/repos").then((response) => {

            // If the API's response is anything other than successful, print the error string to the specified Div
            if (response.status != 200) {
                div.innerHTML += errorString;
            }

            return response.json()

        }).then((jsonObject) => {

            for (var key in jsonObject) {

                // Continue if every value we want exists
                if (jsonObject[key].name &&
                    jsonObject[key].html_url &&
                    jsonObject[key].description &&
                    jsonObject[key].language) {

                    var name = JSON.stringify(jsonObject[key].name).split('"').join("");

                    // Continue if we want to include the current project
                    if (!skippedProjects.includes(name)) {

                        var url = JSON.stringify(jsonObject[key].html_url).split('"').join("");
                        var description = JSON.stringify(jsonObject[key].description).split('"').join("");
                        var language = JSON.stringify(jsonObject[key].language).split('"').join("");

                        div.innerHTML += "<h3><a href='" + url + "' target='_blank'>" + name + "</a></h3>";
                        div.innerHTML += "<p>" + description + ", <strong>" + language + "</strong></p><br>";

                    }

                }

            }

            div.innerHTML = div.innerHTML.slice(0, -4);

        }).catch(function() {

            // If an error is thrown working with the JSON object, catch it and print the error string to the specified Div
            div.innerHTML += errorString;

        });

    }

}