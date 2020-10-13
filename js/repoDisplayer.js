function repoDisplayer(id) {

    const profileName = "sygwave";
    const skippedProjects = [];
    const blank = "_blank";

    var error = document.createElement("p");
    error.append("Check out all of our projects ");
    var errorAnchor = document.createElement("a");
    errorAnchor.innerText = "here";
    errorAnchor.href = "https://github.com/" + profileName + "?tab=repositories";
    errorAnchor.target = blank;
    error.append(errorAnchor);
    error.append(" on our GitHub profile");

    const div = document.getElementById(id);

    if (div) {

        fetch("https://api.github.com/users/" + profileName + "/repos").then((response) => {

            if (response.status != 200) {
                div.append(error);
            }

            return response.json()

        }).then((jsonObject) => {

            for (var key in jsonObject) {

                if (jsonObject[key].name &&
                    jsonObject[key].html_url &&
                    jsonObject[key].description &&
                    jsonObject[key].language &&
                    jsonObject[key].homepage) {

                    var name = JSON.stringify(jsonObject[key].name).split('"').join("");

                    if (!skippedProjects.includes(name)) {
                        var homepage = JSON.stringify(jsonObject[key].homepage).split('"').join("");
                        var description = JSON.stringify(jsonObject[key].description).split('"').join("");
                        var language = JSON.stringify(jsonObject[key].language).split('"').join("");
                        var repoLink = JSON.stringify(jsonObject[key].html_url).split('"').join("");

                        var anchor = document.createElement("a");
                        anchor.innerText = name;
                        anchor.href = homepage;
                        anchor.target = blank;

                        var header = document.createElement("h3");
                        header.append(anchor);
                        div.append(header);

                        var paragraph = document.createElement("p");
                        var anchor2 = document.createElement("a");
                        anchor2.innerText = language;
                        anchor2.href = repoLink;
                        anchor2.target = blank;
                        paragraph.innerText = description + ", ";
                        paragraph.append(anchor2);
                        div.append(paragraph);
                    }
                }
            }
        }).catch(function() {
            div.append(error);
        });
    }
}