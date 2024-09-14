document.getElementById("resumeform")?.addEventListener("submit", function (event) {
  event.preventDefault();

  // Profile Picture Input Element
  const profilePictureInput = document.getElementById("profilePictureInput") as HTMLInputElement;

  // Type assertion for form elements
  const nameElement = document.getElementById("name") as HTMLInputElement;
  const emailElement = document.getElementById("email") as HTMLInputElement;
  const phoneElement = document.getElementById("phone") as HTMLInputElement;
  const educationElement = document.getElementById("education") as HTMLTextAreaElement;
  const experienceElement = document.getElementById("experience") as HTMLTextAreaElement;
  const skillsElement = document.getElementById("skills") as HTMLTextAreaElement;

  // Username for unique path
  const usernameElement = document.getElementById("username") as HTMLInputElement;

  if (profilePictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement) {
      // Get all form data
      const name = nameElement.value.trim();
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const username = usernameElement.value;

      // Unique path for resume
      const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

      // Profile picture file and URL
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

      // Create resume output
      const resumeOutput = `
          <h2>Resume</h2>
          ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" style="max-width: 150px; max-height: 150px;"><br>` : ""}
          <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
          <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
          <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
          <h3>Education</h3>
          <p id="edit-education" class="editable">${education}</p>
          <h3>Experience</h3>
          <p id="edit-experience" class="editable">${experience}</p>
          <h3>Skills</h3>
          <p id="edit-skills" class="editable">${skills}</p>
      `;

      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
          resumeOutputElement.innerHTML = resumeOutput;

          // Create button container
          const buttonContainer = document.createElement("div");
          buttonContainer.id = "buttonContainer";
          resumeOutputElement.appendChild(buttonContainer);

          // Add "Download PDF" button
          const downloadButton = document.createElement("button");
          downloadButton.textContent = "Download PDF";
          downloadButton.addEventListener("click", () => {
              window.print(); // Simple print dialog for PDF download
          });
          buttonContainer.appendChild(downloadButton);

          // Add "Copy Shareable Link" button
          const shareLinkButton = document.createElement("button");
          shareLinkButton.textContent = "Copy Shareable Link";
          shareLinkButton.addEventListener("click", () => {
              const shareableLink = `${window.location.origin}/${uniquePath}`;
              navigator.clipboard.writeText(shareableLink).then(() => {
                  alert("Shareable link copied: " + shareableLink);
              });
          });
          buttonContainer.appendChild(shareLinkButton);

          // Add Download HTML link
          const downloadLink = document.createElement("a");
          downloadLink.href = "data:text/html;charset=utf-8," + encodeURIComponent(resumeOutput);
          downloadLink.download = uniquePath;
          downloadLink.textContent = "Download Your 2024 Resume";
          buttonContainer.appendChild(downloadLink);
      }

      makeEditable();
  } else {
      console.error("One or more output elements are missing.");
  }
});

// Function to make fields editable
function makeEditable() {
  const editableElements = document.querySelectorAll(".editable");
  editableElements.forEach((element) => {
      element.addEventListener("click", function () {
          const currentElement = element as HTMLElement;
          const currentValue = currentElement.textContent || "";

          if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
              const input = document.createElement("input");
              input.type = "text";
              input.value = currentValue;
              input.classList.add("editing-input");

              // Update the value when the input loses focus
              input.addEventListener("blur", function () {
                  currentElement.textContent = input.value;
                  currentElement.style.display = "inline";
                  input.remove();
              });

              currentElement.style.display = "none";
              currentElement.parentNode?.insertBefore(input, currentElement);
              input.focus();
          }
      });
  });
}
