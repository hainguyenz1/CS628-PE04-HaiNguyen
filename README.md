# CS628-PE04-HaiNguyen
# Cities Application

This React application allows users to view and add information about cities. It utilizes React Router for navigation and implements a simple input-process-output model.

## Input

The application accepts two types of user input:

1.  **Adding a new city:** Users can input the city's name (text), country (text), population (number), and a list of "things to do" (text strings). This data is collected through a form in the "Add City" view.

2.  **Viewing city details:** Users can click on a city name in the "Cities List" view. This input is the city's unique ID, passed as a parameter in the URL.

## Process

1.  **Adding a city:** When a user submits the "Add City" form, the application creates a new city object with the provided information, including a unique ID. It then updates the application's state with this new city data and redirects the user to the "Cities List" view.

2.  **Viewing city details:** When a user clicks on a city name, the application extracts the city ID from the URL using `useParams`. It then searches the city data for the city object matching this ID. The details of the found city, including its name, country, population are then displayed.

3.  **Things to do**: Display tourist attraction among given cities.

## Output

The application provides the following outputs:

1.  **Cities List:** A list of all cities, displayed in the "Cities List" view. Each city name is a link to that city's details page.

2.  **City Details:** Detailed information about a specific city, including its name, country, population, and a list of "things to do," displayed when a user clicks on a city in the list. This information is shown within the same layout as the Cities List using React Router's nested routes and the `<Outlet>` component.
