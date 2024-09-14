var _a;
(_a = document.getElementById("resumeform")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    // Profile Picture Input Element
    var profilePictureInput = document.getElementById("profilePictureInput");
    // Type assertion for form elements
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var educationElement = document.getElementById("education");
    var experienceElement = document.getElementById("experience");
    var skillsElement = document.getElementById("skills");
    // Username for unique path
    var usernameElement = document.getElementById("username");
    if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
        // Get all form data
        var name_1 = nameElement.value.trim();
        var email = emailElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skills = skillsElement.value;
        var username = usernameElement.value;
        // Unique path for resume
        var uniquePath_1 = "resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        // Profile picture file and URL
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        // Create resume output
        var resumeOutput = "\n          <h2>Resume</h2>\n          ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" style=\"max-width: 150px; max-height: 150px;\"><br>") : "", "\n          <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name_1, "</span></p>\n          <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n          <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n          <h3>Education</h3>\n          <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n          <h3>Experience</h3>\n          <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n          <h3>Skills</h3>\n          <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n      ");
        var resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            // Create button container
            var buttonContainer = document.createElement("div");
            buttonContainer.id = "buttonContainer";
            resumeOutputElement.appendChild(buttonContainer);
            // Add "Download PDF" button
            var downloadButton = document.createElement("button");
            downloadButton.textContent = "Download PDF";
            downloadButton.addEventListener("click", function () {
                window.print(); // Simple print dialog for PDF download
            });
            buttonContainer.appendChild(downloadButton);
            // Add "Copy Shareable Link" button
            var shareLinkButton = document.createElement("button");
            shareLinkButton.textContent = "Copy Shareable Link";
            shareLinkButton.addEventListener("click", function () {
                var shareableLink = "".concat(window.location.origin, "/").concat(uniquePath_1);
                navigator.clipboard.writeText(shareableLink).then(function () {
                    alert("Shareable link copied: " + shareableLink);
                });
            });
            buttonContainer.appendChild(shareLinkButton);
            // Add Download HTML link
            var downloadLink = document.createElement("a");
            downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
            downloadLink.download = uniquePath_1;
            downloadLink.textContent = "Download Your 2024 Resume";
            buttonContainer.appendChild(downloadLink);
        }
        makeEditable();
    }
    else {
        console.error("One or more output elements are missing.");
    }
});
// Function to make fields editable
function makeEditable() {
    var editableElements = document.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        element.addEventListener("click", function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement("input");
                input_1.type = "text";
                input_1.value = currentValue;
                input_1.classList.add("editing-input");
                // Update the value when the input loses focus
                input_1.addEventListener("blur", function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = "inline";
                    input_1.remove();
                });
                currentElement.style.display = "none";
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
