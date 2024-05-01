# Clean3000

This project was carried out during my training at M2i. 
Clean 3000 is a fictional window cleaning company. We had been asked to create a digital solution for them, so that the employees could **create a service report**, then have a **summary** of it. They could also **delete a specific report**.

![Clean3000_mobile-version](https://github.com/julie-vandenberghe/ecf_front/assets/120843391/09b8a533-10a1-4208-8d5d-59512abd0374)

## Key Features

- **Add a new review:** The user can fill out a form to record a new cleaning intervention review.
The form includes the following fields:
  - a dropdown list to select the company/client (mandatory field), 
  - the intervention date (mandatory field), 
  - a text field to add observations (optional field). If no observations are provided, "No observations" will be entered in this field.

- **Display a summary:** Once the form is submitted, the data is processed, a summary is displayed to the user with all the fields they have just filled in, as well as the intervention number (created using a timestamp). A success message is displayed at the bottom of the page.

- **Delete a review:** The user can enter the intervention number of a review in a form to delete it.
  - If the intervention number is found, the review is deleted from the list and a message is then displayed to indicate that the review has been successfully deleted.
  - If the review is not found, a message informs the user.

- **Display the list of reviews:** All recorded reviews are displayed in a dedicated section. Each review displays the intervention number, the name of the company/client, the intervention date, and any observations.

- **Use of the local storage:** Reviews are saved and deleted from the local storage of the user's browser.

- **Responsive Design:** The application was designed "mobile first" and it is responsive across various devices. 

- **Managing the display of different sections:** A single HTML page has been created with all the sections (following the SPA, Single Page Application, model). The application dynamically manages the display of different sections based on user actions: when a link is clicked in the navigation bar, only the corresponding section is displayed, while the other sections are hidden.

## Configuration

Clone the repository: 
```
git clone https://github.com/julie-vandenberghe/ecf_front.git
```

Compile all sass files into css
```
sass sass:css
```

Automatically compile sass on save
```
sass --watch sass/main.scss css/main.css
```